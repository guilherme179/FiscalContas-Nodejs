import express from 'express';

const app = express();

var bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({
  extended: true
}));

const ClientsController = require('./controllers/ClientsController');

app.get('/', (request, response) => {
  return response.json({ message: 'Hello Wolrd !!' });
});

app.get('/clients', ClientsController.getClients);
app.post('/clients', ClientsController.createClients);

app.listen(3333);