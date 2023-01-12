import { Request, Response } from "express";
import { prisma } from "../prisma";
import { z } from 'zod';

const getProviders = async (_request: Request, response: Response) => {
  const providers = await prisma.providers.findMany();

  return  response.status(200).json({ providers: providers });
}

const getProviderById = async (request: Request, response: Response) => {
  const getProviderBody = z.object({
    id: z.number(),
  });

  const { id } = getProviderBody.parse(request.body);

  const count_id = await prisma.provider.count({
    where: {
      id,
    }
  });

  if(count_id > 0){
    const providers = await prisma.provider.findUnique({
      where: {
          id,
      }
    });
    return response.status(200).json({ providers: providers });
  }

  return response.status(400).send('this id does not exist');
}

const createProvider = async (request , response: Response) => {
  const createProviderBody = z.object({
    name: z.string(),
    email: z.string(),
    phone: z.string(),
    cep: z.string(),
    street: z.string(),
    numberHouse: z.string(),
    district: z.string(),
    city: z.string(),
    state: z.string(),
    cnpj: z.string()
  });

  const {name, email, phone, cep, street, numberHouse, district, city, state, cnpj} = createProviderBody.parse(request.body);

  const count_email = await prisma.provider.count({
    where: {
      email,
    }
  });

  const count_cnpj = await prisma.provider.count({
      where: {
        cnpj,
      }
  });

  const count_phone = await prisma.provider.count({
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

  await prisma.provider.create({
    data: {
      name,
      email,
      phone, 
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

const updateProvider = async (request , response: Response) => {
  const updateProviderBody = z.object({
    id: z.number(),
    name: z.string(),
    phone: z.string(),
    cep: z.string(),
    street: z.string(),
    numberHouse: z.string(),
    district: z.string()
  });

  const {id, name, phone, price, cep, street, numberHouse, district} = updateProviderBody.parse(request.body);

  await prisma.provider.update({
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

const deleteProvider = async (request , response: Response) => {
  const deleteProviderBody = z.object({
    id: z.number(),
  });

  const { id } = deleteProviderBody.parse(request.body);

  const count_id = await  prisma.provider.count({
    where: {
      id,
    }
  });

  if(count_id > 0){
    await prisma.provider.delete({
      where: {
          id,
      }
    });
  
    return response.status(202).send('success');
  }

  return response.status(400).send('this id does not exist');
}

module.exports = {
  getProviders,
  getProviderById,
  createProvider,
  updateProvider,
  deleteProvider
}