const express = require('express');
const http = require('http');
const Adom = require('../../a.dom/index.js');
const bodyParser = require('body-parser');

const app = express();
const adom = new Adom({ rootDir: '.', cache: false });

let todos = [
  'filters',
  'tree diffing',
  'async rendering'
];

app.use(bodyParser.json());

app.post('/item', function (req, res) {
  todos.push(req.body.item);
  res.sendStatus(200);
});

app.delete('/item/:id', function (req, res) {
  let id = parseInt(req.params.id);
  todos.splice(id, 1);
  res.sendStatus(200);
})

app.use('/', function (req, res) {
  res.set('Content-type', 'text/html');
  res.end(adom.render('index.adom', { items: todos }));
});

http.createServer(app).listen(5000, function () {
  console.log('Listening on port 5000...');  
});
