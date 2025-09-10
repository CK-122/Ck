'use client';

import { useAuth } from '@/hooks/use-auth';
import { AdminDashboard } from '@/components/dashboard/admin-dashboard';
import { TeacherDashboard } from '@/components/dashboard/teacher-dashboard';
import { StudentDashboard } from '@/components/dashboard/student-dashboard';
import { Loader2 } from 'lucide-react';

export default function DashboardPage() {
  const { user, loading } = useAuth();

  if (loading) {
    return <div className="flex justify-center items-center h-full"><Loader2 className="h-8 w-8 animate-spin" /></div>;
  }

  const welcomeMessage = `Welcome back, ${user?.displayName || 'User'}!`;

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight font-headline">{welcomeMessage}</h1>
        <p className="text-muted-foreground">Here's an overview of what's happening in C.K. HIGH SCHOOL.</p>
      </div>

      {user?.role === 'admin' && <AdminDashboard />}
      {user?.role === 'teacher' && <TeacherDashboard />}
      {user?.role === 'student' && <StudentDashboard />}
    </div>
  );
}
