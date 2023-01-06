import { Request, Response } from "express";
const clientsDAO = require('../DAO/ClientsDAO')

const getClients = async (_request: Request, response: Response) => {
  const clients = await clientsDAO.getAllClients();
  return  response.status(200).json({ clients: clients });
}

const createClients = async (request , response: Response) => {
  const clients = await clientsDAO.createClient(request, response);
  return  clients;
}

module.exports = {
  getClients,
  createClients
}