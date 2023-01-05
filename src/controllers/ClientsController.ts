import { Request, Response } from "express";
const clientsDAO = require('../DAO/ClientsDAO')

const getClients = (request: Request, response: Response) => {
  const clients = clientsDAO.getAllClients;
  return  response.status(200).json({ clients: clients });
}

const createClients = (request: Request, response: Response) => {
  console.log(request.body);
  return  response.send(request.body);
}

module.exports = {
  getClients,
  createClients
}