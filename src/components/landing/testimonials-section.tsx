'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Star, Quote } from 'lucide-react';
import { useState, useEffect } from 'react';

const testimonials = [
  {
    name: 'Dr. Sarah Johnson',
    role: 'Principal, Greenwood High School',
    content: 'CK High School Management System has revolutionized how we handle student data and administrative tasks. The intuitive interface and comprehensive features have saved us countless hours.',
    rating: 5,
    avatar: 'SJ'
  },
  {
    name: 'Mr. James Wilson',
    role: 'IT Administrator, Oakridge Academy',
    content: 'The security features and easy implementation made our transition seamless. Our staff adapted quickly, and parents love the transparency in tracking their children\'s progress.',
    rating: 5,
    avatar: 'JW'
  },
  {
    name: 'Mrs. Emily Davis',
    role: 'Teacher, Riverside Elementary',
    content: 'Managing attendance and grades has never been easier. The automated reports and parent notifications have improved our communication significantly.',
    rating: 5,
    avatar: 'ED'
  },
  {
    name: 'Mr. David Chen',
    role: 'Finance Manager, Summit Prep',
    content: 'The fee management system streamlined our billing process. Online payments and automated receipts have reduced administrative workload by 70%.',
    rating: 5,
    avatar: 'DC'
  }
];

const achievements = [
  { number: '50,000+', label: 'Students Managed', icon: '👥' },
  { number: '500+', label: 'Schools Trusted', icon: '🏫' },
  { number: '99.9%', label: 'Uptime Guaranteed', icon: '⚡' },
  { number: '24/7', label: 'Support Available', icon: '🛟' }
];

export function TestimonialsSection() {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-white" id="testimonials">
      <div className="container mx-auto px-4">
        {/* Achievements Section */}
        <div className="text-center mb-20">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 animate-fade-in-up">
            Trusted by Educators Worldwide
          </h2>
          <p className="text-lg text-muted-foreground mb-12 animate-fade-in-up animation-delay-200">
            Join thousands of schools that have transformed their operations with our platform
          </p>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
            {achievements.map((achievement, index) => (
              <div 
                key={achievement.label}
                className="text-center animate-fade-in-up"
                style={{ animationDelay: `${index * 100 + 300}ms` }}
              >
                <div className="text-4xl mb-2">{achievement.icon}</div>
                <div className="text-3xl font-bold text-primary mb-2">{achievement.number}</div>
                <div className="text-sm text-muted-foreground">{achievement.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Testimonials Carousel */}
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h3 className="text-2xl font-bold text-gray-900 mb-4 animate-fade-in-up">
              What Educators Say About Us
            </h3>
          </div>

          <div className="relative">
            {/* Main Testimonial Card */}
            <Card className="bg-white shadow-xl border-0 animate-fade-in">
              <CardContent className="p-8 md:p-12 text-center">
                <Quote className="h-12 w-12 text-primary mx-auto mb-6 opacity-20" />
                
                <p className="text-lg md:text-xl text-gray-700 leading-relaxed mb-8 italic">
                  "{testimonials[currentTestimonial].content}"
                </p>
                
                <div className="flex items-center justify-center space-x-1 mb-6">
                  {[...Array(testimonials[currentTestimonial].rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>

                <div className="flex items-center justify-center space-x-4">
                  <div className="w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center font-semibold">
                    {testimonials[currentTestimonial].avatar}
                  </div>
                  <div className="text-left">
                    <div className="font-semibold text-gray-900">
                      {testimonials[currentTestimonial].name}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {testimonials[currentTestimonial].role}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Navigation Dots */}
            <div className="flex justify-center space-x-2 mt-8">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentTestimonial(index)}
                  className={`w-3 h-3 rounded-full transition-colors ${
                    index === currentTestimonial ? 'bg-primary' : 'bg-gray-300'
                  }`}
                />
              ))}
            </div>

            {/* Background Testimonial Cards */}
            <div className="hidden lg:block">
              <Card className="absolute -left-8 top-16 w-64 opacity-30 rotate-6 bg-accent/10">
                <CardContent className="p-6">
                  <div className="h-4 bg-gray-200 rounded mb-2"></div>
                  <div className="h-3 bg-gray-200 rounded w-3/4 mb-4"></div>
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-gray-200 rounded-full"></div>
                    <div>
                      <div className="h-3 bg-gray-200 rounded w-16 mb-1"></div>
                      <div className="h-2 bg-gray-200 rounded w-20"></div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="absolute -right-8 top-16 w-64 opacity-30 -rotate-6 bg-primary/10">
                <CardContent className="p-6">
                  <div className="h-4 bg-gray-200 rounded mb-2"></div>
                  <div className="h-3 bg-gray-200 rounded w-2/3 mb-4"></div>
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-gray-200 rounded-full"></div>
                    <div>
                      <div className="h-3 bg-gray-200 rounded w-16 mb-1"></div>
                      <div className="h-2 bg-gray-200 rounded w-20"></div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}