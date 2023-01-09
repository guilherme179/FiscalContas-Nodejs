import express from 'express';

const app = express();

var bodyParser = require('body-parser')
app.use(express.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

const ClientsController = require('./controllers/ClientsController');
const ClientsMiddleware = require('./middlewares/ClientsMiddleware');
const LoginController = require('./controllers/LoginController');
const LoginMiddleware = require('./middlewares/LoginMiddleware');
const JwtMiddleware = require('./middlewares/JwtMiddleware');

app.get('/', (_request, response) => {
  return response.json({ message: 'Hello Wolrd !!' });
});

app.post('/login', LoginMiddleware.validateLoginData, LoginController.login);

app.get('/clients', JwtMiddleware.verify, ClientsController.getClients);
app.post('/clients', JwtMiddleware.verify, ClientsMiddleware.validateDatas, ClientsController.createClient);
app.put('/clients', JwtMiddleware.verify, ClientsMiddleware.validateDatas, ClientsController.updateClient);
app.delete('/clients', JwtMiddleware.verify, ClientsMiddleware.validateDataId, ClientsController.deleteClient);
app.post('/clients/byId', JwtMiddleware.verify, ClientsMiddleware.validateDataId, ClientsController.getClientById);

app.listen(3333);