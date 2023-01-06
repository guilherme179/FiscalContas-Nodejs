const validateDatas = async (request, response, next) => {
  const { body } = request;

  if (body.name === undefined || body.email === undefined || body.phone === undefined || body.price === undefined || body.cep === undefined || body.street === undefined || body.numberHouse === undefined || body.district === undefined || body.city === undefined || body.state === undefined || body.cnpj === undefined) {
    return response.status(400).json({ message: 'you must pass all fields!' });
  }

  if (body.name === '' || body.email === '' || body.phone === '' || body.price === '' || body.cep === '' || body.street === '' || body.numberHouse === '' || body.district === '' || body.city === '' || body.state === '' || body.cnpj === '') {
    return response.status(400).json({ message: 'need to fill in all fields!' });
  }
  
  next();
}

const validateDataId = async (request, response, next) => {
  const { body } = request;

  if (body.id === undefined) {
    return response.status(400).json({ message: 'you must pass the id field!' });
  }

  if (body.id === '') {
    return response.status(400).json({ message: 'need to fill in the id field!' });
  }

  next();
}

module.exports = {
  validateDatas,
  validateDataId
};