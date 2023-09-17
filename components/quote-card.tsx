"use client";
import { FC } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { useUser } from "@clerk/nextjs";
import { MoreHorizontal, Trash } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "./ui/button";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";

interface QuoteCardProps {
  index: any;
  quote: string;
  quote_by: string;
  user_id: string;
  quote_id: string;
}

const QuoteCard: FC<QuoteCardProps> = ({
  index,
  quote,
  quote_by,
  user_id,
  quote_id,
}) => {
  const { user } = useUser();
  const router = useRouter();
  const { toast } = useToast();
  const current_id = user?.id;
  const onDelete = async () => {
    try {
      console.log(quote_id, "inside delete");
      await fetch(`https://daily-beige.cmd.outerbase.io/deleteQuoteById`, {
        method: "DELETE",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          id: quote_id.toString(),
        }),
      });
      toast({
        description: "Success.",
      });
      router.refresh();
    } catch (error) {
      toast({
        variant: "destructive",
        description: "Something went wrong.",
      });
    }
  };
  return (
    <>
      <Card key={index} className="max-w-sm">
        <CardHeader>
          <CardTitle className="text-base">{quote}</CardTitle>
          <CardDescription>By {quote_by}</CardDescription>
        </CardHeader>
        {current_id === user_id && (
          <CardFooter>
            <div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    className="flex h-8 w-8 p-0 data-[state=open]:bg-muted"
                  >
                    <MoreHorizontal className="h-4 w-4" />
                    <span className="sr-only">Open menu</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-[160px]">
                  <Link href={`/`}>
                    {" "}
                    <DropdownMenuItem disabled>Edit (WIP)</DropdownMenuItem>
                  </Link>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={onDelete}>Delete</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </CardFooter>
        )}
      </Card>
    </>
  );
};

export default QuoteCard;
