var db = require("../models");
const Op = db.Sequelize.Op;

module.exports = (app, passport) => {
  app.get('/', (req, res) => {
    res.render('index');
    console.log(db.user)
  });

  app.get('/tellusmore', (req, res) => {
    res.render('tellusmore');
  })


  app.put("/api/tellusmore", function (req, res, next) {

    db.user.update({
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      about: req.body.bio,
      email: req.body.email
    }, {
        where: {
          username: req.user.username
        }
      }).then(function (dbUser) {
        res.json(dbUser);
      }).catch(function (err) {
        res.json(err);
        next();
      });
  });

  app.get('/chat', (req, res)=> {
    res.render('chat');
  })

  app.get('/api/chat/:userid', (req, res) => {
    db.message.findAll({
      where: {
        [Op.or]: [{sender: req.user.username, receiver: req.params.userid}, {sender: req.params.userid, receiver: req.user.username}]
      },
      order: [['updatedAt', 'DESC']]
    }).then(function(result) {
      return res.json(result);
    });
  })

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

  app.post(
    '/signup',
    passport.authenticate('local-signup', {
      successRedirect: '/tellusmore',
      failureRedirect: '/signup-fail',
      failureFlash: true

    })
  );

  app.get('/home', isLoggedIn, (req, res) => {
    res.render('home');
  });

  app.get('/logout', (req, res) => {
    req.session.destroy(err => {
      res.redirect('/');
    });
  });

  app.post(
    '/login',
    passport.authenticate('local-login', {
      successRedirect: '/home',
      failureRedirect: '/login-fail',
      failureFlash: true
    })
  );

  function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) return next();

    res.redirect('/login');
  }
};