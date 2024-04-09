import { router } from '../server';
import prisma from '../db/prisma';
import { batchEvents } from "../lib/mock";
// https://www.npmjs.com/package/zod-express-middleware

router.get("/events/generate", async (_, res) => {

  await prisma.event.createMany({
    data: batchEvents(),
  });

  return res.status(200).send("events generated")
})

router.get("/events/:eventId/rsvp/:status", async (req, res) => {

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

export default router