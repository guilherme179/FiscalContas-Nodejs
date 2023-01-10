import express from 'express';

const app = express();

var bodyParser = require('body-parser')
app.use(express.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

const ClientsController = require('./controllers/ClientsController');
const cors = require('cors');
const ClientsMiddleware = require('./middlewares/ClientsMiddleware');
const LoginController = require('./controllers/LoginController');
const LoginMiddleware = require('./middlewares/LoginMiddleware');
const JwtMiddleware = require('./middlewares/JwtMiddleware');

app.use((_req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", 'GET,PUT,POST,DELETE');
    app.use(cors());
    next();
});

app.get('/', (_request, response) => {
  return response.json({ message: 'Hello Wolrd !!' });
});

app.post('/login', LoginMiddleware.validateLoginData, LoginController.login);

app.get('/clients', ClientsController.getClients);
app.post('/clients', ClientsMiddleware.validateDatas, ClientsController.createClient);
app.put('/clients', ClientsMiddleware.validateDatasForUpdate, ClientsController.updateClient);
app.delete('/clients', ClientsMiddleware.validateDataId, ClientsController.deleteClient);
app.post('/clients/byId', ClientsMiddleware.validateDataId, ClientsController.getClientById);

app.listen(3333);