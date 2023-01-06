import { prisma } from "./prisma";
import { z } from 'zod';

const getAllClients = async (_request, _response) => {
  const clients = await prisma.client.findMany();

  return clients;
};

const getClientById = async (request, _response) => {
  const id  = request.body.id;
  const clients = await prisma.client.findUnique({
    where: {
        id,
    }
  });

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
  
  return response.status(201).send('success');
}

const updateClient = async (request, response) => {
  const updateClientBody = z.object({
    id: z.number(),
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

  const {id, name, email, phone, price, cep, street, numberHouse, district, city, state, cnpj} = updateClientBody.parse(request.body);

  await prisma.client.update({
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
    },
    where: {
      id
    }
  });
  
  return response.status(201).send('success');
}

module.exports = {
  getAllClients,
  getClientById,
  createClient,
  updateClient,
};