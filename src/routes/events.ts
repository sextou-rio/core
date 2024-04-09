import Express from "express";
import prisma from '../db/prisma';
import { batchEvents } from "../lib/mock";
// https://www.npmjs.com/package/zod-express-middleware

const router = Express.Router();

router.get("/generate", async (_, res) => {

  await prisma.event.createMany({
    data: batchEvents(),
  });

  return res.status(200).send("events generated")
})

router.get("/", async (_, res) => {

  const eventsFromTodayOn = await prisma.event.findMany({
    where: {
      date: {
        gte: new Date()
      }
    },
    orderBy: {
      date: "asc"
    }
  })

  return res.status(200).send(eventsFromTodayOn)
})

router.get("/:eventId/", async (req, res) => {

  const { eventId } = req.params;

  let eventDetails = await prisma.event.findUnique({
    where: {
      id: eventId,
    },
    include: {
      RSVP: {
        select: {
          User: true,
          status: true,
        },
        orderBy: {
          rSVP_StatusId: "asc"
        }
      }
    }
  });

  // TODO: handle user table output
  // const { RSVP, ...eventData } = eventDetails;

  return res.status(200).send(eventDetails)
})

router.get("/:eventId/rsvp/:status", async (req, res) => {

  const { eventId, status } = req.params;
  const userId = req.header('x-sextou-user');

  if (!userId) {
    return res.status(400).send("User ID is needed")
  }

  const statusAsNumber = Number(status)

  if (!statusAsNumber) {
    return res.status(400).send("Status should be one of enumerated")
  }

  let updateRSVP = await prisma.rSVP_List.create({
    data: {
      eventId,
      userId,
      rSVP_StatusId: statusAsNumber,
    }
  });

  return res.status(200).send(updateRSVP)
})

export default router