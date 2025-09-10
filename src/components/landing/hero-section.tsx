'use client';

import { Button } from '@/components/ui/button';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, GraduationCap } from 'lucide-react';

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/5 via-white to-accent/5 overflow-hidden">
      {/* Navigation Header */}
      <header className="absolute top-0 left-0 w-full z-20 bg-white/80 backdrop-blur-sm border-b border-gray-100">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Image
                src="/logo.png"
                alt="CK High School Logo"
                width={32}
                height={32}
                className="rounded-full"
              />
              <span className="font-bold text-primary">CK High School</span>
            </div>
            <Button asChild size="sm">
              <Link href="/login">
                Login
                <ArrowRight className="ml-2 h-3 w-3" />
              </Link>
            </Button>
          </div>
        </div>
      </header>

      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>

      <div className="container mx-auto px-4 py-20 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="text-left space-y-8">
            <div className="flex items-center space-x-4 mb-6">
              <div className="relative">
                <Image
                  src="/logo.png"
                  alt="CK High School Logo"
                  width={80}
                  height={80}
                  className="rounded-full shadow-lg animate-fade-in"
                />
                <div className="absolute -top-2 -right-2 h-6 w-6 bg-accent rounded-full flex items-center justify-center">
                  <GraduationCap className="h-3 w-3 text-white" />
                </div>
              </div>
              <div>
                <h3 className="text-xl font-bold text-primary">CK High School</h3>
                <p className="text-sm text-muted-foreground">Excellence in Education</p>
              </div>
            </div>

            <div className="space-y-6">
              <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent leading-tight animate-fade-in-up">
                Smart School
                <span className="block">Management System</span>
              </h1>
              
              <p className="text-lg md:text-xl text-muted-foreground max-w-2xl leading-relaxed animate-fade-in-up animation-delay-200">
                Streamline your educational institution with our comprehensive management platform. 
                Manage students, track attendance, handle fees, and generate documents - all in one place.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 animate-fade-in-up animation-delay-400">
              <Button asChild variant="outline" size="lg" className="group">
                <Link href="#features">
                  Learn More
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 pt-8 border-t animate-fade-in-up animation-delay-600">
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">1000+</div>
                <div className="text-sm text-muted-foreground">Students</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">50+</div>
                <div className="text-sm text-muted-foreground">Teachers</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">15+</div>
                <div className="text-sm text-muted-foreground">Years</div>
              </div>
            </div>
          </div>

          {/* Right Content - Illustration */}
          <div className="relative lg:ml-12">
            <div className="relative w-full max-w-lg mx-auto">
              {/* Floating Cards Animation */}
              <div className="absolute inset-0 animate-float">
                <div className="absolute top-4 left-4 w-20 h-20 bg-primary/10 rounded-lg flex items-center justify-center animate-bounce animation-delay-1000">
                  <GraduationCap className="h-8 w-8 text-primary" />
                </div>
                <div className="absolute top-12 right-8 w-16 h-16 bg-accent/10 rounded-lg animate-pulse animation-delay-1500"></div>
                <div className="absolute bottom-12 left-12 w-12 h-12 bg-primary/20 rounded-full animate-ping animation-delay-2000"></div>
              </div>
              
              {/* Main Illustration */}
              <div className="relative bg-white rounded-3xl shadow-2xl p-8 border animate-fade-in-right">
                <div className="space-y-4">
                  <div className="h-4 bg-gradient-to-r from-primary to-accent rounded w-3/4"></div>
                  <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                  <div className="h-3 bg-gray-200 rounded w-2/3"></div>
                  <div className="grid grid-cols-2 gap-4 mt-6">
                    <div className="h-20 bg-primary/5 rounded-lg flex items-center justify-center">
                      <div className="text-xs text-primary font-medium">Students</div>
                    </div>
                    <div className="h-20 bg-accent/5 rounded-lg flex items-center justify-center">
                      <div className="text-xs text-accent font-medium">Reports</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-primary rounded-full flex justify-center">
          <div className="w-1 h-3 bg-primary rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  );
}