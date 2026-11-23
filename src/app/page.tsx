'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useToast } from '@/lib/toast';
import {
  Dumbbell, Menu, X, ArrowRight, CheckCircle, Building2, Users, CreditCard,
  QrCode, UserCheck, ClipboardList, Apple, Activity, BarChart3, MessageSquare,
  GitBranch, ChevronRight, Star, Zap, Shield, Phone, Mail, MapPin, Send
} from 'lucide-react';

const NAV_LINKS = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Features', href: '#features' },
  { label: 'Pricing', href: '#pricing' },
  { label: 'Contact', href: '#contact' },
];

const FEATURES = [
  { icon: Building2, title: 'Gym Management', desc: 'Manage multiple gyms and branches from a single dashboard.' },
  { icon: Users, title: 'Member Management', desc: 'Complete member profiles, registrations and lifecycle management.' },
  { icon: CreditCard, title: 'Membership Management', desc: 'Flexible plans, auto-renewals and expiry tracking.' },
  { icon: CreditCard, title: 'Payment Management', desc: 'Track payments, generate invoices and manage billing.' },
  { icon: QrCode, title: 'QR Attendance', desc: 'Contactless check-in with QR code scanning technology.' },
  { icon: UserCheck, title: 'Trainer Management', desc: 'Assign trainers, track performance and manage schedules.' },
  { icon: Dumbbell, title: 'Workout Management', desc: 'Create and assign personalized workout plans.' },
  { icon: Apple, title: 'Diet Management', desc: 'Build custom meal plans with calorie tracking.' },
  { icon: Activity, title: 'Fitness Progress', desc: 'Track weight, BMI and body measurements over time.' },
  { icon: BarChart3, title: 'Reports & Analytics', desc: 'Revenue, attendance and growth analytics dashboards.' },
  { icon: MessageSquare, title: 'WhatsApp Automation', desc: 'Automated reminders, welcomes and announcements.' },
  { icon: GitBranch, title: 'Multi-Branch', desc: 'Manage unlimited branches under one gym account.' },
];

const STEPS = [
  { step: '01', title: 'Register Your Gym', desc: 'Sign up and create your gym profile on GymOS.' },
  { step: '02', title: 'Set Up Your Gym', desc: 'Configure branches, plans and preferences.' },
  { step: '03', title: 'Add Members', desc: 'Register members with complete profile details.' },
  { step: '04', title: 'Create Membership Plans', desc: 'Set up monthly, quarterly and annual plans.' },
  { step: '05', title: 'Manage Attendance', desc: 'Use QR codes for contactless check-in.' },
  { step: '06', title: 'Track Fitness Progress', desc: 'Monitor weight, BMI and body metrics.' },
  { step: '07', title: 'Automate Communication', desc: 'Send WhatsApp reminders automatically.' },
  { step: '08', title: 'Analyse Performance', desc: 'View reports and grow your business.' },
];

const PLANS = [
  {
    name: 'Basic', price: '1,999', period: '/month',
    features: ['1 Gym Location', 'Up to 100 Members', 'Basic Reports', 'QR Attendance', 'Email Support', '1 Admin User'],
    popular: false,
  },
  {
    name: 'Professional', price: '4,999', period: '/month',
    features: ['Up to 3 Branches', 'Up to 500 Members', 'Advanced Analytics', 'WhatsApp Integration', 'Priority Support', '5 Admin Users', 'Workout & Diet Plans', 'Custom Branding'],
    popular: true,
  },
  {
    name: 'Enterprise', price: '9,999', period: '/month',
    features: ['Unlimited Branches', 'Unlimited Members', 'Full Analytics Suite', 'WhatsApp Automation', '24/7 Dedicated Support', 'Unlimited Admin Users', 'API Access', 'White Labeling', 'Custom Integrations'],
    popular: false,
  },
];

