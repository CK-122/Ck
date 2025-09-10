
'use client';

import React from 'react';
import { Book, CheckCircle, Bell } from "lucide-react";
import { StatsCard } from "./stats-card";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { mockNotices } from "@/lib/data";

const StudentDashboardComponent = () => {
  return (
    <div className="space-y-8">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <StatsCard 
          title="My Class"
          value="10"
          icon={Book}
          description="Class Teacher: Mrs. Davis"
        />
        <StatsCard 
          title="Recent Grade"
          value="A-"
          icon={CheckCircle}
          description="In Mathematics Mid-term"
        />
        <StatsCard 
          title="Active Notices"
          value={mockNotices.length.toString()}
          icon={Bell}
          description={`${mockNotices.filter(n => new Date(n.createdAt) > new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)).length} new this week`}
        />
      </div>
      <Card>
          <CardHeader>
            <CardTitle>Recent Notices</CardTitle>
            <CardDescription>A quick look at the latest announcements.</CardDescription>
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
export const StudentDashboard = React.memo(StudentDashboardComponent);
