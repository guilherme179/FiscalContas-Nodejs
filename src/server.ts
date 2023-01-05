import express from 'express';

const app = express();

app.get('/', (request, response) => {
  return response.json({ message: 'Hello Wolrd !!' });
});

app.listen(3333);