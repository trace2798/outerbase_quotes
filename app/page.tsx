import QuoteFeed from "@/components/quote-feed";


export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-12 md:p-24">
      <QuoteFeed />
    </main>
  );
}
