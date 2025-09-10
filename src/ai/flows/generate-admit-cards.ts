
// src/ai/flows/generate-admit-cards.ts
'use server';

/**
 * @fileOverview Generates admit cards for students, fitting four different cards on one A4 page, downloadable as a PDF.
 *
 * - generateAdmitCards - A function that generates admit cards.
 * - GenerateAdmitCardsInput - The input type for the generateAdmitCards function.
 * - GenerateAdmitCardsOutput - The return type for the generateAdmitCards function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateAdmitCardsInputSchema = z.object({
  classDetails: z.string().describe('The class details for which to generate admit cards.'),
  studentDetails: z.array(
    z.object({
      name: z.string().describe('The name of the student.'),
      rollNumber: z.string().describe('The roll number of the student.'),
      photoDataUri: z
        .string()
        .describe(
          'A photo of the student, as a data URI that must include a MIME type and use Base64 encoding. Expected format: \'data:<mimetype>;base64,<encoded_data>\'.' 
        ),
    })
  ).describe('Array of student details including name, roll number and photo.'),
});
export type GenerateAdmitCardsInput = z.infer<typeof GenerateAdmitCardsInputSchema>;

const GenerateAdmitCardsOutputSchema = z.object({
  pdfDataUri: z.string().describe('The generated PDF data URI containing admit cards.'),
});
export type GenerateAdmitCardsOutput = z.infer<typeof GenerateAdmitCardsOutputSchema>;


const suggestAdmitCardFormat = ai.defineTool({
  name: 'suggestAdmitCardFormat',
  description: 'Suggests the optimal formatting for admit cards to be printed four per A4 page.',
  inputSchema: z.object({
    studentName: z.string().describe('The student full name'),
    rollNumber: z.string().describe('Student roll no.'),
    className: z.string().describe('Name of the class the student is in'),
  }),
  outputSchema: z.string().describe('Suggested formatting for the admit card as a CSS string.'),
  handler: async (input) => {
    // TODO: Implement the logic to suggest optimal formatting based on content.
    // This is a placeholder implementation.
    return `
      .admit-card {
        border: 1px solid black;
        padding: 10px;
        margin: 5px;
        width: calc(50% - 10px); /* Two cards per row */
        box-sizing: border-box;
        page-break-inside: avoid; /* Prevent cards from breaking across pages */
      }
      @media print {
        @page { size: A4; margin: 0; }
        body { margin: 0; }
        .admit-card {width: calc(50% - 10px);height: auto;}
      }
    `;
  },
});

export async function generateAdmitCards(input: GenerateAdmitCardsInput): Promise<GenerateAdmitCardsOutput> {
  return generateAdmitCardsFlow(input);
}

const generateAdmitCardsPrompt = ai.definePrompt({
  name: 'generateAdmitCardsPrompt',
  input: {schema: GenerateAdmitCardsInputSchema},
  output: {schema: GenerateAdmitCardsOutputSchema},
  tools: [suggestAdmitCardFormat],
  prompt: `You are an expert in generating admit cards for students.

  Given the student details and class details, generate HTML content suitable for conversion to PDF. Each A4 page should contain four admit cards. Utilize the suggestAdmitCardFormat tool to optimize the layout and styling.

  Here are the class details: {{{classDetails}}}

  Here are the student details:
  {{#each studentDetails}}
  Student Name: {{{name}}}, Roll No.: {{{rollNumber}}}, Photo: {{media url=photoDataUri}}
  {{/each}}

  Ensure each admit card includes the student's name, roll number, photo, and class details. The output should be a complete HTML document, including <!DOCTYPE html>, <html>, <head>, and <body> tags.

  Output the complete HTML as a data URI for PDF generation.`, // Changed prompt here
});

const generateAdmitCardsFlow = ai.defineFlow(
  {
    name: 'generateAdmitCardsFlow',
    inputSchema: GenerateAdmitCardsInputSchema,
    outputSchema: GenerateAdmitCardsOutputSchema,
  },
  async input => {
    const {output} = await generateAdmitCardsPrompt(input);
    return output!;
  }
);
