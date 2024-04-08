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

app.get("/events", async (_, res) => {
    const events = await prisma.user.findMany({
        include: {
            events: true,
        }
    });

    return res.status(200).send(events)
})

app.get("/users/generate", async (_, res) => {
    await prisma.user.createMany({
        data: batchUsers(),
    });

    return res.status(200).send("users generated")
})