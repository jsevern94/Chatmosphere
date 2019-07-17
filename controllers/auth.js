var db = require("../models");
const Op = db.Sequelize.Op;

module.exports = (app, passport) => {

  app.get('/', (req, res) => {
    res.render('index');
  });

  app.post(
    '/login',
    passport.authenticate('local-login', {
      successRedirect: '/home',
      failureRedirect: '/login-fail',
      failureFlash: true
    })
  );

  app.post(
    '/signup',
    passport.authenticate('local-signup', {
      successRedirect: '/tellusmore',
      failureRedirect: '/signup-fail',
      failureFlash: true
    })
  );

  app.get('/signup-fail', (req, res) => {
    res.render('signup', {
      message: req.flash('error')
    });
  });

  app.get('/login-fail', (req, res) => {
    res.render('login', {
      message: req.flash('error')
    });
  });

  app.get('/tellusmore', (req, res) => {
    res.render('tellusmore');
  })

  app.put("/api/tellusmore", function (req, res, next) {

    db.user.update({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      about: req.body.bio,
      email: req.body.email
    }, {
        where: {
          userName: req.user.userName
        }
      }).then(function (dbUser) {
        res.json(dbUser);
      }).catch(function (err) {
        res.json(err);
        next();
      });
  });

  app.get('/home', isLoggedIn, (req, res) => {
    res.render('home', {
      userName: req.user.userName,
      email: req.user.email,
      firstName: req.user.firstName,
      lastName: req.user.lastName,
      about: req.user.about
    });
  });

  app.get('/chat/:userid', (req, res) => {
    res.render('chat', {
      partner: req.params.userid,
      user: req.user.userid
    });
  })

  app.get('/api/chat/:userid', (req, res) => {
    db.message.findAll({
      where: {
        [Op.or]: [{ sender: req.user.userid, receiver: req.params.userid }, { sender: req.params.userid, receiver: req.user.userid }]
      },
      order: [['createdAt', 'ASC']]
    }).then(function (result) {
      return res.json(result);
    });
  })

  app.post('/api/messages', function (req, res) {
    db.message.create({
      sender: req.body.sender,
      receiver: req.body.receiver,
      content: req.body.content
    }).then(function (dbTodo) {
      // We have access to the new todo as an argument inside of 
      // the callback function
      res.json(dbTodo);
    });

  });

  app.get('/logout', (req, res) => {
    req.session.destroy(err => {
      res.redirect('/');
    });
  });

  function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) return next();

    res.redirect('/login-fail');
  }
};