'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Users, 
  GraduationCap, 
  Calendar, 
  DollarSign, 
  FileText, 
  BarChart3,
  Bell,
  Shield
} from 'lucide-react';

const features = [
  {
    icon: Users,
    title: 'Student Management',
    description: 'Comprehensive student profiles with enrollment, academic records, and personal information management.',
    color: 'text-blue-600',
    bgColor: 'bg-blue-50',
    borderColor: 'border-blue-200'
  },
  {
    icon: GraduationCap,
    title: 'Marks & Grades',
    description: 'Digital grade books, automatic grade calculations, progress tracking, and detailed report cards.',
    color: 'text-green-600',
    bgColor: 'bg-green-50',
    borderColor: 'border-green-200'
  },
  {
    icon: Calendar,
    title: 'Attendance Tracking',
    description: 'Real-time attendance monitoring, automated reports, and parent notifications for absences.',
    color: 'text-purple-600',
    bgColor: 'bg-purple-50',
    borderColor: 'border-purple-200'
  },
  {
    icon: DollarSign,
    title: 'Fee Management',
    description: 'Online fee collection, payment tracking, automated receipts, and financial reporting.',
    color: 'text-amber-600',
    bgColor: 'bg-amber-50',
    borderColor: 'border-amber-200'
  },
  {
    icon: FileText,
    title: 'Document Generation',
    description: 'Auto-generate certificates, transcripts, ID cards, and official documents with AI assistance.',
    color: 'text-red-600',
    bgColor: 'bg-red-50',
    borderColor: 'border-red-200'
  },
  {
    icon: BarChart3,
    title: 'Analytics & Reports',
    description: 'Detailed insights, performance analytics, and comprehensive reports for informed decisions.',
    color: 'text-indigo-600',
    bgColor: 'bg-indigo-50',
    borderColor: 'border-indigo-200'
  },
  {
    icon: Bell,
    title: 'Notifications',
    description: 'Instant notifications to parents, students, and staff about important updates and events.',
    color: 'text-pink-600',
    bgColor: 'bg-pink-50',
    borderColor: 'border-pink-200'
  },
  {
    icon: Shield,
    title: 'Security & Privacy',
    description: 'Advanced security features, role-based access control, and complete data privacy protection.',
    color: 'text-teal-600',
    bgColor: 'bg-teal-50',
    borderColor: 'border-teal-200'
  }
];

export function FeaturesSection() {
  return (
    <section className="py-20 bg-gradient-to-b from-white to-gray-50" id="features">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 animate-fade-in-up">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Powerful Features for Modern Schools
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Everything you need to manage your educational institution efficiently and effectively
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <Card 
                key={feature.title}
                className={`group hover:shadow-lg transition-all duration-300 border-0 shadow-sm hover:-translate-y-1 animate-fade-in-up ${feature.borderColor}`}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <CardHeader className="text-center pb-4">
                  <div className={`mx-auto w-16 h-16 ${feature.bgColor} rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className={`h-8 w-8 ${feature.color}`} />
                  </div>
                  <CardTitle className="text-lg font-semibold text-gray-900 group-hover:text-primary transition-colors">
                    {feature.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16 animate-fade-in-up animation-delay-800">
          <div className="bg-gradient-to-r from-primary to-accent p-8 rounded-2xl text-white shadow-xl">
            <h3 className="text-2xl font-bold mb-4">Ready to Transform Your School?</h3>
            <p className="text-lg mb-6 opacity-90">
              Join thousands of educators who trust our platform for their daily operations
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-white text-primary px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                Schedule Demo
              </button>
              <button className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-primary transition-colors">
                View Pricing
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}