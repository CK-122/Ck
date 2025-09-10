
'use client';

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useAuth } from "@/hooks/use-auth";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { mockStudents } from "@/lib/data";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";


const formSchema = z.object({
  class: z.string().min(1, { message: "Class is required." }),
  rollNumber: z.string().min(1, { message: "Roll no. is required." }),
  name: z.string().min(2, { message: "Student name must be at least 2 characters." }),
  fatherName: z.string().min(2, { message: "Father's name must be at least 2 characters." }),
  motherName: z.string().min(2, { message: "Mother's name must be at least 2 characters." }),
  category: z.enum(["CK", "MTQ"], { required_error: "You need to select a category." }),
  srNumber: z.string().optional(),
  penNumber: z.string().optional().refine(val => !val || val.length === 11, { message: "PEN No. must be exactly 11 digits." }),
  phone: z.string().optional().refine(val => !val || val.length === 10, { message: "Phone no. must be exactly 10 digits." }),
  address: z.string().min(10, { message: "Address must be at least 10 characters." }),
});

type StudentFormValues = z.infer<typeof formSchema>;


export default function AddStudentPage() {
  const { user } = useAuth();
  const teacherClasses = user?.assignedClasses || [];
  const { toast } = useToast();
  
  const form = useForm<StudentFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      rollNumber: "",
      class: "",
      fatherName: "",
      motherName: "",
      srNumber: "",
      penNumber: "",
      phone: "",
      address: "",
      category: "CK",
    },
  });

  useEffect(() => {
    if (teacherClasses.length > 0 && !form.getValues('class')) {
      form.setValue("class", teacherClasses[0]);
    }
  }, [form, teacherClasses]);

  const handleFormSubmit = (data: StudentFormValues) => {
    const isRollNumberTaken = mockStudents.some(
        student => student.class === data.class && student.rollNumber === data.rollNumber
    );

    if (isRollNumberTaken) {
        form.setError("rollNumber", {
            type: "manual",
            message: "This roll number already exists in this class.",
        });
        return;
    }

    console.log("New Student Data:", data);
    
    // In a real app, you would save this data. We'll add it to our mock data for now.
    mockStudents.push({
      id: (mockStudents.length + 1).toString(),
      ...data,
    });
    
    toast({
        title: "Student Added",
        description: `${data.name} has been added to the system.`
    });
    
    // Reset form but keep class value
    form.reset({
      name: "",
      rollNumber: "",
      class: data.class,
      fatherName: "",
      motherName: "",
      srNumber: "",
      penNumber: "",
      phone: "",
      address: "",
      category: "CK",
    });
  };
  
  const handleNumericInput = (e: React.ChangeEvent<HTMLInputElement>, fieldName: keyof StudentFormValues) => {
    const value = e.target.value;
    if (/^\d*$/.test(value)) {
        form.setValue(fieldName, value);
    }
  }


  return (
    <div className="container mx-auto py-10">
        <div className="mb-6">
            <h1 className="text-3xl font-bold font-headline">Add New Student</h1>
            <p className="text-muted-foreground">Fill in the details to add a new student to the system.</p>
        </div>
        <Card className="max-w-4xl mx-auto">
            <CardHeader>
                <CardTitle>Student Information</CardTitle>
                <CardDescription>
                    Please provide the required information for the new student.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <Form {...form}>
                <form onSubmit={form.handleSubmit(handleFormSubmit)} className="space-y-6 py-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <FormField
                        control={form.control}
                        name="class"
                        render={({ field }) => (
                            <FormItem>
                            <FormLabel>Class</FormLabel>
                                <FormControl>
                                    <Input {...field} readOnly disabled />
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
                                    <Input {...field} />
                                </FormControl>
                                <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                     <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <FormField
                            control={form.control}
                            name="fatherName"
                            render={({ field }) => (
                                <FormItem>
                                <FormLabel>Father's Name</FormLabel>
                                <FormControl>
                                    <Input {...field} />
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
                                    <Input {...field} />
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

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <FormField
                            control={form.control}
                            name="srNumber"
                            render={({ field }) => (
                                <FormItem>
                                <FormLabel>SR No. (Optional)</FormLabel>
                                <FormControl>
                                    <Input 
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
                                        maxLength={11}
                                        {...field}
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
                                        maxLength={10}
                                        {...field}
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
                                className="resize-none"
                                {...field}
                                />
                            </FormControl>
                            <FormMessage />
                            </FormItem>
                        )}
                    />
                    <div className="pt-4">
                        <Button type="submit">
                            Save Student
                        </Button>
                    </div>
                </form>
                </Form>
            </CardContent>
        </Card>
    </div>
  );
}
