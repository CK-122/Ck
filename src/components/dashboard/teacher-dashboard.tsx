
'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { mockNotices, mockStudents, mockMarks } from "@/lib/data";
import { useAuth } from "@/hooks/use-auth";
import { StatsCard } from "./stats-card";
import { Book, Users, CheckCircle, AlertCircle } from "lucide-react";
import React, { useMemo } from "react";

const TeacherDashboardComponent = () => {
  const { user } = useAuth();

  const { assignedClasses, totalStudents, marksEntered, marksPending } = useMemo(() => {
    const assignedClasses = user?.assignedClasses || [];
    if (!assignedClasses.length) {
        return { assignedClasses: [], totalStudents: 0, marksEntered: 0, marksPending: 0 };
    }

    const studentsInClass = mockStudents.filter(s => assignedClasses.includes(s.class));
    const totalStudents = studentsInClass.length;

    const studentIds = new Set(studentsInClass.map(s => s.id));
    const marksEnteredIds = new Set(mockMarks.filter(m => studentIds.has(m.studentId)).map(m => m.studentId));

    const marksEnteredCount = marksEnteredIds.size;
    const marksPendingCount = totalStudents - marksEnteredCount;

    return {
      assignedClasses,
      totalStudents,
      marksEntered: marksEnteredCount,
      marksPending: marksPendingCount
    };
  }, [user]);

  return (
    <div className="space-y-8">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatsCard 
          title="Assigned Classes"
          value={assignedClasses.join(', ')}
          icon={Book}
          description="Classes you are responsible for"
        />
        <StatsCard 
          title="Total Students"
          value={totalStudents.toString()}
          icon={Users}
          description="Across all your classes"
        />
        <StatsCard 
          title="Marks Entered"
          value={marksEntered.toString()}
          icon={CheckCircle}
          description="Students with at least one term's marks"
        />
        <StatsCard 
          title="Marks Pending"
          value={marksPending.toString()}
          icon={AlertCircle}
          description="Students with no marks entered"
        />
      </div>
       <Card>
          <CardHeader>
            <CardTitle>Notice Board</CardTitle>
            <CardDescription>A quick look at the latest announcements from the administration.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                 {mockNotices.slice(0, 3).map(notice => (
                     <Card key={notice.id} className="flex flex-col">
                        <CardHeader>
                           <CardTitle className="text-base">{notice.title}</CardTitle>
                        </CardHeader>
                        <CardContent className="flex-grow">
                          <p className="text-sm text-muted-foreground line-clamp-3">{notice.content}</p>
                        </CardContent>
                        <CardFooter>
                           <p className="text-xs text-muted-foreground">
                                Posted on {notice.createdAt.toLocaleDateString()}
                            </p>
                        </CardFooter>
                    </Card>
                ))}
            </div>
          </CardContent>
        </Card>
    </div>
  );
}

export const TeacherDashboard = React.memo(TeacherDashboardComponent);
