import { prisma } from "../prisma";
import { Request, Response } from "express";
import { z } from "zod";
import { jwt } from "jsonwebtoken";

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
        password
      }
    }),
    prisma.user.findFirst({
      where: {
        login,
        password
      }
    })
  ]);

  if(data[0] > 0){
    jwt.sign();

    return response.status(202).json({ token: jwt });
  }

  return response.status(400).send('this login does not exist');
}

module.exports = {
  login
}