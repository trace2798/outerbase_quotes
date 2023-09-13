"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { zodResolver } from "@hookform/resolvers/zod";

import { useUser } from "@clerk/nextjs";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "./ui/form";

import { useParams, useRouter } from "next/navigation";
import { Textarea } from "./ui/textarea";
import { useToast } from "./ui/use-toast";

const formSchema = z.object({
  quote: z.string().min(2),
  quote_by: z.string().min(2),
  user_id: z.string().min(1, {
    message: "User id is required.",
  }),
  user_name: z.string().min(1, {
    message: "User name is required.",
  }),
});

interface AddQuoteFormProps {}

export const AddQuote: React.FC<AddQuoteFormProps> = ({}) => {
  const params = useParams();
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { toast } = useToast();
  const { user } = useUser();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      quote: "",
      quote_by: "",
      user_id: user?.id ?? "Anomynous",
      user_name: user?.firstName ?? "Anomynous",
    },
  });

  type FormData = z.infer<typeof formSchema>;

  const onSubmit: SubmitHandler<FormData> = async (values) => {
    try {
      setLoading(true);

      console.log(values);
      await fetch(`https://supposed-tomato.cmd.outerbase.io/postAQuote`, {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          quote: values.quote,
          quote_by: values.quote_by,
          user_name: values.user_name,
          user_id: values.user_id,
        }),
      });
      toast({
        description: "Success.",
        duration: 3000,
      });
      router.refresh();
      router.push("/");
    } catch (error) {
      console.error(error);
      toast({
        title: "Failed to submit data",
        description: "Make sure all fields are filled up.",
        variant: "destructive",
      });
    }
  };

  const isLoading = form.formState.isSubmitting;

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline">Add Quote</Button>
      </SheetTrigger>
      <SheetContent className="w-full md:w-[50%] lg::w-[25%]" side="right">
        <SheetHeader>
          <SheetTitle>Add A Quote</SheetTitle>
          <SheetDescription>Add your favorite quote</SheetDescription>
        </SheetHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col w-full grid-cols-12 gap-2 px-2 py-4 mt-5 border rounded-lg md:px-4 focus-within:shadow-sm"
          >
            <FormLabel className="mt-3">Quote</FormLabel>
            <FormField
              control={form.control}
              name="quote"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Textarea
                      placeholder="Quote you want to share. Do not use apostrophe or special characters"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormLabel className="mt-3">Quote By</FormLabel>
            <FormField
              control={form.control}
              name="quote_by"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input placeholder="Who said it" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="mt-5" disabled={isLoading}>
              Submit
            </Button>
          </form>
        </Form>

        <SheetFooter className="mt-10">
          <SheetClose asChild>
            <Button type="submit">Close form</Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};
