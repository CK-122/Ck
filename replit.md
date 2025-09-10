# Academica - Academic Management System

## Overview

Academica is a comprehensive academic management system built with Next.js for C.K. High School. The application provides role-based dashboards and functionality for Students, Teachers, and Administrators to manage student records, marks, notices, and generate academic documents. The system features a modern, responsive design with Material Design principles and includes AI-powered document generation capabilities.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: Next.js 15.3.3 with App Router and React Server Components
- **Styling**: Tailwind CSS with custom color scheme (dark blue primary, orange accent, light gray background)
- **UI Components**: Radix UI primitives with shadcn/ui component library for consistent Material Design implementation
- **Typography**: PT Sans font family for both body and headlines
- **State Management**: React Context API for authentication state, React Hook Form for form management
- **Responsive Design**: Mobile-first approach with adaptive layouts for desktop and tablet screens

### Authentication & Authorization
- **Mock Authentication System**: Custom implementation simulating Firebase Authentication without backend dependency
- **Role-Based Access Control**: Three user roles (Admin, Teacher, Student) with different permissions and dashboard views
- **Protected Routes**: Layout-based route protection with automatic redirection based on authentication status
- **Session Management**: Context-based user state with role-specific assigned classes for teachers

### Data Layer
- **Mock Data Storage**: In-memory JavaScript objects simulating database records for students, notices, marks, and teacher assignments
- **Type Safety**: TypeScript interfaces for all data models (User, Student, Notice, Mark)
- **Data Validation**: Zod schemas for form validation and type inference

### AI Integration
- **Google AI Integration**: Genkit framework with Google AI (Gemini 2.5 Flash) for document generation
- **Document Generation**: AI-powered marksheet and admit card generation with customizable templates
- **Server Actions**: Server-side AI flows for processing document requests

### Component Architecture
- **Modular Design**: Separated components by feature (dashboard, student, auth, layout, documents)
- **Reusable UI Components**: Atomic design approach with base UI components from Radix UI
- **Custom Hooks**: Centralized logic for authentication, mobile detection, and toast notifications
- **Layout System**: Sidebar navigation with responsive mobile sheet implementation

### Routing Structure
- **App Router**: Modern Next.js routing with grouped routes for authenticated and public sections
- **Route Groups**: 
  - `(app)` - Protected application routes requiring authentication
  - `(auth)` - Public authentication routes (login, signup)
- **Dynamic Redirects**: Automatic routing based on user authentication state and role

### Form Management
- **React Hook Form**: Declarative form handling with validation
- **Zod Integration**: Runtime type checking and form validation schemas
- **File Uploads**: Base64 conversion for image handling in admit card generation

### Performance Optimizations
- **Code Splitting**: Component-level lazy loading with React.memo optimization
- **Image Optimization**: Next.js Image component with remote pattern support
- **Bundle Optimization**: Turbopack for development builds
- **Standalone Output**: Optimized production builds for deployment

## External Dependencies

### Core Framework
- **Next.js 15.3.3**: React framework with App Router, server components, and image optimization
- **React 18.3.1**: Frontend library with concurrent features
- **TypeScript**: Static type checking and enhanced developer experience

### UI & Styling
- **Tailwind CSS**: Utility-first CSS framework with custom design tokens
- **Radix UI**: Unstyled, accessible UI primitives for complex components
- **shadcn/ui**: Pre-built component library built on Radix UI
- **Lucide React**: Consistent icon library for Material Design compliance
- **class-variance-authority**: Type-safe component variants
- **tailwind-merge**: Utility for merging Tailwind classes

### Forms & Validation
- **React Hook Form**: Performant form library with minimal re-renders
- **Zod**: TypeScript-first schema validation
- **@hookform/resolvers**: Integration between React Hook Form and Zod

### AI & Document Generation
- **Genkit**: Google's AI framework for building AI-powered applications
- **@genkit-ai/googleai**: Google AI provider for Genkit
- **@genkit-ai/next**: Next.js integration for Genkit

### Data Visualization
- **Recharts**: React charting library for dashboard analytics
- **@tanstack/react-table**: Headless table library for data display

### Utilities
- **date-fns**: Modern date utility library
- **clsx**: Utility for constructing className strings
- **embla-carousel-react**: Carousel component for image galleries

### Development Tools
- **ESLint**: Code linting with Next.js recommended rules
- **Tailwind CSS IntelliSense**: Enhanced development experience for Tailwind
- **TypeScript compiler**: Type checking and IntelliSense

### External Services
- **Google Fonts**: PT Sans font family hosted on Google Fonts CDN
- **Placeholder Images**: Picsum.photos and Placehold.co for development images
- **Replit Environment**: Development platform with specific host configurations