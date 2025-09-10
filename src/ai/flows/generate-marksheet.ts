
'use server';

/**
 * @fileOverview Flow for generating marksheets based on class and roll number.
 *
 * - generateMarksheet - A function that generates a marksheet.
 * - GenerateMarksheetInput - The input type for the generateMarksheet function.
 * - GenerateMarksheetOutput - The return type for the generateMarksheet function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';
import { mockStudents, mockMarks } from '@/lib/data';
import type { Student, Mark } from '@/lib/types';


const GenerateMarksheetInputSchema = z.object({
  className: z.string().describe('The class name for the marksheet.'),
  rollNumber: z.string().describe('The roll no. of the student.'),
});
export type GenerateMarksheetInput = z.infer<typeof GenerateMarksheetInputSchema>;

const GenerateMarksheetOutputSchema = z.object({
  marksheetHtml: z
    .string()
    .describe('The marksheet data in a styled HTML format.'),
});
export type GenerateMarksheetOutput = z.infer<typeof GenerateMarksheetOutputSchema>;

export async function generateMarksheet(input: GenerateMarksheetInput): Promise<GenerateMarksheetOutput> {
  return generateMarksheetFlow(input);
}

const generateMarksheetPrompt = ai.definePrompt({
  name: 'generateMarksheetPrompt',
  input: {schema: z.object({
    student: z.any(),
    marks: z.any(),
    subjectsJson: z.string(),
  })},
  output: {schema: GenerateMarksheetOutputSchema},
  prompt: `You are an expert in creating professional, well-designed academic documents.

  Generate a complete, self-contained HTML document for a student marksheet using the provided data.

  **Student Details:**
  - Name: {{{student.name}}}
  - Class: {{{student.class}}}
  - Roll No: {{{student.rollNumber}}}
  - Father's Name: {{{student.fatherName}}}

  **Marks Data:**
  - Term: {{{marks.term}}}
  - Subjects: {{{subjectsJson}}}

  **Design and Formatting Instructions:**

  1.  **Overall Structure:**
      - Use a standard HTML5 doctype.
      - The body should have a container div with a light grey background (#f4f4f4) and padding.
      - The main marksheet content should be in a white container div with a border, box-shadow for a floating effect, and a max-width of 800px, centered on the page.

  2.  **Header:**
      - Create a header section with the institution name "C.K. HIGH SCHOOL" in a large, bold font (e.g., 24px).
      - Include "Student Marksheet" as a sub-header.
      - Add a border at the bottom of the header.

  3.  **Student Information Section:**
      - Display the student's details (Name, Class, Roll No., Father's Name) in a clean, two-column layout. Use a definition list (<dl>) or simple divs.

  4.  **Marks Table:**
      - Create an HTML table to display the marks.
      - The table headers should be: "Subject", "Marks Obtained", "Total Marks", "Grade".
      - Assume "Total Marks" are 100 for each subject.
      - Calculate a simple grade based on marks: A (>80), B (60-80), C (40-60), F (<40).
      - Style the table with full width, borders, and cell padding.
      - Use alternating row colors (e.g., \`tr:nth-child(even)\`) for readability.
      - Table headers should have a distinct background color.

  5.  **Summary Section:**
      - Below the table, show "Total Marks Obtained" and "Overall Percentage".

  6.  **Footer:**
      - Create a footer section with placeholders for "Class Teacher's Signature" and "Principal's Signature".
      - Include the "Date of Issue".

  7.  **Styling (Inline CSS in <style> tag):**
      - Use 'PT Sans', sans-serif as the font family for the entire document.
      - Define styles for all the elements mentioned above. Make it look professional and print-friendly. Do not use any external stylesheets or images.

  The final output must be a single HTML string containing the complete document.
  `,
});

const generateMarksheetFlow = ai.defineFlow(
  {
    name: 'generateMarksheetFlow',
    inputSchema: GenerateMarksheetInputSchema,
    outputSchema: GenerateMarksheetOutputSchema,
  },
  async ({ className, rollNumber }) => {
    
    // Find the student
    const student = mockStudents.find(s => s.class === className && s.rollNumber === rollNumber);
    if (!student) {
      throw new Error("Student not found.");
    }
    
    // Find the student's marks (we'll take the first term available for this example)
    const marks = mockMarks.find(m => m.studentId === student.id);
    if (!marks) {
       throw new Error("Marks not found for this student.");
    }

    const subjectsJson = JSON.stringify(marks.subjects);

    const { output } = await generateMarksheetPrompt({ student, marks, subjectsJson });
    return { marksheetHtml: output!.marksheetHtml };
  }
);
