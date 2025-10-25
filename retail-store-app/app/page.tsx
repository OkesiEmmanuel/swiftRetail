import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex min-h-screen  bg-dark font-sans dark:bg-white">
      <main className="flex min-h-screen w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black sm:items-start">
       <div className="space-y-2">
        <Link href="/dashboard" className="text-blue-600 underline">Open Dashboard</Link>
        <Link href="/api/docs" className="text-blue-600 underline">API Docs (Swagger JSON)</Link>
      </div>
      </main>
    </div>
  );
}
