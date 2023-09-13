"use client";
import { FC } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";

interface QuoteCardProps {
    index: any;
    quote: string;
    quote_by: string;
}

const QuoteCard: FC<QuoteCardProps> = ({index, quote, quote_by}) => {
  return (
    <>
      <Card key={index} className="max-w-sm">
        <CardHeader>
          <CardTitle className="text-base">{quote}</CardTitle>
          <CardDescription>By {quote_by}</CardDescription>
        </CardHeader>
      </Card>
    </>
  );
};

export default QuoteCard;
