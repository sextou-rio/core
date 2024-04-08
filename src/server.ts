import Express from "express";
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient({ log: ['query'] });

const app = Express();

app.listen(5200)

console.log('Server running')

app.get("/events", async (_, res) => {
    const events = await prisma.user.findMany({
        include: {
            events: true,
        }
    });

    return res.status(200).send(events)
})