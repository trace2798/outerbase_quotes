"use client";
import { FC } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import Link from "next/link";

interface QuoteFeedProps {}

const QuoteFeed: FC<QuoteFeedProps> = async ({}) => {
  const quotes = await fetch(`https://supposed-tomato.cmd.outerbase.io/getAllQuotes`, {
    method: "GET",
    headers: {
      "content-type": "application/json",
    },
    cache: "no-cache",
  });
  const data = await quotes.json();
  console.log(data, "DATA");
  return (
    <>
     <div className="grid grid-cols-1  gap-2 pb-10">
        {data.response.items.map((quote: any, index: any) => (
          <Card key={index} className="max-w-sm">
            <Link href={`/book/${quote.id}`}>
              <CardHeader>
                <CardTitle className="text-base">{quote.quote}</CardTitle>
                <CardDescription>By {quote.quote_by}</CardDescription>
                {/* <CardContent>
                  <img src={book.src} alt="book" />
                </CardContent> */}
              </CardHeader>
            </Link>
          </Card>
        ))}
      </div>
    </>
  );
};

export default QuoteFeed;
