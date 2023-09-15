import { FC } from "react";
import QuoteCard from "./quote-card";

interface QuoteFeedProps {}

const QuoteFeed: FC<QuoteFeedProps> = async ({}) => {
  const quotes = await fetch(
    `https://daily-beige.cmd.outerbase.io/getAllQuote`,
    {
      method: "GET",
      headers: {
        "content-type": "application/json",
      },
      cache: "no-cache",
    }
  );
  const data = await quotes.json();
  return (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-2 pb-10">
        {data.response.items.map((quote: any, index: any) => (
          <QuoteCard
            key={index}
            index={index}
            quote={quote.quote}
            quote_by={quote.quote_by}
          />
        ))}
      </div>
    </>
  );
};

export default QuoteFeed;
