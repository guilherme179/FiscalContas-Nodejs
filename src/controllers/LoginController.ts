import { prisma } from "../prisma";
import { Request, Response } from "express";
import { z } from "zod";
import jwt from "jsonwebtoken";

const login = async (request: Request, response: Response) => {
  const getClientBody = z.object({
    login:     z.string(),
    password:  z.string(),
  });
''
  const { login, password } = getClientBody.parse(request.body);

  const data = await prisma.$transaction([
    prisma.user.count({
      where: {
        login,
        password,
        active: 1
      }
    }),
    prisma.user.findFirst({
      where: {
        login,
        password,
        active: 1
      }
    })
  ]);

  if(data[0] > 0){
    const expiredAt = Math.floor(Date.now() / 1000) + 86400;

    var token = jwt.sign({ user: data[1].login, id: data[1].id, admin: data[1].admin, exp: expiredAt }, 'a4639bcc6786cf0f399675b012892ead', { algorithm: 'HS256' });

    return response.status(202).json({ token: token });
  }

  return response.status(401).send('this login does not exist');
}

module.exports = {
  login
}