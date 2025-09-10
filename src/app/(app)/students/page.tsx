
'use client'

import React, { useState, useMemo, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { mockStudents } from '@/lib/data';
import type { Student } from '@/lib/types';
import { StudentForm } from '@/components/student/student-form';
import { PlusCircle } from 'lucide-react';
import { useAuth } from '@/hooks/use-auth';
import { useRouter } from 'next/navigation';
import { StudentCardView } from '@/components/student/student-card-view';
import { AdminStudentCardView } from '@/components/student/admin-student-card-view';

export default function StudentsPage() {
  const [students, setStudents] = useState<Student[]>(mockStudents);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const { user } = useAuth();
  const isAdmin = user?.role === 'admin';
  const router = useRouter();
  
  const handleAddStudent = useCallback(() => {
    if (user?.role === 'teacher') {
      router.push('/add-student');
    } else {
      setSelectedStudent(null);
      setIsFormOpen(true);
    }
  }, [user, router]);

  const handleEditStudent = useCallback((student: Student) => {
    setSelectedStudent(student);
    setIsFormOpen(true);
  }, []);

  const handleDeleteStudent = useCallback((studentId: string) => {
    setStudents(prevStudents => prevStudents.filter(s => s.id !== studentId));
  }, []);

  const handleFormSubmit = useCallback((studentData: Omit<Student, 'id'>) => {
    if (selectedStudent) {
      // Edit student
      setStudents(prevStudents => prevStudents.map(s => s.id === selectedStudent.id ? { ...selectedStudent, ...studentData } : s));
    } else {
      // Add new student
      const newStudent: Student = {
        id: (students.length + 1).toString(),
        ...studentData,
      };
      setStudents(prevStudents => [...prevStudents, newStudent]);
    }
    setIsFormOpen(false);
  }, [selectedStudent, students.length]);
  
  return (
    <div className="container mx-auto py-10">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <div>
          <h1 className="text-3xl font-bold font-headline">Student Management</h1>
          <p className="text-muted-foreground">View, search, and manage student records.</p>
        </div>
        <div className="flex gap-2 w-full md:w-auto">
          {(isAdmin || user?.role === 'teacher') && (
            <Button onClick={handleAddStudent} className="w-full md:w-auto">
              <PlusCircle className="mr-2 h-4 w-4" />
              Add Student
            </Button>
          )}
        </div>
      </div>
      
      {isAdmin ? (
         <>
            <AdminStudentCardView 
              students={students}
              onEditStudent={handleEditStudent}
              onDeleteStudent={handleDeleteStudent}
            />
            <StudentForm
                isOpen={isFormOpen}
                onOpenChange={setIsFormOpen}
                onSubmit={handleFormSubmit}
                student={selectedStudent}
            />
         </>
      ) : (
        <StudentCardView />
      )}
    </div>
  );
}
