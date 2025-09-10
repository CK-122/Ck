
'use client';

import { zodResolver } from "@hookform/resolvers/zod";
import { useFieldArray, useForm } from "react-hook-form";
import * as z from "zod";
import React, { useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, PlusCircle, Trash2, Image as ImageIcon } from "lucide-react";
import { generateAdmitCards, GenerateAdmitCardsInput } from "@/ai/flows/generate-admit-cards";
import { useToast } from "@/hooks/use-toast";

const studentSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  rollNumber: z.string().min(1, 'Roll no. is required'),
  photoDataUri: z.string().min(1, 'Photo is required'),
});

const formSchema = z.object({
  classDetails: z.string().min(1, { message: "Class details are required." }),
  studentDetails: z.array(studentSchema).min(1, "At least one student is required."),
});

const toBase64 = (file: File): Promise<string> => new Promise((resolve, reject) => {
  const reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = () => resolve(reader.result as string);
  reader.onerror = error => reject(error);
});

const GenerateAdmitCardFormComponent = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      classDetails: "",
      studentDetails: [],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "studentDetails",
  });

  const onSubmit = useCallback(async (values: z.infer<typeof formSchema>) => {
    setIsLoading(true);
    try {
      const result = await generateAdmitCards(values as GenerateAdmitCardsInput);
      
      const pdfContent = atob(result.pdfDataUri.split(',')[1]);
      const byteNumbers = new Array(pdfContent.length);
      for (let i = 0; i < pdfContent.length; i++) {
        byteNumbers[i] = pdfContent.charCodeAt(i);
      }
      const byteArray = new Uint8Array(byteNumbers);
      const blob = new Blob([byteArray], {type: 'application/pdf'});
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = 'admit-cards.pdf';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      toast({ title: "Admit Cards Generated", description: "PDF download has started." });
    } catch (error) {
      console.error(error);
      toast({ variant: "destructive", title: "Generation Failed", description: "Could not generate the admit cards." });
    } finally {
      setIsLoading(false);
    }
  }, [toast]);

  const handleFileChange = useCallback(async (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const base64 = await toBase64(file);
      form.setValue(`studentDetails.${index}.photoDataUri`, base64);
    }
  }, [form]);

  return (
    <Card className="max-w-4xl mx-auto mt-8">
      <CardHeader>
        <CardTitle>Generate Admit Cards</CardTitle>
        <CardDescription>Add class details and student information to generate admit cards.</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="classDetails"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Class/Exam Details</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., Annual Examination - Class 10" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="space-y-4">
              <FormLabel>Student Details</FormLabel>
              {fields.map((field, index) => (
                <Card key={field.id} className="p-4 relative">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name={`studentDetails.${index}.name`}
                      render={({ field }) => <FormItem><FormLabel>Name</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>}
                    />
                     <FormField
                      control={form.control}
                      name={`studentDetails.${index}.rollNumber`}
                      render={({ field }) => <FormItem><FormLabel>Roll No.</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>}
                    />
                  </div>
                  <div className="mt-4">
                    <FormField
                      control={form.control}
                      name={`studentDetails.${index}.photoDataUri`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Photo</FormLabel>
                          <div className="flex items-center gap-4">
                            <div className="w-16 h-16 bg-muted rounded flex items-center justify-center">
                              {field.value ? <img src={field.value} alt="Student" className="w-full h-full object-cover rounded"/> : <ImageIcon className="w-8 h-8 text-muted-foreground"/> }
                            </div>
                            <FormControl>
                              <Input type="file" accept="image/*" onChange={(e) => handleFileChange(e, index)} className="flex-1"/>
                            </FormControl>
                          </div>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <Button type="button" variant="destructive" size="icon" className="absolute top-2 right-2 h-7 w-7" onClick={() => remove(index)}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </Card>
              ))}
              <Button type="button" variant="outline" onClick={() => append({ name: '', rollNumber: '', photoDataUri: '' })}>
                <PlusCircle className="mr-2 h-4 w-4" /> Add Student
              </Button>
              <FormMessage>{form.formState.errors.studentDetails?.message}</FormMessage>
            </div>

            <Button type="submit" disabled={isLoading}>
              {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Generate & Download PDF
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}

export const GenerateAdmitCardForm = React.memo(GenerateAdmitCardFormComponent);
