import Link from "next/link";

const features = [
  { title: "ติดตามการสมัคร", desc: "เก็บบริษัท ตำแหน่ง สถานะ และวันปิดรับสมัครไว้ในที่เดียว" },
  { title: "รีวิวจากรุ่นพี่", desc: "ดูค่าตอบแทน คำถามสัมภาษณ์ และประสบการณ์จริงของแต่ละบริษัท" },
  { title: "เตือนก่อนหมดเวลา", desc: "ดูรายการที่ใกล้ครบกำหนดในที่เดียว ไม่พลาดวันสมัคร" },
];

export default function Home() {
  return (
    <main className="mx-auto max-w-5xl px-4 py-12">
      <section className="text-center">
        <h1 className="text-3xl font-bold sm:text-4xl">
          หาที่ฝึกงานให้ง่ายขึ้น ไม่พลาดทุกกำหนดการ
        </h1>
        <p className="mt-4 text-gray-500">
          เว็บติดตามการสมัครฝึกงานและแชร์รีวิวสำหรับนักศึกษา
        </p>
        <div className="mt-6 flex justify-center gap-3">
          <Link
            href="/login"
            className="rounded-md bg-blue-600 px-5 py-2.5 text-white hover:bg-blue-700"
          >
            เริ่มใช้งาน
          </Link>
        </div>
      </section>

      <section className="mt-12 grid gap-4 sm:grid-cols-3">
        {features.map((f) => (
          <div key={f.title} className="rounded-lg border border-gray-500/30 p-5">
            <h2 className="font-semibold">{f.title}</h2>
            <p className="mt-2 text-sm text-gray-500">{f.desc}</p>
          </div>
        ))}
      </section>
    </main>
  );
}