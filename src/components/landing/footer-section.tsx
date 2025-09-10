'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Image from 'next/image';
import Link from 'next/link';
import { 
  MapPin, 
  Phone, 
  Mail, 
  Facebook, 
  Twitter, 
  Instagram, 
  Linkedin,
  ArrowRight,
  GraduationCap
} from 'lucide-react';

export function FooterSection() {
  return (
    <footer className="bg-gray-900 text-white">
      {/* Main Footer */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* School Info */}
          <div className="lg:col-span-1">
            <div className="flex items-center space-x-3 mb-6">
              <Image
                src="/logo.png"
                alt="CK High School Logo"
                width={40}
                height={40}
                className="rounded-full"
              />
              <div>
                <h3 className="text-xl font-bold">CK High School</h3>
                <p className="text-sm text-gray-400">Management System</p>
              </div>
            </div>
            <p className="text-gray-400 mb-6 leading-relaxed">
              Empowering education through innovative technology. We provide comprehensive 
              school management solutions that streamline operations and enhance learning experiences.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center hover:bg-blue-700 transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="w-10 h-10 bg-blue-400 rounded-full flex items-center justify-center hover:bg-blue-500 transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="w-10 h-10 bg-pink-600 rounded-full flex items-center justify-center hover:bg-pink-700 transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="w-10 h-10 bg-blue-700 rounded-full flex items-center justify-center hover:bg-blue-800 transition-colors">
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-6 relative">
              Quick Links
              <div className="absolute -bottom-2 left-0 w-12 h-0.5 bg-accent"></div>
            </h4>
            <ul className="space-y-3">
              <li><Link href="/login" className="text-gray-400 hover:text-white transition-colors hover:translate-x-1 inline-block">Student Portal</Link></li>
              <li><Link href="/login" className="text-gray-400 hover:text-white transition-colors hover:translate-x-1 inline-block">Teacher Dashboard</Link></li>
              <li><Link href="/login" className="text-gray-400 hover:text-white transition-colors hover:translate-x-1 inline-block">Admin Panel</Link></li>
              <li><Link href="#features" className="text-gray-400 hover:text-white transition-colors hover:translate-x-1 inline-block">Features</Link></li>
              <li><Link href="#testimonials" className="text-gray-400 hover:text-white transition-colors hover:translate-x-1 inline-block">Testimonials</Link></li>
              <li><Link href="#" className="text-gray-400 hover:text-white transition-colors hover:translate-x-1 inline-block">Support</Link></li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-lg font-semibold mb-6 relative">
              Our Services
              <div className="absolute -bottom-2 left-0 w-12 h-0.5 bg-accent"></div>
            </h4>
            <ul className="space-y-3">
              <li className="text-gray-400 flex items-center"><GraduationCap className="h-4 w-4 mr-2 text-accent" />Student Management</li>
              <li className="text-gray-400 flex items-center"><GraduationCap className="h-4 w-4 mr-2 text-accent" />Attendance Tracking</li>
              <li className="text-gray-400 flex items-center"><GraduationCap className="h-4 w-4 mr-2 text-accent" />Grade Management</li>
              <li className="text-gray-400 flex items-center"><GraduationCap className="h-4 w-4 mr-2 text-accent" />Fee Collection</li>
              <li className="text-gray-400 flex items-center"><GraduationCap className="h-4 w-4 mr-2 text-accent" />Document Generation</li>
              <li className="text-gray-400 flex items-center"><GraduationCap className="h-4 w-4 mr-2 text-accent" />Analytics & Reports</li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-6 relative">
              Contact Information
              <div className="absolute -bottom-2 left-0 w-12 h-0.5 bg-accent"></div>
            </h4>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <MapPin className="h-5 w-5 text-accent mt-1 flex-shrink-0" />
                <div>
                  <p className="text-gray-400 text-sm">
                    123 Education Street<br />
                    Learning City, LC 12345<br />
                    United States
                  </p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-accent flex-shrink-0" />
                <div>
                  <p className="text-gray-400 text-sm">+1 (555) 123-4567</p>
                  <p className="text-gray-400 text-sm">+1 (555) 987-6543</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-accent flex-shrink-0" />
                <div>
                  <p className="text-gray-400 text-sm">info@ckhighschool.edu</p>
                  <p className="text-gray-400 text-sm">support@ckhighschool.edu</p>
                </div>
              </div>
            </div>

            {/* Newsletter */}
            <div className="mt-8">
              <h5 className="font-semibold mb-3">Stay Updated</h5>
              <div className="flex space-x-2">
                <Input 
                  placeholder="Your email address" 
                  className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-500"
                />
                <Button size="sm" className="bg-accent hover:bg-accent/90">
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="border-t border-gray-800">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-sm text-gray-400">
              © 2025 CK High School Management System. All rights reserved.
            </div>
            <div className="flex space-x-6 text-sm">
              <Link href="#" className="text-gray-400 hover:text-white transition-colors">Privacy Policy</Link>
              <Link href="#" className="text-gray-400 hover:text-white transition-colors">Terms of Service</Link>
              <Link href="#" className="text-gray-400 hover:text-white transition-colors">Cookie Policy</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}