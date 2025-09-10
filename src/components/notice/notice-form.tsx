
'use client';

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import React, { useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from "@/components/ui/dialog";
import type { Notice } from "@/lib/types";
import { ScrollArea } from "@/components/ui/scroll-area";

const formSchema = z.object({
  title: z.string().min(2, { message: "Title must be at least 2 characters." }),
  content: z.string().min(10, { message: "Content must be at least 10 characters." }),
});

type NoticeFormValues = z.infer<typeof formSchema>;

interface NoticeFormProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  onSubmit: (data: NoticeFormValues) => void;
  notice: Notice | null;
}

const NoticeFormComponent = ({ isOpen, onOpenChange, onSubmit, notice }: NoticeFormProps) => {
  
  const form = useForm<NoticeFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      content: "",
    },
  });

  useEffect(() => {
    if (isOpen) {
      if (notice) {
        form.reset({
          title: notice.title,
          content: notice.content,
        });
      } else {
        form.reset({ title: "", content: "" });
      }
    }
  }, [notice, form, isOpen]);

  const handleFormSubmit = (data: NoticeFormValues) => {
    onSubmit(data);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[525px] grid-rows-[auto,1fr,auto] max-h-[90vh]">
        <DialogHeader>
          <DialogTitle>{notice ? "Edit Notice" : "Create Notice"}</DialogTitle>
          <DialogDescription>
            {notice ? "Update the details of the existing notice." : "Add a new notice to the notice board."}
          </DialogDescription>
        </DialogHeader>
        <ScrollArea className="overflow-y-auto">
          <div className="pr-6">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(handleFormSubmit)} className="space-y-4 py-4">
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Title</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., Annual Sports Day" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="content"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Content</FormLabel>
                      <FormControl>
                        <Textarea placeholder="Enter the notice details here..." {...field} rows={10}/>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </form>
            </Form>
          </div>
        </ScrollArea>
        <DialogFooter>
          <Button type="button" onClick={form.handleSubmit(handleFormSubmit)}>
            {notice ? "Save Changes" : "Create Notice"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export const NoticeForm = React.memo(NoticeFormComponent);
