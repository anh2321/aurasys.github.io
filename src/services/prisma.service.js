import { PrismaClient } from "@prisma/client";
let prisma;
export function getPrismaInstance() {
    if (!prisma) {
        prisma = new PrismaClient();
    }
    return prisma;
}
