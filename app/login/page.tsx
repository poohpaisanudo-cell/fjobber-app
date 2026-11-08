"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

// เช็กว่าอีเมลลงท้ายด้วย .ac.th
function isAcThEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.ac\.th$/i.test(email.trim());
}

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!isAcThEmail(email)) {
      setError("กรุณาใช้อีเมลมหาวิทยาลัยที่ลงท้ายด้วย .ac.th");
      return;
    }
    if (password.length < 8) {
      setError("รหัสผ่านต้องมีอย่างน้อย 8 ตัวอักษร");
      return;
    }

    setError("");
    router.push("/");
  }

  const inputClass =
    "mt-1 w-full rounded-md border border-gray-500/40 bg-transparent px-3 py-2";

  return (
    <main className="mx-auto w-full max-w-md px-4 py-12">
      <h1 className="text-2xl font-bold">เข้าสู่ระบบ</h1>

      <form onSubmit={handleSubmit} className="mt-6 space-y-4">
        <div>
          <label className="block text-sm font-medium">อีเมลมหาวิทยาลัย</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="name@university.ac.th"
            className={inputClass}
          />
        </div>

        <div>
          <label className="block text-sm font-medium">รหัสผ่าน</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={inputClass}
          />
        </div>

        {error && <p className="text-sm text-red-500">{error}</p>}

        <button
          type="submit"
          className="w-full rounded-md bg-blue-600 py-2.5 text-white hover:bg-blue-700"
        >
          เข้าสู่ระบบ
        </button>
      </form>

      <p className="mt-4 text-center text-sm">
        ยังไม่มีบัญชี?{" "}
        <Link href="/register" className="text-blue-600 hover:underline">
          สมัครสมาชิก
        </Link>
      </p>
    </main>
  );
}