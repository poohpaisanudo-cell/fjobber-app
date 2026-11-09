import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";

// เช็กว่าโดเมนอีเมลอยู่ในรายการที่อนุญาต (ตั้งใน .env)
function isAllowedEmail(email: string) {
  if (!email.includes("@")) return false;
  const domain = email.split("@")[1]?.toLowerCase();
  if (!domain) return false;

  const allowed = (process.env.ALLOWED_EMAIL_DOMAINS ?? "")
    .split(",")
    .map((d) => d.trim().toLowerCase())
    .filter(Boolean);

  return allowed.some((d) => domain === d || domain.endsWith("." + d));
}

export async function POST(request: Request) {
  const body = await request.json();
  const email = String(body.email ?? "").trim().toLowerCase();
  const password = String(body.password ?? "");

  if (!isAllowedEmail(email)) {
    return NextResponse.json(
      { error: "กรุณาใช้อีเมลมหาวิทยาลัยของคุณ" },
      { status: 400 }
    );
  }
  if (password.length < 8) {
    return NextResponse.json(
      { error: "รหัสผ่านต้องมีอย่างน้อย 8 ตัวอักษร" },
      { status: 400 }
    );
  }

  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) {
    return NextResponse.json(
      { error: "อีเมลนี้ถูกใช้สมัครแล้ว" },
      { status: 409 }
    );
  }

  const passwordHash = await bcrypt.hash(password, 10);
  await prisma.user.create({ data: { email, passwordHash } });

  return NextResponse.json({ ok: true }, { status: 201 });
}