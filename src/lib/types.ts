
export type UserRole = 'admin' | 'teacher' | 'student';

export interface User {
  uid: string;
  email: string | null;
  displayName: string | null;
  role: UserRole;
  assignedClasses?: string[];
}

export interface Student {
  id: string;
  name: string;
  rollNumber: string;
  class: string;
  fatherName: string;
  motherName: string;
  category: 'CK' | 'MTQ';
  address: string;
  srNumber?: string;
  penNumber?: string;
  phone?: string;
}

export interface Notice {
  id: string;
  title: string;
  content: string;
  createdAt: Date;
}

export interface Mark {
  studentId: string;
  term: 'Term 1' | 'Term 2' | 'Term 3' | 'Term 4';
  subjects: Record<string, number | string>;
}
