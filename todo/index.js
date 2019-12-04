const express = require('express');
const http = require('http');
const Adom = require('adom-js');
const bodyParser = require('body-parser');

const app = express();
const adom = new Adom({ rootDir: '.' });

let todos = [];

app.use(bodyParser.json());

app.post('/item', function (req, res) {
  todos.push(req.body.item);
  res.sendStatus(200);
});

app.use('/', function (req, res) {
  res.set('Content-type', 'text/html');
  res.end(adom.render('index.adom', { items: todos }));
});

http.createServer(app).listen(5000);
