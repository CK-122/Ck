
'use client';

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import React, { useState, useCallback } from "react";
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
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const formSchema = z.object({
  className: z.string().min(1, { message: "Class name is required." }),
  rollNumber: z.string().min(1, { message: "Roll no. is required." }),
});

const GenerateMarksheetFormComponent = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<any | null>(null);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      className: "",
      rollNumber: "",
    },
  });

  const onSubmit = useCallback(async (values: z.infer<typeof formSchema>) => {
    setIsLoading(true);
    setResult(null);
    try {
      // Placeholder for marksheet generation
      await new Promise(resolve => setTimeout(resolve, 2000)); // Simulate processing time
      
      toast({ 
        title: "Feature Coming Soon", 
        description: "AI-powered marksheet generation will be available in a future update." 
      });
    } catch (error: any) {
      console.error(error);
      toast({ variant: "destructive", title: "Generation Failed", description: error.message || "Could not generate the marksheet." });
    } finally {
      setIsLoading(false);
    }
  }, [toast]);

  return (
    <Card className="max-w-4xl mx-auto mt-8">
      <CardHeader>
        <CardTitle>Generate Marksheet</CardTitle>
        <CardDescription>Enter the student's class and roll number to generate a designed marksheet.</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="className"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Class Name</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., 10" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="rollNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Roll No.</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., 101" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <Button type="submit" disabled={isLoading}>
              {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Generate
            </Button>
          </form>
        </Form>
        {isLoading && (
            <div className="mt-8 border-t pt-6 text-center">
                <Loader2 className="h-8 w-8 animate-spin mx-auto text-primary" />
                <p className="text-muted-foreground mt-2">Generating your beautifully designed marksheet...</p>
            </div>
        )}
        {result && (
          <div className="mt-8 border-t pt-6 space-y-4">
            <h3 className="text-lg font-semibold">Generated Marksheet Preview</h3>
             <Card>
              <CardContent className="p-0">
                 <iframe
                    srcDoc={result.marksheetHtml}
                    className="w-full h-[800px] border-0"
                    title="Generated Marksheet"
                 />
              </CardContent>
            </Card>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

export const GenerateMarksheetForm = React.memo(GenerateMarksheetFormComponent);
