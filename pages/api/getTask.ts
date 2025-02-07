'use server';

import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    try{
        const tasks = await prisma.task.findMany();
        res.json(tasks);
      }  finally {
        await prisma.$disconnect();
      }
  }
}
