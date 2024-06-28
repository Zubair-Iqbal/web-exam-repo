'use server';

import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  const { name } = req.body;

  if (!name) {
    return res.status(400).json({ message: "Missing name in request body" });
  }

  try {
    const newEntry = await prisma.task.create({
      data: {
        name,
      },
    });

    res.status(201).json({ message: "Entry created successfully", entry: newEntry });
  } catch (error) {
    console.error("Error creating entry:", error);
    res.status(500).json({ message: "Error creating entry", error: error.message });
  } finally {
    await prisma.$disconnect();
  }
}