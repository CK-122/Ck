
'use client';

import React, { useState, useMemo } from 'react';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import type { Student } from '@/lib/types';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Label } from '../ui/label';
import { Search, Edit, Trash2, Download } from 'lucide-react';
import { mockMarks } from '@/lib/data';
import { Button } from '../ui/button';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

const allClasses = ['All', 'NUR', 'LKG', 'UKG', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10'];

interface AdminStudentCardViewProps {
    students: Student[];
    onEditStudent: (student: Student) => void;
    onDeleteStudent: (studentId: string) => void;
}

export function AdminStudentCardView({ students, onEditStudent, onDeleteStudent }: AdminStudentCardViewProps) {
  const [classFilter, setClassFilter] = useState('All');
  const [searchFilter, setSearchFilter] = useState('');

  const filteredStudents = useMemo(() => {
    let baseList = students;
    
    if (classFilter !== 'All') {
      baseList = baseList.filter(student => student.class === classFilter);
    }

    if (searchFilter) {
      const lowercasedFilter = searchFilter.toLowerCase();
      baseList = baseList.filter(student => 
        student.name.toLowerCase().includes(lowercasedFilter) ||
        student.rollNumber.includes(lowercasedFilter)
      );
    }

    return baseList;
  }, [classFilter, searchFilter, students]);

  const getStudentMarks = (studentId: string) => {
    return mockMarks.filter(mark => mark.studentId === studentId);
  }

  const handleExport = () => {
    const studentsToExport = classFilter === 'All'
      ? students
      : students.filter(s => s.class === classFilter);

    const headers = ["ID", "Name", "Roll No.", "Class", "Father's Name", "Phone"].join(',');
    const csvRows = studentsToExport
        .map(s => [s.id, s.name, s.rollNumber, s.class, s.fatherName, s.phone || ''].join(','));
    
    const csvContent = [headers, ...csvRows].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    const fileName = classFilter === 'All' ? 'all_students.csv' : `students_class_${classFilter}.csv`;
    link.setAttribute("download", fileName);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-6">
       <div className="flex flex-col md:flex-row items-center gap-4">
        <div className="w-full md:max-w-xs">
           <Label htmlFor="search-filter">Search by Name or Roll No.</Label>
            <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input 
                    id="search-filter"
                    placeholder="e.g., John Doe or 101" 
                    className="pl-10"
                    value={searchFilter}
                    onChange={(e) => setSearchFilter(e.target.value)}
                />
            </div>
        </div>
        <div className="w-full md:max-w-xs">
           <Label htmlFor="class-filter">Filter by Class</Label>
           <Select value={classFilter} onValueChange={setClassFilter}>
            <SelectTrigger id="class-filter">
              <SelectValue placeholder="Select a class" />
            </SelectTrigger>
            <SelectContent>
              {allClasses.map(c => (
                <SelectItem key={c} value={c}>{c}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="w-full md:w-auto self-end">
            <Button onClick={handleExport} variant="outline">
                <Download className="mr-2 h-4 w-4" />
                Export to Excel
            </Button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {filteredStudents.length > 0 ? filteredStudents.map(student => (
          <Card key={student.id} className="flex flex-col">
            <CardHeader>
              <CardTitle>{student.name}</CardTitle>
              <CardDescription>Roll No: {student.rollNumber} | Class: {student.class}</CardDescription>
            </CardHeader>
            <CardContent className="flex-grow space-y-4">
              <div className="text-sm text-muted-foreground space-y-2">
                 <div className="flex justify-between">
                    <span className="font-medium">Father's Name:</span>
                    <span>{student.fatherName}</span>
                </div>
                <div className="flex justify-between">
                    <span className="font-medium">Mother's Name:</span>
                    <span>{student.motherName}</span>
                </div>
                 <div className="flex justify-between">
                    <span className="font-medium">Category:</span>
                    <span>{student.category}</span>
                </div>
                <div className="flex justify-between">
                    <span className="font-medium">Phone:</span>
                    <span>{student.phone || 'N/A'}</span>
                </div>
                 <div className="flex justify-between">
                    <span className="font-medium">PEN No:</span>
                    <span>{student.penNumber || 'N/A'}</span>
                </div>
                 <div className="flex justify-between">
                    <span className="font-medium">SR No:</span>
                    <span>{student.srNumber || 'N/A'}</span>
                </div>
                 <div className="flex flex-col">
                    <span className="font-medium">Address:</span>
                    <span>{student.address}</span>
                </div>
              </div>

              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="marks">
                  <AccordionTrigger className="text-base">View Marks</AccordionTrigger>
                  <AccordionContent>
                    {getStudentMarks(student.id).length > 0 ? (
                      getStudentMarks(student.id).map(mark => (
                        <div key={mark.term} className="mb-4">
                          <h4 className="font-semibold mb-2">{mark.term}</h4>
                          <ul className="space-y-1 text-sm">
                            {Object.entries(mark.subjects).map(([subject, score]) => (
                              <li key={subject} className="flex justify-between">
                                <span>{subject}:</span>
                                <span>{score}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))
                    ) : (
                      <p className="text-sm text-muted-foreground">No marks entered yet.</p>
                    )}
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </CardContent>
             <CardFooter className="flex justify-end gap-2">
                <Button variant="outline" size="icon" onClick={() => onEditStudent(student)}>
                    <Edit className="h-4 w-4" />
                </Button>
                 <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button variant="destructive" size="icon">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                        <AlertDialogDescription>
                          This action cannot be undone. This will permanently delete this student's record.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={() => onDeleteStudent(student.id)} className="bg-destructive hover:bg-destructive/90">Delete</AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
            </CardFooter>
          </Card>
        )) : (
            <div className="col-span-full text-center py-10">
                <p className="text-muted-foreground">No students found matching your criteria.</p>
            </div>
        )}
      </div>
    </div>
  );
}
