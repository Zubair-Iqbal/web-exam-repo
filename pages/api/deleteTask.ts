'use server';

import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const taskId = req.query.id;
    if (req.method === 'DELETE') {
        const deletedTask = await prisma.task.delete({
          where: { id: taskId },
        });
    
        res.json(deletedTask);
      } else {
        res.status(405).json({ error: 'Method Not Allowed' });
      }
}
