import express from 'express';

const app = express();

var bodyParser = require('body-parser')
app.use(express.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

const ClientsController = require('./controllers/ClientsController');
const ClientsMiddleware = require('./middlewares/ClientsMiddleware');

app.get('/', (request, response) => {
  return response.json({ message: 'Hello Wolrd !!' });
});

app.get('/clients', ClientsController.getClients);
app.post('/clients', ClientsMiddleware.validateDatas ,ClientsController.createClient);
app.put('/clients', ClientsMiddleware.validateDatas ,ClientsController.updateClient);
app.post('/clients/byId', ClientsMiddleware.validateDataId ,ClientsController.getClientById);

app.listen(3333);