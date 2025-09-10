
'use client';

import React, { useState, useMemo, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { mockStudents, mockMarks } from '@/lib/data';
import { useAuth } from '@/hooks/use-auth';
import type { Student } from '@/lib/types';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Label } from '../ui/label';
import { Search } from 'lucide-react';

const allClasses = ['All', 'NUR', 'LKG', 'UKG', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10'];

export function StudentCardView() {
  const { user } = useAuth();
  const teacherClasses = useMemo(() => user?.assignedClasses || [], [user]);
  
  const availableClasses = ['All', ...teacherClasses];
  const [classFilter, setClassFilter] = useState(availableClasses[0]);
  const [searchFilter, setSearchFilter] = useState('');

  useEffect(() => {
    if (teacherClasses.length > 0) {
      setClassFilter('All');
    }
  }, [teacherClasses]);

  const filteredStudents = useMemo(() => {
    let baseList = mockStudents.filter(s => teacherClasses.includes(s.class));
    
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
  }, [classFilter, searchFilter, teacherClasses]);

  const getStudentMarks = (studentId: string) => {
    return mockMarks.filter(mark => mark.studentId === studentId);
  }

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
              {availableClasses.map(c => (
                <SelectItem key={c} value={c}>{c}</SelectItem>
              ))}
            </SelectContent>
          </Select>
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
