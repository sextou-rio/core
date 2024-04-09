import express from 'express';
import { batchUsers } from "../lib/mock";

const router = express.Router();

router.get('/', (req, res) => {
  res.send('Get all users');
});

// app.get("/users/generate", async (_, res) => {
//   await prisma.user.createMany({
//     data: batchUsers(),
//   });

//   return res.status(200).send("users generated")
// })

export default router