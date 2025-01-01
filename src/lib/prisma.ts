import { PrismaClient } from '@prisma/client';

// Extend the global object to include the `prisma` property
declare global {
  var prisma: PrismaClient | undefined;
}

// Ensure `prisma` is a singleton across hot-reloads in development
export const prisma =
  global.prisma ||
  new PrismaClient({
    log: ['query'], // Log Prisma queries (optional for debugging)
  });

if (process.env.NODE_ENV !== 'production') {
  global.prisma = prisma;
}