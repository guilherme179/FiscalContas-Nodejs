import { prisma } from "../DAO/prisma";

const validateDatas = async (request, response, next) => {
  const { body } = request;

  if (body.name === undefined || body.email === undefined || body.phone === undefined || body.price === undefined || body.cep === undefined || body.street === undefined || body.numberHouse === undefined || body.district === undefined || body.city === undefined || body.state === undefined || body.cnpj === undefined) {
    return response.status(400).json({ message: 'you must pass all fields!' });
  }

  if (body.name === '' || body.email === '' || body.phone === '' || body.price === '' || body.cep === '' || body.street === '' || body.numberHouse === '' || body.district === '' || body.city === '' || body.state === '' || body.cnpj === '') {
    return response.status(400).json({ message: 'need to fill in all fields!' });
  }

  const email = body.email;

  const count_email = await prisma.client.count({
      where: {
        email,
      }
  });

  const cnpj = body.cnpj;

  const count_cnpj = await prisma.client.count({
      where: {
        cnpj,
      }
  });

  const phone = body.phone;

  const count_phone = await prisma.client.count({
      where: {
        phone,
      }
  });

  if (count_cnpj > 0){
    return response.status(400).json({ message: "Error! This cnpj is already in use." });
  } else if (count_email > 0){
    return response.status(400).json({ message: "Error! This email is already in use." });
  } else if (count_phone > 0){
    return response.status(400).json({ message: "Error! This phone is already in use." });
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