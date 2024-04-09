import Express from "express";
import prisma from '../db/prisma';
import bcrypt from "bcryptjs"

const router = Express.Router();

router.get("/generate", async (_, res) => {
  await prisma.user.createMany({
    data: batchUsers(),
  });

  return res.status(200).send("users generated")
})

export default router