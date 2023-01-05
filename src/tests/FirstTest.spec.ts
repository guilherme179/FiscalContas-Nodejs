test('It should be ok', () => {
  const ClientsController = require('../controllers/ClientsController');
  const message = ClientsController.getClientsTest();
  expect(message).toEqual("tá batendo certo!");
})