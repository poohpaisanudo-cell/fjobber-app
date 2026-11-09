import { PrismaClient } from "@prisma/client";

// ใช้ตัวเชื่อมฐานข้อมูลตัวเดียวทั้งโปรเจกต์
// (กันไม่ให้สร้างการเชื่อมต่อใหม่ทุกครั้งที่แก้โค้ดตอนรัน npm run dev)
const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient };

export const prisma = globalForPrisma.prisma ?? new PrismaClient();

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}