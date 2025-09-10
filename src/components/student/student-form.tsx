
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
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from "@/components/ui/dialog";
import type { Student } from "@/lib/types";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useAuth } from "@/hooks/use-auth";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Textarea } from "../ui/textarea";

const formSchema = z.object({
  name: z.string().min(2, { message: "Student name must be at least 2 characters." }),
  rollNumber: z.string().min(1, { message: "Roll no. is required." }),
  class: z.string().min(1, { message: "Class is required." }),
  fatherName: z.string().min(2, { message: "Father's name must be at least 2 characters." }),
  motherName: z.string().min(2, { message: "Mother's name must be at least 2 characters." }),
  category: z.enum(["CK", "MTQ"], { required_error: "You need to select a category." }),
  srNumber: z.string().optional(),
  penNumber: z.string().optional().refine(val => !val || val.length === 11, { message: "PEN No. must be exactly 11 digits." }),
  phone: z.string().optional().refine(val => !val || val.length === 10, { message: "Phone no. must be exactly 10 digits." }),
  address: z.string().min(10, { message: "Address must be at least 10 characters." }),
});

type StudentFormValues = z.infer<typeof formSchema>;

interface StudentFormProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  onSubmit: (data: StudentFormValues) => void;
  student: Student | null;
}

const StudentFormComponent = ({ isOpen, onOpenChange, onSubmit, student }: StudentFormProps) => {
  
  const form = useForm<StudentFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      rollNumber: "",
      class: "",
      fatherName: "",
      motherName: "",
      address: "",
      category: "CK",
      penNumber: "",
      phone: "",
      srNumber: "",
    },
  });

  useEffect(() => {
    if (isOpen) {
      if (student) {
        form.reset(student);
      } else {
        form.reset({
          name: "",
          rollNumber: "",
          class: "",
          fatherName: "",
          motherName: "",
          address: "",
          category: "CK",
          penNumber: "",
          phone: "",
          srNumber: "",
        });
      }
    }
  }, [student, form, isOpen]);

  const handleFormSubmit = (data: StudentFormValues) => {
    onSubmit(data);
  };
  
  const handleNumericInput = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, fieldName: keyof StudentFormValues) => {
    const value = e.target.value;
    if (/^\d*$/.test(value)) {
        form.setValue(fieldName, value);
    }
  }


  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[625px] grid-rows-[auto,1fr,auto] max-h-[90vh]">
        <DialogHeader>
          <DialogTitle>{student ? "Edit Student" : "Add Student"}</DialogTitle>
          <DialogDescription>
            {student ? "Update the details of the existing student." : "Add a new student to the system."}
          </DialogDescription>
        </DialogHeader>
        <ScrollArea className="overflow-y-auto -mr-6">
          <div className="pr-6">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(handleFormSubmit)} className="space-y-4 py-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <FormField
                        control={form.control}
                        name="class"
                        render={({ field }) => (
                            <FormItem>
                            <FormLabel>Class</FormLabel>
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
                                    <Input 
                                        placeholder="e.g., 101" 
                                        {...field}
                                        onChange={(e) => handleNumericInput(e, "rollNumber")}
                                    />
                                </FormControl>
                                <FormMessage />
                                </FormItem>
                            )}
                         />
                         <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                <FormLabel>Student Name</FormLabel>
                                <FormControl>
                                    <Input placeholder="e.g., John Doe" {...field} />
                                </FormControl>
                                <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                     <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <FormField
                            control={form.control}
                            name="fatherName"
                            render={({ field }) => (
                                <FormItem>
                                <FormLabel>Father's Name</FormLabel>
                                <FormControl>
                                    <Input placeholder="e.g., Richard Doe" {...field} />
                                </FormControl>
                                <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="motherName"
                            render={({ field }) => (
                                <FormItem>
                                <FormLabel>Mother's Name</FormLabel>
                                <FormControl>
                                    <Input placeholder="e.g., Jane Doe" {...field} />
                                </FormControl>
                                <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>

                    <FormField
                        control={form.control}
                        name="category"
                        render={({ field }) => (
                            <FormItem className="space-y-3">
                            <FormLabel>Category</FormLabel>
                            <FormControl>
                                <RadioGroup
                                onValueChange={field.onChange}
                                defaultValue={field.value}
                                className="flex items-center space-x-4"
                                >
                                <FormItem className="flex items-center space-x-2 space-y-0">
                                    <FormControl>
                                    <RadioGroupItem value="CK" />
                                    </FormControl>
                                    <FormLabel className="font-normal">CK</FormLabel>
                                </FormItem>
                                <FormItem className="flex items-center space-x-2 space-y-0">
                                    <FormControl>
                                    <RadioGroupItem value="MTQ" />
                                    </FormControl>
                                    <FormLabel className="font-normal">MTQ</FormLabel>
                                </FormItem>
                                </RadioGroup>
                            </FormControl>
                            <FormMessage />
                            </FormItem>
                        )}
                    />

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <FormField
                            control={form.control}
                            name="srNumber"
                            render={({ field }) => (
                                <FormItem>
                                <FormLabel>SR No. (Optional)</FormLabel>
                                <FormControl>
                                    <Input 
                                        placeholder="e.g., 12345"
                                        {...field}
                                        onChange={(e) => handleNumericInput(e, "srNumber")}
                                    />
                                </FormControl>
                                <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="penNumber"
                            render={({ field }) => (
                                <FormItem>
                                <FormLabel>PEN No. (Optional)</FormLabel>
                                <FormControl>
                                     <Input
                                        placeholder="11 digit number"
                                        {...field}
                                        maxLength={11}
                                        onChange={(e) => handleNumericInput(e, "penNumber")}
                                     />
                                </FormControl>
                                <FormMessage />
                                </FormItem>
                            )}
                        />
                         <FormField
                            control={form.control}
                            name="phone"
                            render={({ field }) => (
                                <FormItem>
                                <FormLabel>Phone No. (Optional)</FormLabel>
                                <FormControl>
                                    <Input 
                                        placeholder="10 digit number" 
                                        {...field}
                                        maxLength={10}
                                        onChange={(e) => handleNumericInput(e, "phone")}
                                    />
                                </FormControl>
                                <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                     <FormField
                        control={form.control}
                        name="address"
                        render={({ field }) => (
                            <FormItem>
                            <FormLabel>Address</FormLabel>
                            <FormControl>
                                <Textarea
                                placeholder="Enter student's full address"
                                className="resize-none"
                                {...field}
                                />
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
            {student ? "Save Changes" : "Save Student"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export const StudentForm = React.memo(StudentFormComponent);
