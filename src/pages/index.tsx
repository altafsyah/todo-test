import TaskList from "@/components/custom/Task";
import { Button } from "@/components/ui/button";
import { Inter } from "next/font/google";
import Link from "next/link";
const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <main
      className={`flex min-h-screen justify-center gap-5 items-center p-24 ${inter.className}`}
    >
      <Button variant="default" className="mb-4">
        <Link href="/ssr">SSR Page</Link>
      </Button>
      <Button variant="default" className="mb-4">
        <Link href="/isr">ISR Page</Link>
      </Button>
    </main>
  );
}
