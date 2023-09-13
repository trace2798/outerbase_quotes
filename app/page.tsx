import QuoteFeed from "@/components/quote-feed";
import Image from "next/image";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-12 md:p-24">
      <QuoteFeed />
    </main>
  );
}
