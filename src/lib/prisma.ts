import { PrismaClient } from "@prisma/client";

// Tránh tạo nhiều kết nối Prisma khi Next.js reload code lúc phát triển
const globalForPrisma = global as unknown as { prisma: PrismaClient };

export const prisma = globalForPrisma.prisma || new PrismaClient();

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
