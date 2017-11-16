const express = require('express');
const app = express();
var bodyParser = require('body-parser');

var proxyMiddleware = require('http-proxy-middleware');

var db = require('./database');

app.use(express.static(__dirname + '/../build'));

app.use('/api/v2/8940', proxyMiddleware(['/api/v2/8940'], { target: 'https://www.appaloosa-store.com', changeOrigin: true }));

app.use(bodyParser.json());

app.post('/api/v1/login', (req, res, next) => {
  try {
<<<<<<< HEAD
    db.getUser({ email: req.body.email }).then((user) => {
      // console.log(user, user.password);
      if (user != null && user.password === req.body.password) {
=======
    db.getUser(req.body.email).then((u) => {
      var user = u.dataValues;
      if (user && user.password === req.body.password) {
>>>>>>> ebf3d39f8f0ff630dd43f3cb024bee976f2c0ac6
        res.status(200).json(user).end();
      } else {
        res.status(403).end();
      }
    }, (err) => {
      console.log(err);
      res.status(400).end();
    });
  } catch (e) {
    console.log(e);
    next(e);
  }
})

app.post('/api/v1/users', (req, res, next) => {
  try {
    if(req.body.name && req.body.email && req.body.password){
      db.getUser(req.body.email).then((u) => {
        if(!u){
          db.createUser(req.body).then((user) => {
            res.json(user);
          }, (err) => {
            console.log(err);
            res.status(400).end();
          });
        }else{
          res.status(400).end();
        }
      })
    }else{
      res.status(400).end();
    }
  } catch (e) {
    console.log(e);
    res.status(400).end();
    next(e);
  }
});

app.listen(80, () => console.log('Example app listening on port 80!'))