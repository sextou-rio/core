import Express from "express";
import { PrismaClient } from '@prisma/client'
import { batchEvents, batchUsers } from "./lib/mock";

const prisma = new PrismaClient({ log: ['query'] });

const app = Express();

app.listen(5200)

console.log('Server running');

app.get("/events/generate", async (_, res) => {
  await prisma.event.createMany({
    data: batchEvents(),
  });

  return res.status(200).send("events generated")
})

app.get("/users/generate", async (_, res) => {
  await prisma.user.createMany({
    data: batchUsers(),
  });

  return res.status(200).send("users generated")
})

app.get("/events/:eventId/rsvp/:status", async (req, res) => {

  const { eventId, status } = req.params;
  const userId = req.header('x-sextou-user');

  if (!userId) {
    return res.status(400).send("User ID is needed")
  }

  const statusAsNumber = Number(status)

  if (!statusAsNumber) {
    return res.status(400).send("Status should be one of enumerated")
  }

  let output;

  output = await prisma.rSVP_List.create({
    data: {
      eventId,
      userId,
      rSVP_StatusId: statusAsNumber,
    }
  });

  return res.status(200).send({ output })
})