module.exports = (app, passport) => {
    app.get('/', (req, res) => {
      res.render('index');
    });
  
    app.get('/signup', (req, res) => {
      res.render('signup', {
        message: req.flash('error')
      });
    });
  
    app.get('/login', (req, res) => {
      res.render('login', {
        message: req.flash('error')
      });
    });

    app.get('/chat', (req, res) => {
      res.render('chat');
    })
  
    app.post(
      '/signup',
      passport.authenticate('local-signup', {
        successRedirect: '/home',
        failureRedirect: '/signup',
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
        failureRedirect: '/login',
        failureFlash: true
      })
    );
  
    function isLoggedIn(req, res, next) {
      if (req.isAuthenticated()) return next();
  
      res.redirect('/login');
    }
  };