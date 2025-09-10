
'use client'

import React, { useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { PlusCircle, Edit, Trash2 } from "lucide-react";
import { useAuth } from "@/hooks/use-auth";
import { mockNotices } from "@/lib/data";
import type { Notice } from "@/lib/types";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { NoticeForm } from "@/components/notice/notice-form";

export default function NoticesPage() {
  const { user } = useAuth();
  const isAdmin = user?.role === 'admin';
  const [notices, setNotices] = useState<Notice[]>(mockNotices);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedNotice, setSelectedNotice] = useState<Notice | null>(null);

  const handleNewNotice = useCallback(() => {
    setSelectedNotice(null);
    setIsFormOpen(true);
  }, []);

  const handleEditNotice = useCallback((notice: Notice) => {
    setSelectedNotice(notice);
    setIsFormOpen(true);
  }, []);

  const handleDelete = useCallback((id: string) => {
    setNotices(prevNotices => prevNotices.filter(n => n.id !== id));
  }, []);
  
  const handleFormSubmit = useCallback((noticeData: Omit<Notice, 'id' | 'createdAt'>) => {
    if (selectedNotice) {
      // Edit notice
      const updatedNotices = notices.map(n => 
        n.id === selectedNotice.id ? { ...selectedNotice, ...noticeData, createdAt: new Date() } : n
      );
      setNotices(updatedNotices);
    } else {
      // Add new notice
      const newNotice: Notice = {
        id: (notices.length + 1).toString(),
        createdAt: new Date(),
        ...noticeData,
      };
      setNotices(prevNotices => [newNotice, ...prevNotices]);
    }
    setIsFormOpen(false);
  }, [selectedNotice, notices]);

  return (
    <div className="container mx-auto py-10">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold font-headline">Notice Board</h1>
          <p className="text-muted-foreground">Stay updated with the latest announcements and news.</p>
        </div>
        {isAdmin && (
          <Button onClick={handleNewNotice}>
            <PlusCircle className="mr-2 h-4 w-4" />
            New Notice
          </Button>
        )}
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {notices.map(notice => (
          <Card key={notice.id} className="flex flex-col">
            <CardHeader>
              <CardTitle>{notice.title}</CardTitle>
            </CardHeader>
            <CardContent className="flex-grow">
              <p className="text-sm text-muted-foreground whitespace-pre-wrap">{notice.content}</p>
            </CardContent>
            <CardFooter className="flex justify-between items-center">
              <p className="text-xs text-muted-foreground">
                Posted on {notice.createdAt.toLocaleDateString()}
              </p>
              {isAdmin && (
                <div className="flex gap-2">
                  <Button variant="ghost" size="icon" onClick={() => handleEditNotice(notice)}>
                    <Edit className="h-4 w-4" />
                  </Button>
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button variant="ghost" size="icon" className="text-destructive hover:text-destructive">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                        <AlertDialogDescription>
                          This action cannot be undone. This will permanently delete this notice.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={() => handleDelete(notice.id)} className="bg-destructive hover:bg-destructive/90">Delete</AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              )}
            </CardFooter>
          </Card>
        ))}
      </div>
       <NoticeForm
        isOpen={isFormOpen}
        onOpenChange={setIsFormOpen}
        onSubmit={handleFormSubmit}
        notice={selectedNotice}
      />
    </div>
  );
}
