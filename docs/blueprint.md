# **App Name**: Academica

## Core Features:

- User Authentication: Secure sign-up, login, and logout using Firebase Authentication with role-based redirection.
- Role-Based Dashboards: Custom dashboards for Students, Teachers, and Admins with relevant features and data access based on their role.
- Student Management: Teachers and Admins can add, edit, and delete student records, including name, roll number, and class assignments.
- Marks Management: Teachers can enter and update student marks for various subjects within their assigned classes.
- Notice Board: Display of announcements fetched from Firestore, available to all users. Admins can create, edit, and delete announcements.
- Data Export: Admins can export complete student data as an Excel file for record-keeping and analysis.
- Document Generation Tool: Generate marksheet by entering class and roll number, Generate admit cards: print 4 different admit cards on one A4 page, output downloadable as PDF with a clear format. LLM is leveraged as a tool in this process to suggest optimal formatting based on content.

## Style Guidelines:

- Primary color: Dark blue (#3F51B5) to convey trust and stability, inspired by traditional academic colors.
- Background color: Light gray (#F5F5F5) for a clean and modern look that reduces eye strain.
- Accent color: Orange (#FF9800) to highlight important actions and calls to action.
- Body font: 'PT Sans' a versatile, readable sans-serif for a modern feel. Headline Font: 'PT Sans'
- Use Material Design icons to maintain consistency and provide clear visual cues for actions and navigation.
- Employ a responsive grid layout that adapts to different screen sizes, ensuring usability on desktops and tablets.
- Subtle animations to give feedback when editing fields