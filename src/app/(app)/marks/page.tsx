
'use client';

import { useState, useMemo, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { mockStudents, mockMarks } from '@/lib/data';
import { useAuth } from '@/hooks/use-auth';
import type { Student, Mark } from '@/lib/types';
import { useToast } from '@/hooks/use-toast';

const subjects = Array.from({ length: 10 }, (_, i) => `Subject ${i + 1}`);
const terms = ['Term 1', 'Term 2', 'Term 3', 'Term 4'];
const allClasses = ['NUR', 'LKG', 'UKG', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10'];

export default function MarksPage() {
  const { user } = useAuth();
  const { toast } = useToast();
  const isAdmin = user?.role === 'admin';
  const teacherClasses = useMemo(() => user?.assignedClasses || [], [user]);
  
  const [selectedClass, setSelectedClass] = useState<string>('');
  const [rollNumber, setRollNumber] = useState('');
  const [foundStudent, setFoundStudent] = useState<Student | null>(null);
  const [selectedTerm, setSelectedTerm] = useState('');
  const [marks, setMarks] = useState<Record<string, number | string>>({});
  const [existingMarks, setExistingMarks] = useState<Mark[]>([]);

  useEffect(() => {
    if (!isAdmin && teacherClasses.length > 0) {
      setSelectedClass(teacherClasses[0]);
    }
  }, [isAdmin, teacherClasses]);

  const handleRollNoBlur = () => {
    if (rollNumber && selectedClass) {
      const student = mockStudents.find(s => s.class === selectedClass && s.rollNumber === rollNumber);
      if (student) {
        setFoundStudent(student);
        const studentMarks = mockMarks.filter(m => m.studentId === student.id);
        setExistingMarks(studentMarks);
        toast({ title: 'Student Found', description: `${student.name} - ${student.fatherName}` });
      } else {
        setFoundStudent(null);
        setExistingMarks([]);
        toast({ variant: 'destructive', title: 'Student Not Found', description: 'No student with this roll number exists in the selected class.' });
      }
      setSelectedTerm('');
      setMarks({});
    }
  };

  const handleMarksChange = (subject: string, value: string) => {
    const parsedValue = value === '' ? '' : Number(value);
    if (parsedValue === '' || (parsedValue >= 0 && parsedValue <= 100)) {
       setMarks(prev => ({ ...prev, [subject]: parsedValue }));
    }
  };
  
  const handleTermChange = (term: string) => {
      setSelectedTerm(term);
      const termMarks = existingMarks.find(m => m.term === term);
      if (termMarks) {
          setMarks(termMarks.subjects);
      } else {
          setMarks({});
      }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({
      studentId: foundStudent?.id,
      class: selectedClass,
      term: selectedTerm,
      marks,
    });
    toast({ title: 'Marks Submitted', description: `Marks for ${foundStudent?.name} for ${selectedTerm} have been saved.` });
  };
  
  const isTermFilled = (term: string) => {
     if (!foundStudent) return false;
     return existingMarks.some(m => m.studentId === foundStudent.id && m.term === term);
  }

  return (
    <div className="container mx-auto py-10">
      <div className="mb-6">
        <h1 className="text-3xl font-bold font-headline">Marks Entry</h1>
        <p className="text-muted-foreground">Enter student marks for different terms and subjects.</p>
      </div>

      <Card className="mx-auto max-w-4xl">
        <CardHeader>
          <CardTitle>Enter Student Marks</CardTitle>
          <CardDescription>Start by selecting a class and entering a roll number to find a student.</CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="class">Class</Label>
                {isAdmin ? (
                  <Select onValueChange={setSelectedClass} value={selectedClass}>
                    <SelectTrigger id="class">
                      <SelectValue placeholder="Select a class" />
                    </SelectTrigger>
                    <SelectContent>
                      {allClasses.map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}
                    </SelectContent>
                  </Select>
                ) : (
                  <Input id="class" value={selectedClass} readOnly disabled />
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="rollNumber">Roll No.</Label>
                <Input
                  id="rollNumber"
                  placeholder="Enter roll no. and blur"
                  value={rollNumber}
                  onChange={(e) => setRollNumber(e.target.value)}
                  onBlur={handleRollNoBlur}
                  disabled={!selectedClass}
                />
              </div>
            </div>

            {foundStudent && (
              <div className="space-y-6 pt-6 border-t">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 bg-muted/50 rounded-lg">
                    <div>
                        <p className="text-sm font-medium text-muted-foreground">Student Name</p>
                        <p className="font-semibold">{foundStudent.name}</p>
                    </div>
                    <div>
                        <p className="text-sm font-medium text-muted-foreground">Father's Name</p>
                        <p className="font-semibold">{foundStudent.fatherName}</p>
                    </div>
                     <div>
                        <p className="text-sm font-medium text-muted-foreground">Class</p>
                        <p className="font-semibold">{foundStudent.class}</p>
                    </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="term">Select Term</Label>
                  <Select onValueChange={handleTermChange} value={selectedTerm}>
                    <SelectTrigger id="term">
                      <SelectValue placeholder="Select a term to enter or edit marks" />
                    </SelectTrigger>
                    <SelectContent>
                      {terms.map(t => (
                        <SelectItem key={t} value={t} disabled={!isAdmin && isTermFilled(t)}>
                           {t} {isTermFilled(t) && "(Filled)"}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                   <p className="text-xs text-muted-foreground">
                    {isAdmin
                      ? "You can enter marks for a new term or edit marks for a filled term."
                      : "You can only select terms for which marks have not been entered."}
                  </p>
                </div>

                {selectedTerm && (
                  <div className="space-y-4 pt-4">
                    <h3 className="text-lg font-semibold">
                      {isTermFilled(selectedTerm) && isAdmin ? 'Edit' : 'Enter'} Marks for {selectedTerm}
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                      {subjects.map(subject => (
                        <div key={subject} className="space-y-2">
                          <Label htmlFor={subject}>{subject}</Label>
                          <Input
                            id={subject}
                            type="number"
                            placeholder="Max: 100"
                            value={marks[subject] || ''}
                            onChange={e => handleMarksChange(subject, e.target.value)}
                            max={100}
                            min={0}
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </CardContent>
          <CardFooter>
            <Button type="submit" disabled={!foundStudent || !selectedTerm}>
              {isAdmin && isTermFilled(selectedTerm) ? 'Update Marks' : 'Save Marks'}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