export default function HomePage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { addToast } = useToast();
  const [contactForm, setContactForm] = useState({ name: '', gymName: '', email: '', phone: '', members: '', message: '' });
  const [contactErrors, setContactErrors] = useState<Record<string, string>>({});

  const validateContact = () => {
    const errors: Record<string, string> = {};
    if (!contactForm.name.trim()) errors.name = 'Name is required';
    if (!contactForm.email.trim()) errors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(contactForm.email)) errors.email = 'Invalid email';
    if (!contactForm.phone.trim()) errors.phone = 'Phone is required';
    if (!contactForm.message.trim()) errors.message = 'Message is required';
    setContactErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateContact()) {
      addToast('Thank you! We will get back to you soon.', 'success');
      setContactForm({ name: '', gymName: '', email: '', phone: '', members: '', message: '' });
      setContactErrors({});
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 bg-white/95 backdrop-blur-sm border-b border-gray-100 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-9 h-9 bg-green-600 rounded-lg flex items-center justify-center">
                <Dumbbell className="w-5 h-5 text-white" />
              </div>
              <span className="font-bold text-xl text-gray-900">GymOS</span>
            </Link>
            <div className="hidden md:flex items-center gap-8">
              {NAV_LINKS.map(l => (
                <a key={l.href} href={l.href} className="text-sm font-medium text-gray-600 hover:text-green-600 transition-colors">{l.label}</a>
              ))}
            </div>
            <div className="hidden md:flex items-center gap-3">
              <Link href="/login" className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-green-600 transition-colors">Login</Link>
              <Link href="/login" className="px-5 py-2.5 text-sm font-medium text-white bg-green-600 rounded-lg hover:bg-green-700 transition-colors">Register Your Gym</Link>
            </div>
            <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="md:hidden p-2">
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
        {mobileMenuOpen && (
          <div className="md:hidden bg-white border-t border-gray-100 py-4 px-4 space-y-2">
            {NAV_LINKS.map(l => (
              <a key={l.href} href={l.href} onClick={() => setMobileMenuOpen(false)} className="block px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 rounded-lg">{l.label}</a>
            ))}
            <div className="pt-2 space-y-2">
              <Link href="/login" className="block px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 rounded-lg">Login</Link>
              <Link href="/login" className="block px-3 py-2.5 text-sm font-medium text-white bg-green-600 rounded-lg text-center">Register Your Gym</Link>
            </div>
          </div>
        )}
      </nav>

      {/* Hero */}
      <section id="home" className="pt-24 pb-16 lg:pt-32 lg:pb-24 bg-gradient-to-br from-[#F5F8F6] to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-green-50 rounded-full text-sm font-medium text-green-700 mb-6">
                <Zap className="w-4 h-4" /> Powered by Quenoxa Global Technologies
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                Manage Your Gym.<br />
                <span className="text-green-600">Grow Your Business.</span>
              </h1>
              <p className="mt-6 text-lg text-gray-600 leading-relaxed max-w-xl">
                An all-in-one gym management platform designed to simplify memberships, payments, attendance, trainers and fitness operations.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 mt-8">
                <Link href="/login" className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition-colors">
                  Get Started <ArrowRight className="w-4 h-4" />
                </Link>
                <a href="#features" className="inline-flex items-center justify-center gap-2 px-6 py-3.5 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors">
                  Explore Features
                </a>
              </div>
              <div className="flex items-center gap-6 mt-10 text-sm text-gray-500">
                <div className="flex items-center gap-1.5"><CheckCircle className="w-4 h-4 text-green-500" /> Free Trial</div>
                <div className="flex items-center gap-1.5"><CheckCircle className="w-4 h-4 text-green-500" /> No Setup Fee</div>
                <div className="flex items-center gap-1.5"><CheckCircle className="w-4 h-4 text-green-500" /> Cancel Anytime</div>
              </div>
            </div>
            <div className="relative">
              <div className="bg-gradient-to-br from-green-600 to-[#064E3B] rounded-2xl p-8 text-white">
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                    <Users className="w-8 h-8 mb-2 text-green-300" />
                    <p className="text-2xl font-bold">1,310+</p>
                    <p className="text-sm text-green-200">Active Members</p>
                  </div>
                  <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                    <Building2 className="w-8 h-8 mb-2 text-green-300" />
                    <p className="text-2xl font-bold">8</p>
                    <p className="text-sm text-green-200">Gyms Managed</p>
                  </div>
                  <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                    <BarChart3 className="w-8 h-8 mb-2 text-green-300" />
                    <p className="text-2xl font-bold">₹35L+</p>
                    <p className="text-sm text-green-200">Revenue Tracked</p>
                  </div>
                  <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                    <Star className="w-8 h-8 mb-2 text-green-300" />
                    <p className="text-2xl font-bold">4.9</p>
                    <p className="text-sm text-green-200">User Rating</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About */}
      <section id="about" className="py-16 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">One Platform. Every Gym. <span className="text-green-600">Complete Control.</span></h2>
          <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
            GymOS is a multi-tenant SaaS platform built for modern gym owners. Whether you manage one gym or twenty, 
            GymOS gives you complete control over members, trainers, payments and operations — all from one dashboard.
          </p>
          <div className="grid sm:grid-cols-3 gap-8 mt-12">
            <div className="text-center">
              <div className="w-14 h-14 bg-green-50 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Shield className="w-7 h-7 text-green-600" />
              </div>
              <h3 className="font-semibold text-lg text-gray-900">Enterprise Grade</h3>
              <p className="text-gray-600 mt-2 text-sm">Built with security and scalability at its core. Your data is safe with us.</p>
            </div>
            <div className="text-center">
              <div className="w-14 h-14 bg-green-50 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Zap className="w-7 h-7 text-green-600" />
              </div>
              <h3 className="font-semibold text-lg text-gray-900">Lightning Fast</h3>
              <p className="text-gray-600 mt-2 text-sm">Optimized performance for quick data access and smooth operations.</p>
            </div>
            <div className="text-center">
              <div className="w-14 h-14 bg-green-50 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Star className="w-7 h-7 text-green-600" />
              </div>
              <h3 className="font-semibold text-lg text-gray-900">Premium Support</h3>
              <p className="text-gray-600 mt-2 text-sm">Dedicated support team available to help you succeed.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-16 lg:py-24 bg-[#F5F8F6]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">Everything You Need to <span className="text-green-600">Run Your Gym</span></h2>
            <p className="mt-4 text-lg text-gray-600">Comprehensive tools for every aspect of gym management.</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {FEATURES.map((f, i) => (
              <div key={i} className="bg-white rounded-xl p-6 border border-gray-100 hover:shadow-lg hover:border-green-200 transition-all group">
                <div className="w-12 h-12 bg-green-50 rounded-xl flex items-center justify-center mb-4 group-hover:bg-green-100 transition-colors">
                  <f.icon className="w-6 h-6 text-green-600" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">{f.title}</h3>
                <p className="text-sm text-gray-600">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">How <span className="text-green-600">GymOS</span> Works</h2>
            <p className="mt-4 text-lg text-gray-600">Get started in 8 simple steps.</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {STEPS.map((s, i) => (
              <div key={i} className="relative">
                <div className="bg-[#F5F8F6] rounded-xl p-6 h-full border border-gray-100 hover:border-green-200 transition-colors">
                  <span className="text-3xl font-bold text-green-600/20">{s.step}</span>
                  <h3 className="font-semibold text-gray-900 mt-2">{s.title}</h3>
                  <p className="text-sm text-gray-600 mt-2">{s.desc}</p>
                </div>
                {i < STEPS.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-3 transform -translate-y-1/2">
                    <ChevronRight className="w-5 h-5 text-green-400" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-16 lg:py-24 bg-[#F5F8F6]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">Simple, Transparent <span className="text-green-600">Pricing</span></h2>
            <p className="mt-4 text-lg text-gray-600">Choose the plan that fits your gym.</p>
            <p className="mt-2 text-sm text-orange-600 font-medium bg-orange-50 inline-block px-3 py-1 rounded-full">⚡ Demo Pricing — For Illustration Only</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {PLANS.map((plan, i) => (
              <div key={i} className={`bg-white rounded-2xl border-2 p-8 relative ${plan.popular ? 'border-green-500 shadow-xl scale-105' : 'border-gray-200'}`}>
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-green-600 text-white text-xs font-bold px-4 py-1.5 rounded-full">Most Popular</div>
                )}
                <h3 className="text-xl font-bold text-gray-900">{plan.name}</h3>
                <div className="mt-4 flex items-baseline gap-1">
                  <span className="text-4xl font-bold text-gray-900">₹{plan.price}</span>
                  <span className="text-gray-500">{plan.period}</span>
                </div>
                <ul className="mt-6 space-y-3">
                  {plan.features.map((f, j) => (
                    <li key={j} className="flex items-center gap-2 text-sm text-gray-700">
                      <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" /> {f}
                    </li>
                  ))}
                </ul>
                <Link href="/login" className={`mt-8 block w-full py-3 rounded-lg text-center font-medium transition-colors ${plan.popular ? 'bg-green-600 text-white hover:bg-green-700' : 'bg-gray-100 text-gray-900 hover:bg-gray-200'}`}>
                  Get Started
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="py-16 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12">
            <div>
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">Get in <span className="text-green-600">Touch</span></h2>
              <p className="mt-4 text-lg text-gray-600">Have questions? We&apos;d love to hear from you.</p>
              <div className="mt-8 space-y-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-green-50 rounded-xl flex items-center justify-center">
                    <Phone className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Phone</p>
                    <p className="font-medium text-gray-900">+91 98765 43210</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-green-50 rounded-xl flex items-center justify-center">
                    <Mail className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Email</p>
                    <p className="font-medium text-gray-900">hello@gymos.demo</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-green-50 rounded-xl flex items-center justify-center">
                    <MapPin className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Address</p>
                    <p className="font-medium text-gray-900">Quenoxa Global Technologies, Bangalore, India</p>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <form onSubmit={handleContactSubmit} className="bg-[#F5F8F6] rounded-2xl p-8 space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Your Name *</label>
                    <input type="text" value={contactForm.name} onChange={e => setContactForm(p => ({...p, name: e.target.value}))} className={`w-full px-4 py-2.5 rounded-lg border ${contactErrors.name ? 'border-red-400' : 'border-gray-200'} focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 bg-white`} placeholder="John Doe" />
                    {contactErrors.name && <p className="text-xs text-red-500 mt-1">{contactErrors.name}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Gym Name</label>
                    <input type="text" value={contactForm.gymName} onChange={e => setContactForm(p => ({...p, gymName: e.target.value}))} className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 bg-white" placeholder="Your Gym" />
                  </div>
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
                    <input type="email" value={contactForm.email} onChange={e => setContactForm(p => ({...p, email: e.target.value}))} className={`w-full px-4 py-2.5 rounded-lg border ${contactErrors.email ? 'border-red-400' : 'border-gray-200'} focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 bg-white`} placeholder="you@email.com" />
                    {contactErrors.email && <p className="text-xs text-red-500 mt-1">{contactErrors.email}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Phone *</label>
                    <input type="tel" value={contactForm.phone} onChange={e => setContactForm(p => ({...p, phone: e.target.value}))} className={`w-full px-4 py-2.5 rounded-lg border ${contactErrors.phone ? 'border-red-400' : 'border-gray-200'} focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 bg-white`} placeholder="+91 98765 43210" />
                    {contactErrors.phone && <p className="text-xs text-red-500 mt-1">{contactErrors.phone}</p>}
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Number of Members</label>
                  <input type="text" value={contactForm.members} onChange={e => setContactForm(p => ({...p, members: e.target.value}))} className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 bg-white" placeholder="Approx. 100" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Message *</label>
                  <textarea rows={4} value={contactForm.message} onChange={e => setContactForm(p => ({...p, message: e.target.value}))} className={`w-full px-4 py-2.5 rounded-lg border ${contactErrors.message ? 'border-red-400' : 'border-gray-200'} focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 bg-white resize-none`} placeholder="Tell us about your gym..." />
                  {contactErrors.message && <p className="text-xs text-red-500 mt-1">{contactErrors.message}</p>}
                </div>
                <button type="submit" className="w-full flex items-center justify-center gap-2 py-3 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition-colors">
                  <Send className="w-4 h-4" /> Send Enquiry
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#090D0B] text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-9 h-9 bg-green-600 rounded-lg flex items-center justify-center">
                  <Dumbbell className="w-5 h-5 text-white" />
                </div>
                <span className="font-bold text-xl">GymOS</span>
              </div>
              <p className="text-sm text-gray-400 leading-relaxed">One Platform. Every Gym. Complete Control.</p>
              <p className="text-xs text-gray-500 mt-4">A product by Quenoxa Global Technologies</p>
            </div>
            <div>
              <h4 className="font-semibold mb-4 text-gray-200">Product</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#features" className="hover:text-green-400 transition-colors">Features</a></li>
                <li><a href="#pricing" className="hover:text-green-400 transition-colors">Pricing</a></li>
                <li><Link href="/login" className="hover:text-green-400 transition-colors">Login</Link></li>
                <li><Link href="/login" className="hover:text-green-400 transition-colors">Register</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4 text-gray-200">Company</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#about" className="hover:text-green-400 transition-colors">About Us</a></li>
                <li><a href="#contact" className="hover:text-green-400 transition-colors">Contact</a></li>
                <li><a href="#" className="hover:text-green-400 transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-green-400 transition-colors">Terms of Service</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4 text-gray-200">Contact</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>hello@gymos.demo</li>
                <li>+91 98765 43210</li>
                <li>Bangalore, India</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-10 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-sm text-gray-500">© 2024 GymOS by Quenoxa Global Technologies. All rights reserved.</p>
            <p className="text-xs text-gray-600">This is a demo application.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
