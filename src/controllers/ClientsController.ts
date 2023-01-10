import { Request, Response } from "express";
import { prisma } from "../prisma";
import { z } from 'zod';

const getClients = async (_request: Request, response: Response) => {
  const clients = await prisma.client.findMany();

  return  response.status(200).json({ clients: clients });
}

const getClientById = async (request: Request, response: Response) => {
  const getClientBody = z.object({
    id: z.number(),
  });

  const { id } = getClientBody.parse(request.body);

  const count_id = await prisma.client.count({
    where: {
      id,
    }
  });

  if(count_id > 0){
    const clients = await prisma.client.findUnique({
      where: {
          id,
      }
    });
    return response.status(200).json({ clients: clients });
  }

  return response.status(400).send('this id does not exist');
}

const createClient = async (request , response: Response) => {
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

  const count_email = await prisma.client.count({
    where: {
      email,
    }
  });

  const count_cnpj = await prisma.client.count({
      where: {
        cnpj,
      }
  });

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
  
  return response.status(201).json({'message' : 'success'});
}

const updateClient = async (request , response: Response) => {
  const updateClientBody = z.object({
    id: z.number(),
    name: z.string(),
    phone: z.string(),
    price: z.string(),
    cep: z.string(),
    street: z.string(),
    numberHouse: z.string(),
    district: z.string()
  });

  const {id, name, phone, price, cep, street, numberHouse, district} = updateClientBody.parse(request.body);

  await prisma.client.update({
    data: {
      name,
      phone, 
      price, 
      cep, 
      street, 
      numberHouse, 
      district, 
    },
    where: {
      id
    }
  });
  
  return response.status(202).send('success');
}

const deleteClient = async (request , response: Response) => {
  const deleteClientBody = z.object({
    id: z.number(),
  });

  const { id } = deleteClientBody.parse(request.body);

  const count_id = await  prisma.client.count({
    where: {
      id,
    }
  });

  if(count_id > 0){
    const clients = await prisma.client.delete({
      where: {
          id,
      }
    });
  
    return response.status(202).send('success');
  }

  return response.status(400).send('this id does not exist');
}

module.exports = {
  getClients,
  getClientById,
  createClient,
  updateClient,
  deleteClient
}