"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FC, useState } from "react";
import { Textarea } from "./ui/textarea";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { useRouter } from "next/navigation";
import { useToast } from "./ui/use-toast";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

interface EditProps {
  quote: string;
  quote_by: string;
  quote_id: string;
}

const formSchema = z.object({
  quote: z.string().min(2),
  quote_by: z.string().min(2),
  quote_id: z.string().min(1),
});

export const Edit: FC<EditProps> = ({ quote, quote_by, quote_id }) => {
  const router = useRouter();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      quote: quote,
      quote_by: quote_by,
      quote_id: quote_id.toString(),
    },
  });

  type FormData = z.infer<typeof formSchema>;

  const onSubmit: SubmitHandler<FormData> = async (values) => {
    try {
      setLoading(true);
      await fetch(`https://daily-beige.cmd.outerbase.io/updateQuoteById`, {
        method: "PUT",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          quote: values.quote,
          quote_by: values.quote_by,
          id: values.quote_id,
        }),
      });
      toast({
        description: "Request to update code successfully send.",
        duration: 3000,
      });
      form.reset();
      router.refresh();
      router.push("/");
    } catch (error) {
      toast({
        title: "Failed to submit data",
        description: "Make sure all fields are filled up.",
        variant: "destructive",
      });
    }
  };

  const isLoading = form.formState.isSubmitting;

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Edit Quote</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit quote</DialogTitle>
          <DialogDescription>
            Make changes to your quote here. Click &quot;Update Quote&quot; when you are done.
          </DialogDescription>
        </DialogHeader>
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
                    <Textarea placeholder={quote} {...field} />
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
                    <Input placeholder={quote_by} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormLabel className="mt-3">
              Quote Id (Just for reference here)
            </FormLabel>
            <FormField
              control={form.control}
              name="quote_id"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      placeholder={quote_id.toString()}
                      {...field}
                      disabled
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="mt-5" disabled={isLoading}>
              Update Quote
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
