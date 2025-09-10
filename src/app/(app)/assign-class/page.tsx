
'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { mockTeachers, mockTeacherAssignments } from '@/lib/data';

const mockClasses = ['NUR', 'LKG', 'UKG', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'Unassigned'];

export default function AssignClassPage() {
  const [assignments, setAssignments] = useState<Record<string, string>>({});
  const { toast } = useToast();

  useEffect(() => {
    // Load initial assignments
    setAssignments(mockTeacherAssignments);
  }, []);

  const handleAssignmentChange = (teacherId: string, classId: string) => {
    setAssignments(prev => {
      const newAssignments = {...prev};
      if (classId === 'Unassigned') {
        delete newAssignments[teacherId];
      } else {
        newAssignments[teacherId] = classId;
      }
      return newAssignments;
    });
  };

  const handleSaveChanges = () => {
    // In a real app, you'd save this to a database. Here we update the mock object.
    Object.keys(mockTeacherAssignments).forEach(key => delete mockTeacherAssignments[key]);
    Object.assign(mockTeacherAssignments, assignments);
    
    console.log('Saving assignments:', mockTeacherAssignments);
    toast({
      title: 'Assignments Saved',
      description: 'The teacher-class assignments have been updated.',
    });
  };
  
  const getAssignedClass = (teacherId: string) => {
    const assignedClass = assignments[teacherId];
    return assignedClass ? assignedClass : 'Unassigned';
  }

  return (
    <div className="container mx-auto py-10">
      <div className="mb-6">
        <h1 className="text-3xl font-bold font-headline">Assign Classes to Teachers</h1>
        <p className="text-muted-foreground">Manage which teacher is assigned to which class.</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Teacher Assignments</CardTitle>
          <CardDescription>
            For each teacher, select the class they will be responsible for.
          </CardDescription>
        </CardHeader>
        <CardContent>
            <div className="space-y-4">
              {mockTeachers.map(teacher => (
                <div key={teacher.id} className="grid grid-cols-2 items-center gap-4 p-4 border rounded-md">
                  <div>
                      <p className="font-medium truncate" title={teacher.email}>{teacher.email}</p>
                  </div>
                  <div className="justify-self-end w-full max-w-xs">
                    <Select
                      value={getAssignedClass(teacher.id)}
                      onValueChange={(value) => handleAssignmentChange(teacher.id, value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select a class" />
                      </SelectTrigger>
                      <SelectContent>
                        {mockClasses.map(c => (
                          <SelectItem key={c} value={c}>
                            {c}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              ))}
            </div>
        </CardContent>
        <CardFooter>
          <Button onClick={handleSaveChanges}>Save Changes</Button>
        </CardFooter>
      </Card>
    </div>
  );
}
