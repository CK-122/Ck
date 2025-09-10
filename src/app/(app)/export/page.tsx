'use client';

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Download, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { mockStudents } from "@/lib/data";
import { useState } from "react";

export default function ExportPage() {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleExport = () => {
    setIsLoading(true);
    try {
      // Simulate fetching data
      setTimeout(() => {
        const headers = ["ID", "Name", "Roll No.", "Class"];
        const rows = mockStudents.map(s => [s.id, s.name, s.rollNumber, s.class]);
        
        let csvContent = "data:text/csv;charset=utf-8," 
          + [headers.join(","), ...rows.map(e => e.join(","))].join("\n");
        
        const encodedUri = encodeURI(csvContent);
        const link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        link.setAttribute("download", "student_data.csv");
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        
        toast({
          title: "Export Successful",
          description: "Student data has been exported as a CSV file.",
        });
        setIsLoading(false);
      }, 1000);
    } catch(error) {
      toast({
        variant: "destructive",
        title: "Export Failed",
        description: "An error occurred while exporting data.",
      });
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto py-10">
      <div className="mb-6">
        <h1 className="text-3xl font-bold font-headline">Data Export</h1>
        <p className="text-muted-foreground">Download complete datasets from the system.</p>
      </div>

      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>Export Student Data</CardTitle>
          <CardDescription>
            Download a complete list of all students in the system as a CSV file. 
            This file can be opened in spreadsheet software like Excel or Google Sheets.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button onClick={handleExport} disabled={isLoading}>
            {isLoading ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <Download className="mr-2 h-4 w-4" />
            )}
            {isLoading ? 'Exporting...' : 'Export to CSV'}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
