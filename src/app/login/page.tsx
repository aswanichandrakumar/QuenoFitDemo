'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth, getRolePath } from '@/lib/auth';
import { useToast } from '@/lib/toast';
import { Dumbbell, Eye, EyeOff, Mail, Lock, ArrowRight, Users, Shield, UserCheck, User } from 'lucide-react';

const DEMO_ACCOUNTS = [
  { role: 'Super Admin', email: 'admin@gymos.demo', icon: Shield, color: 'bg-purple-50 text-purple-700 border-purple-200 hover:bg-purple-100' },
  { role: 'Gym Admin', email: 'owner@gymos.demo', icon: Users, color: 'bg-blue-50 text-blue-700 border-blue-200 hover:bg-blue-100' },
  { role: 'Trainer', email: 'trainer@gymos.demo', icon: UserCheck, color: 'bg-orange-50 text-orange-700 border-orange-200 hover:bg-orange-100' },
  { role: 'Member', email: 'member@gymos.demo', icon: User, color: 'bg-green-50 text-green-700 border-green-200 hover:bg-green-100' },
];

export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuth();
  const { addToast } = useToast();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!email.trim()) errs.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(email)) errs.email = 'Invalid email address';
    if (!password.trim()) errs.password = 'Password is required';
    else if (password.length < 6) errs.password = 'Password must be at least 6 characters';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setIsLoading(true);
    try {
      const success = await login(email, password);
      if (success) {
        addToast('Login successful! Redirecting...', 'success');
        const stored = localStorage.getItem('gymos_user');
        if (stored) {
          const user = JSON.parse(stored);
          setTimeout(() => router.push(getRolePath(user.role)), 500);
        }
      } else {
        addToast('Invalid credentials. Use Demo@123 as password.', 'error');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleDemoLogin = async (demoEmail: string) => {
    setEmail(demoEmail);
    setPassword('Demo@123');
    setIsLoading(true);
    try {
      const success = await login(demoEmail, 'Demo@123');
      if (success) {
        addToast('Login successful! Redirecting...', 'success');
        const stored = localStorage.getItem('gymos_user');
        if (stored) {
          const user = JSON.parse(stored);
          setTimeout(() => router.push(getRolePath(user.role)), 500);
        }
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Panel - Branding */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-[#064E3B] to-[#090D0B] text-white flex-col justify-between p-12">
        <div>
          <Link href="/" className="flex items-center gap-3">
            <div className="w-10 h-10 bg-green-500 rounded-xl flex items-center justify-center">
              <Dumbbell className="w-6 h-6 text-white" />
            </div>
            <span className="font-bold text-2xl">GymOS</span>
          </Link>
        </div>
        <div>
          <h1 className="text-4xl font-bold leading-tight">
            One Platform.<br />
            Every Gym.<br />
            <span className="text-green-400">Complete Control.</span>
          </h1>
          <p className="mt-6 text-lg text-green-200/80 max-w-md">
            Manage memberships, payments, attendance, trainers and fitness operations — all from one powerful dashboard.
          </p>
          <div className="mt-10 grid grid-cols-2 gap-4">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
              <p className="text-2xl font-bold text-green-300">8+</p>
              <p className="text-sm text-green-200/70">Gyms Managed</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
              <p className="text-2xl font-bold text-green-300">1,310+</p>
              <p className="text-sm text-green-200/70">Active Members</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
              <p className="text-2xl font-bold text-green-300">60+</p>
              <p className="text-sm text-green-200/70">Trainers</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
              <p className="text-2xl font-bold text-green-300">99.9%</p>
              <p className="text-sm text-green-200/70">Uptime</p>
            </div>
          </div>
        </div>
        <p className="text-sm text-green-200/50">© 2024 Quenoxa Global Technologies</p>
      </div>

      {/* Right Panel - Login Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 bg-[#F5F8F6]">
        <div className="w-full max-w-md">
          {/* Mobile Logo */}
          <div className="lg:hidden mb-8 text-center">
            <Link href="/" className="inline-flex items-center gap-2">
              <div className="w-10 h-10 bg-green-600 rounded-xl flex items-center justify-center">
                <Dumbbell className="w-6 h-6 text-white" />
              </div>
              <span className="font-bold text-2xl text-gray-900">GymOS</span>
            </Link>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
            <h2 className="text-2xl font-bold text-gray-900 text-center">Welcome Back</h2>
            <p className="text-sm text-gray-500 text-center mt-2">Sign in to your GymOS account</p>

            <form onSubmit={handleSubmit} className="mt-8 space-y-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    className={`w-full pl-11 pr-4 py-3 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 ${errors.email ? 'border-red-400' : 'border-gray-200'}`}
                    placeholder="you@example.com"
                  />
                </div>
                {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Password</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    className={`w-full pl-11 pr-11 py-3 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 ${errors.password ? 'border-red-400' : 'border-gray-200'}`}
                    placeholder="Enter your password"
                  />
                  <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
                {errors.password && <p className="text-xs text-red-500 mt-1">{errors.password}</p>}
              </div>

              <div className="flex items-center justify-between">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" checked={rememberMe} onChange={e => setRememberMe(e.target.checked)} className="w-4 h-4 rounded border-gray-300 text-green-600 focus:ring-green-500" />
                  <span className="text-sm text-gray-600">Remember me</span>
                </label>
                <button type="button" onClick={() => addToast('Password reset is not available in demo mode.', 'info')} className="text-sm text-green-600 hover:text-green-700 font-medium">
                  Forgot Password?
                </button>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full flex items-center justify-center gap-2 py-3 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {isLoading ? (
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <>Sign In <ArrowRight className="w-4 h-4" /></>
                )}
              </button>
            </form>
          </div>

          {/* Demo Accounts */}
          <div className="mt-6 bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-sm font-semibold text-gray-700 text-center mb-4">Quick Demo Login</h3>
            <div className="grid grid-cols-2 gap-3">
              {DEMO_ACCOUNTS.map((acc) => (
                <button
                  key={acc.email}
                  onClick={() => handleDemoLogin(acc.email)}
                  disabled={isLoading}
                  className={`flex items-center gap-2 px-3 py-2.5 rounded-lg border text-sm font-medium transition-colors disabled:opacity-50 ${acc.color}`}
                >
                  <acc.icon className="w-4 h-4" />
                  {acc.role}
                </button>
              ))}
            </div>
            <p className="text-xs text-gray-400 text-center mt-4">Password for all demo accounts: <code className="bg-gray-100 px-1.5 py-0.5 rounded">Demo@123</code></p>
          </div>

          <p className="text-center text-xs text-gray-400 mt-6">
            <Link href="/" className="text-green-600 hover:text-green-700">← Back to Home</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
