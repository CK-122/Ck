
'use client';
import type { User } from './types';
import { mockTeachers, mockTeacherAssignments } from './data';

// This is a mock authentication service that simulates user login/logout
// without needing a Firebase backend.

let mockUser: User | null = null;
const MOCK_ADMIN_USER_ID = 'admin-user-id';

// This function listens for auth state changes. We'll simulate this by
// allowing a callback to be registered, which we'll call after signIn/signOut.
let authStateListener: ((user: User | null) => void) | null = null;

// Function to simulate a login
export const signIn = async (email: string, password?: string): Promise<void> => {
  // In a real app, you'd validate the password. Here, we just log in.
  let role: 'admin' | 'teacher' | 'student' = 'student';
  let assignedClasses: string[] = [];

  if (email.toLowerCase() === 'admin@example.com') {
    role = 'admin';
  } else {
    const teacherInfo = mockTeachers.find(t => t.email.toLowerCase() === email.toLowerCase());
    if (teacherInfo) {
      role = 'teacher';
      assignedClasses = Object.entries(mockTeacherAssignments)
        .filter(([teacherId, _]) => teacherId === teacherInfo.id)
        .map(([_, className]) => className);
    }
  }

  mockUser = {
    uid: `mock-${email}-id`,
    email,
    displayName: email.split('@')[0],
    role,
    assignedClasses,
  };
  
  // Notify listeners that auth state has changed
  if (authStateListener) {
    authStateListener(mockUser);
  }
};

// Function to simulate signing up a new user
export const signUp = async (email: string, password: string, displayName: string): Promise<void> => {
  // Simulate creating a new user and logging them in.
  mockUser = {
    uid: `mock-${email}-id`,
    email,
    displayName,
    role: 'student', // Default new signups to student role
    assignedClasses: [],
  };
   if (authStateListener) {
    authStateListener(mockUser);
  }
};

// Function to simulate Google Sign-In
export const signInWithGoogle = async (): Promise<void> => {
    // For testing, let's sign in a mock admin user via Google.
    mockUser = {
        uid: MOCK_ADMIN_USER_ID,
        email: 'admin@example.com',
        displayName: 'Admin User',
        role: 'admin',
        assignedClasses: ['NUR', 'LKG', 'UKG', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10'],
    };
    if (authStateListener) {
      authStateListener(mockUser);
    }
};


// Function to simulate logging out
export const signOut = async (): Promise<void> => {
  mockUser = null;
  if (authStateListener) {
    authStateListener(mockUser);
  }
};

// Function to simulate sending a password reset email
export const sendPasswordReset = async (email: string): Promise<void> => {
  console.log(`Password reset email sent to ${email}`);
  // In a real app, this would be a backend call.
};

export const onAuthStateChanged = (callback: (user: User | null) => void): (() => void) => {
  authStateListener = callback;
  
  // Immediately call with the current mock user state
  setTimeout(() => {
    if (authStateListener) {
        authStateListener(mockUser)
    }
  }, 0);

  const unsubscribe = () => {
    authStateListener = null;
  };
  return unsubscribe;
};
