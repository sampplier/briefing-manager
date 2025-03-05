import { PrismaClient } from "@prisma/client";
import dotenv from "dotenv";

dotenv.config({ path: ".env.test" });

const prismaTest = new PrismaClient();

export default prismaTest;
