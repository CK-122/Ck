
'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { mockStudents, mockTeachers } from "@/lib/data";
import { useMemo } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export default function UserManagementPage() {
  const allUsers = useMemo(() => {
    const students = mockStudents.map(s => ({
      id: `student-${s.id}`,
      name: s.name,
      email: `${s.name.toLowerCase().replace(' ', '.')}@example.com`,
      role: 'student' as const,
    }));
    const teachers = mockTeachers.map(t => ({
      id: `teacher-${t.id}`,
      name: t.name,
      email: t.email,
      role: 'teacher' as const,
    }));
    const admin = {
        id: 'admin-1',
        name: 'Admin User',
        email: 'admin@example.com',
        role: 'admin' as const,
    }
    return [admin, ...teachers, ...students];
  }, []);

  return (
    <div className="container mx-auto py-10">
      <div className="mb-6">
        <h1 className="text-3xl font-bold font-headline">User Management</h1>
        <p className="text-muted-foreground">View and manage user roles in the system.</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Users</CardTitle>
          <CardDescription>A list of all users in the system.</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Role</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {allUsers.map((user) => (
                <TableRow key={user.id}>
                  <TableCell className="font-medium">{user.name}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>
                    <Badge variant={user.role === 'admin' ? 'default' : user.role === 'teacher' ? 'secondary' : 'outline'}>
                      {user.role}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button variant="outline" size="sm" disabled={user.role === 'admin'}>
                      Change Role
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
