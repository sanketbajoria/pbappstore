const express = require('express');
const app = express();
var bodyParser = require('body-parser');

var proxyMiddleware = require('http-proxy-middleware');

var db = require('./database');

app.use('/api/v2/8940', proxyMiddleware(['/api/v2/8940'], { target: 'https://www.appaloosa-store.com', changeOrigin: true }));

app.use(bodyParser.json());


app.post('/api/v1/login', (req, res) => {
  try {
    db.getUser({ email: req.body.email }).then((user) => {
      if (user.password === req.password) {
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

app.post('/api/v1/users', (req, res) => {
  try {
    db.createUser(req.body).then((user) => {
      res.json(user);
    }, (err) => {
      console.log(err);
      res.status(400).end();
    });

  } catch (e) {
    console.log(e);
    res.status(400).end();
    next(e);
  }
});

app.listen(8080, () => console.log('Example app listening on port 3000!'))