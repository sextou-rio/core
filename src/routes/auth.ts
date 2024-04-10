import Express from "express";
import prisma from '../db/prisma';
import bcrypt from "bcryptjs"
import jwt from 'jsonwebtoken';
// ###
import { faker } from "@faker-js/faker";

const router = Express.Router();

router.get("/signup", async (_, res) => {

  await prisma.user.create({
    data: {
      username: faker.internet.userName(),
      password: bcrypt.hashSync(faker.internet.password()),
      email: faker.internet.email(),
      name: faker.person.fullName(),
      avatar: faker.image.avatar(),
    },
  });

  return res.status(201).send("User created with encrypted password")
})

router.get("/login", async (_, res) => {

  const userFound = await prisma.user.findUnique({
    where: {
      username: 'Westley78'
    }
  });

  if (userFound) {
    const token = jwt.sign({
      data: {
        username: 'Westley78',
      },
      exp: Math.floor(Date.now() / 1000) + (60 * 60 * 24 * 30), // (1 month from now)
    }, 'secretKey')

    return res.status(200).header({
      'x-sextou-authentication': token
    }).cookie('sextou-authorization', 5, { maxAge: 900000, httpOnly: true }).send("Login succesful")
  }

  return res.status(500).send("Login Error")
})

export default router