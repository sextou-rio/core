import { router } from '../server';
import prisma from '../db/prisma';
import { batchUsers } from "../lib/mock";

router.get("/users/generate", async (_, res) => {
  await prisma.user.createMany({
    data: batchUsers(),
  });

  return res.status(200).send("users generated")
})

export default router