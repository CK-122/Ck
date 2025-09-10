'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Award, Target, Heart, Lightbulb } from 'lucide-react';
import Image from 'next/image';

const values = [
  {
    icon: Award,
    title: 'Excellence',
    description: 'We strive for excellence in education, technology, and student outcomes.',
    color: 'text-blue-600',
    bgColor: 'bg-blue-50'
  },
  {
    icon: Target,
    title: 'Innovation',
    description: 'Embracing cutting-edge technology to enhance the learning experience.',
    color: 'text-green-600',
    bgColor: 'bg-green-50'
  },
  {
    icon: Heart,
    title: 'Care',
    description: 'Every student matters. We provide personalized attention and support.',
    color: 'text-red-600',
    bgColor: 'bg-red-50'
  },
  {
    icon: Lightbulb,
    title: 'Growth',
    description: 'Fostering continuous learning and development for all stakeholders.',
    color: 'text-amber-600',
    bgColor: 'bg-amber-50'
  }
];

export function AboutSection() {
  return (
    <section className="py-20 bg-white" id="about">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <div className="animate-fade-in-up">
            <div className="mb-8">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                About CK High School
                <span className="block text-primary">Management System</span>
              </h2>
              <div className="w-20 h-1 bg-gradient-to-r from-primary to-accent mb-6"></div>
              <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                Founded with a vision to revolutionize education through technology, CK High School 
                Management System has been at the forefront of digital transformation in education 
                for over 15 years.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Our comprehensive platform serves thousands of educational institutions worldwide, 
                helping them streamline operations, improve communication, and enhance student outcomes 
                through innovative technology solutions.
              </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-6 mb-8">
              <div className="text-center p-4 bg-primary/5 rounded-lg">
                <div className="text-2xl font-bold text-primary mb-1">15+</div>
                <div className="text-sm text-muted-foreground">Years Experience</div>
              </div>
              <div className="text-center p-4 bg-accent/5 rounded-lg">
                <div className="text-2xl font-bold text-accent mb-1">500+</div>
                <div className="text-sm text-muted-foreground">Schools Worldwide</div>
              </div>
            </div>
          </div>

          {/* Right Content */}
          <div className="relative animate-fade-in-right">
            {/* Main Image */}
            <div className="relative bg-gradient-to-br from-primary/10 to-accent/10 rounded-2xl p-8">
              <div className="bg-white rounded-xl shadow-lg p-6">
                <div className="flex items-center space-x-4 mb-6">
                  <Image
                    src="/logo.png"
                    alt="CK High School"
                    width={60}
                    height={60}
                    className="rounded-full"
                  />
                  <div>
                    <h3 className="font-bold text-lg">CK High School</h3>
                    <p className="text-sm text-muted-foreground">Excellence in Education</p>
                  </div>
                </div>
                
                {/* Mock Dashboard Elements */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded">
                    <span className="text-sm">Active Students</span>
                    <span className="font-semibold text-primary">1,247</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded">
                    <span className="text-sm">Teachers</span>
                    <span className="font-semibold text-accent">52</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded">
                    <span className="text-sm">Attendance Rate</span>
                    <span className="font-semibold text-green-600">96.8%</span>
                  </div>
                </div>
              </div>

              {/* Floating Elements */}
              <div className="absolute -top-4 -right-4 w-16 h-16 bg-accent/20 rounded-full animate-bounce animation-delay-1000"></div>
              <div className="absolute -bottom-4 -left-4 w-12 h-12 bg-primary/20 rounded-full animate-pulse animation-delay-1500"></div>
            </div>
          </div>
        </div>

        {/* Core Values */}
        <div className="mt-20">
          <div className="text-center mb-12 animate-fade-in-up">
            <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
              Our Core Values
            </h3>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              These fundamental principles guide everything we do and shape our commitment to educational excellence
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <Card 
                  key={value.title}
                  className="group hover:shadow-lg transition-all duration-300 border-0 shadow-sm hover:-translate-y-1 animate-fade-in-up"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <CardContent className="p-6 text-center">
                    <div className={`mx-auto w-14 h-14 ${value.bgColor} rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                      <Icon className={`h-7 w-7 ${value.color}`} />
                    </div>
                    <h4 className="font-semibold text-lg text-gray-900 mb-3">{value.title}</h4>
                    <p className="text-sm text-muted-foreground leading-relaxed">{value.description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Mission Statement */}
        <div className="mt-20 text-center animate-fade-in-up animation-delay-600">
          <div className="bg-gradient-to-r from-primary/5 via-white to-accent/5 rounded-2xl p-8 md:p-12">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Our Mission</h3>
            <p className="text-lg text-muted-foreground leading-relaxed max-w-4xl mx-auto">
              "To empower educational institutions with innovative technology solutions that enhance 
              teaching effectiveness, streamline administrative processes, and create meaningful 
              connections between educators, students, and parents."
            </p>
            <div className="mt-8 flex justify-center">
              <div className="w-1 h-16 bg-gradient-to-b from-primary to-accent rounded-full"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}