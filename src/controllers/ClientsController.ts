import { Request, Response } from "express";
const clientsDAO = require('../DAO/ClientsDAO')

const getClients = async (_request: Request, response: Response) => {
  const clients = await clientsDAO.getAllClients();
  return  response.status(200).json({ clients: clients });
}

const getClientById = async (request: Request, response: Response) => {
  const client = await clientsDAO.getClientById(request, response);
  return client;
}

const createClient = async (request , response: Response) => {
  const client = await clientsDAO.createClient(request, response);
  return client;
}

const updateClient = async (request , response: Response) => {
  const client = await clientsDAO.updateClient(request, response);
  return client;
}

const deleteClient = async (request , response: Response) => {
  const client = await clientsDAO.deleteClient(request, response);
  return client;
}

module.exports = {
  getClients,
  getClientById,
  createClient,
  updateClient,
  deleteClient
}