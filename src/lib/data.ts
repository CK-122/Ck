
import type { Student, Notice, Mark } from './types';

export const mockStudents: Student[] = [];

export const mockNotices: Notice[] = [];

export const mockMarks: Mark[] = [];


export const mockTeachers = [
  { id: 't1', name: 'Mr. Smith', email: 'teacher.smith@example.com' },
  { id: 't2', name: 'Mrs. Davis', email: 'teacher.davis@example.com' },
  { id: 't3', name: 'Ms. Jones', email: 'teacher.jones@example.com' },
  { id: 't4', name: 'Mr. Wilson', email: 'teacher.wilson@example.com' },
  { id: 't5', name: 'Mr. Brown', email: 'teacher.brown@example.com' },
  { id: 't6', name: 'Ms. Garcia', email: 'teacher.garcia@example.com' },
  { id: 't7', name: 'Mr. Rodriguez', email: 'teacher.rodriguez@example.com' },
  { id: 't8', name: 'Ms. Martinez', email: 'teacher.martinez@example.com' },
  { id: 't9', name: 'Ms. Lee', email: 'teacher.lee@example.com' },
  { id: 't10', name: 'Mr. Harris', email: 'teacher.harris@example.com' },
  { id: 't11', name: 'Mrs. Clark', email: 'teacher.clark@example.com' },
  { id: 't12', name: 'Mr. Lewis', email: 'teacher.lewis@example.com' },
];

export let mockTeacherAssignments: Record<string, string> = {};
