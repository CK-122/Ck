
'use client';

import { Users, Book, CheckCircle, AlertCircle } from "lucide-react";
import { StatsCard } from "./stats-card";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { mockNotices, mockStudents, mockMarks } from "@/lib/data";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import React, { useMemo } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";

const allClasses = ['NUR', 'LKG', 'UKG', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10'];

interface ClassStats {
  className: string;
  totalStudents: number;
  marksFilled: number;
  marksPending: number;
}

const AdminDashboardComponent = () => {
  const totalStudents = mockStudents.length;

  const classStats: ClassStats[] = useMemo(() => {
    return allClasses.map(className => {
      const studentsInClass = mockStudents.filter(s => s.class === className);
      const totalStudentsInClass = studentsInClass.length;
      
      if (totalStudentsInClass === 0) {
        return { className, totalStudents: 0, marksFilled: 0, marksPending: 0 };
      }

      const studentIdsInClass = new Set(studentsInClass.map(s => s.id));
      
      const uniqueStudentIdsWithMarks = new Set(mockMarks.filter(m => studentIdsInClass.has(m.studentId)).map(m => m.studentId));


      const marksPending = totalStudentsInClass - uniqueStudentIdsWithMarks.size;

      return {
        className,
        totalStudents: totalStudentsInClass,
        marksFilled: uniqueStudentIdsWithMarks.size,
        marksPending,
      };
    }).filter(stat => stat.totalStudents > 0);
  }, []);

  return (
    <div className="flex flex-col gap-8">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatsCard
          title="Total Students"
          value={totalStudents.toString()}
          icon={Users}
          description="Across all classes"
        />
        <StatsCard
          title="Total Classes"
          value={classStats.length.toString()}
          icon={Book}
          description="With enrolled students"
        />
         <StatsCard
          title="Marks All Filled"
          value={classStats.filter(c => c.marksPending === 0 && c.totalStudents > 0).length.toString()}
          icon={CheckCircle}
          description="Classes with complete marks"
        />
         <StatsCard
          title="Marks Pending"
          value={classStats.filter(c => c.marksPending > 0).length.toString()}
          icon={AlertCircle}
          description="Classes with incomplete marks"
        />
      </div>
      
        <div className="grid gap-8 md:grid-cols-2">
            <Card>
            <CardHeader>
                <CardTitle>Class-wise Data Summary</CardTitle>
                <CardDescription>An overview of student mark entries for each class.</CardDescription>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Class</TableHead>
                            <TableHead>Total Students</TableHead>
                            <TableHead>Marks Filled</TableHead>
                            <TableHead>Marks Pending</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {classStats.map(stat => (
                            <TableRow key={stat.className}>
                                <TableCell className="font-medium">{stat.className}</TableCell>
                                <TableCell>{stat.totalStudents}</TableCell>
                                <TableCell className="text-green-600">{stat.marksFilled}</TableCell>
                                <TableCell className="text-red-600">{stat.marksPending}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </CardContent>
            </Card>
             <Card>
                <CardHeader>
                    <CardTitle>Recent Notices</CardTitle>
                    <CardDescription>A quick look at the latest school-wide announcements.</CardDescription>
                </CardHeader>
                <CardContent>
                    <ul className="space-y-4 pr-4">
                        {mockNotices.slice(0, 5).map(notice => (
                            <li key={notice.id} className="p-4 rounded-md border">
                                <h3 className="font-semibold">{notice.title}</h3>
                                <p className="text-sm text-muted-foreground">{notice.content}</p>
                                <p className="text-xs text-muted-foreground mt-2">{notice.createdAt.toLocaleDateString()}</p>
                            </li>
                        ))}
                    </ul>
                </CardContent>
            </Card>
        </div>

    </div>
  );
}

export const AdminDashboard = React.memo(AdminDashboardComponent);
