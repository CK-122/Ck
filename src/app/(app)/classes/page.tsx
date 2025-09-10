
'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { BookOpen } from "lucide-react";

const classes = ['NUR', 'LKG', 'UKG', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10'];

export default function ClassesPage() {
  return (
    <div className="container mx-auto py-10">
      <div className="mb-6">
        <h1 className="text-3xl font-bold font-headline">Classes</h1>
        <p className="text-muted-foreground">View all the classes available in the institution.</p>
      </div>

      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <div className="flex items-center gap-4">
             <BookOpen className="h-8 w-8 text-primary" />
            <div>
                <CardTitle>Class List</CardTitle>
                <CardDescription>A complete list of all active classes.</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Class Name</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {classes.map((className) => (
                <TableRow key={className}>
                  <TableCell className="font-medium">{className}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
