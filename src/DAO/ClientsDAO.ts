import { prisma } from "./prisma";
import { z } from 'zod';

const getAllClients = async () => {
  const clients = await prisma.client.findMany();

  return clients;
};

const createClient = async (request, response) => {
  const createClientBody = z.object({
    name: z.string(),
    email: z.string(),
    phone: z.string(),
    price: z.string(),
    cep: z.string(),
    street: z.string(),
    numberHouse: z.string(),
    district: z.string(),
    city: z.string(),
    state: z.string(),
    cnpj: z.string()
  });

  const {name, email, phone, price, cep, street, numberHouse, district, city, state, cnpj} = createClientBody.parse(request.body);

  await prisma.client.create({
    data: {
      name,
      email,
      phone, 
      price, 
      cep, 
      street, 
      numberHouse, 
      district, 
      city, 
      state, 
      cnpj
    }
  });
  
  return response.status(201);
}

module.exports = {
  getAllClients,
  createClient
};