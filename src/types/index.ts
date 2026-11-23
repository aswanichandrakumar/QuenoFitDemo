// GymOS Type Definitions

export type UserRole = 'super-admin' | 'gym-admin' | 'trainer' | 'member';

export interface User {
  id: string;
  email: string;
  password: string;
  name: string;
  role: UserRole;
  avatar?: string;
  gymId?: string;
  phone?: string;
  status: 'active' | 'inactive' | 'suspended';
  createdAt: string;
}

export interface Gym {
  id: string;
  name: string;
  owner: string;
  ownerId: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  status: 'active' | 'pending' | 'suspended';
  memberCount: number;
  trainerCount: number;
  plan: 'basic' | 'professional' | 'enterprise';
  registeredAt: string;
  logoUrl?: string;
  branches: Branch[];
}

export interface Branch {
  id: string;
  gymId: string;
  name: string;
  address: string;
  city: string;
  phone: string;
  managerName: string;
  memberCount: number;
  status: 'active' | 'inactive';
}

export interface Member {
  id: string;
  memberId: string;
  gymId: string;
  branchId?: string;
  name: string;
  email: string;
  phone: string;
  gender: 'male' | 'female' | 'other';
  dateOfBirth: string;
  address: string;
  joiningDate: string;
  membershipPlan: string;
  membershipStart: string;
  membershipExpiry: string;
  assignedTrainer: string;
  assignedTrainerId: string;
  status: 'active' | 'expired' | 'frozen' | 'cancelled';
  weight?: number;
  height?: number;
  bmi?: number;
  fitnessGoal?: string;
  avatar?: string;
  emergencyContact?: string;
}

export interface MembershipPlan {
  id: string;
  gymId: string;
  name: string;
  duration: number; // months
  price: number;
  features: string[];
  status: 'active' | 'inactive';
  memberCount: number;
}

export interface Payment {
  id: string;
  paymentId: string;
  gymId: string;
  memberId: string;
  memberName: string;
  amount: number;
  date: string;
  method: 'cash' | 'card' | 'upi' | 'bank_transfer' | 'online';
  status: 'completed' | 'pending' | 'failed' | 'refunded';
  description: string;
  invoiceNumber: string;
}

export interface Attendance {
  id: string;
  gymId: string;
  memberId: string;
  memberName: string;
  date: string;
  checkIn: string;
  checkOut?: string;
  method: 'qr' | 'manual';
}

export interface Trainer {
  id: string;
  gymId: string;
  name: string;
  email: string;
  phone: string;
  specialization: string;
  experience: number; // years
  assignedMembers: number;
  rating: number;
  status: 'active' | 'inactive';
  joiningDate: string;
  salary: number;
  avatar?: string;
  certifications: string[];
  schedule?: TrainerSchedule[];
}

export interface TrainerSchedule {
  id: string;
  day: string;
  startTime: string;
  endTime: string;
  memberName: string;
  memberId: string;
  sessionType: string;
}

export interface WorkoutPlan {
  id: string;
  gymId: string;
  name: string;
  trainerId: string;
  trainerName: string;
  memberId: string;
  memberName: string;
  exercises: Exercise[];
  createdAt: string;
  status: 'active' | 'completed' | 'paused';
}

export interface Exercise {
  id: string;
  name: string;
  sets: number;
  reps: number;
  duration?: string;
  restTime?: string;
  category: string;
  notes?: string;
  completed?: boolean;
}

export interface DietPlan {
  id: string;
  gymId: string;
  memberId: string;
  memberName: string;
  trainerId: string;
  trainerName: string;
  meals: Meal[];
  totalCalories: number;
  createdAt: string;
  status: 'active' | 'paused';
}

export interface Meal {
  id: string;
  name: string;
  time: string;
  foods: FoodItem[];
  totalCalories: number;
}

export interface FoodItem {
  name: string;
  quantity: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
}

export interface GymClass {
  id: string;
  gymId: string;
  name: string;
  trainerId: string;
  trainerName: string;
  schedule: string;
  time: string;
  duration: number; // minutes
  capacity: number;
  enrolled: number;
  status: 'active' | 'cancelled' | 'completed';
  category: string;
}

export interface Assessment {
  id: string;
  memberId: string;
  memberName: string;
  trainerId: string;
  date: string;
  weight: number;
  height: number;
  bmi: number;
  bodyFat?: number;
  chest?: number;
  waist?: number;
  hips?: number;
  biceps?: number;
  thighs?: number;
  fitnessGoal: string;
  notes: string;
}

export interface SupportTicket {
  id: string;
  gymId?: string;
  userId: string;
  userName: string;
  subject: string;
  message: string;
  status: 'open' | 'in-progress' | 'resolved' | 'closed';
  priority: 'low' | 'medium' | 'high';
  createdAt: string;
  updatedAt: string;
}

export interface Notification {
  id: string;
  userId?: string;
  gymId?: string;
  title: string;
  message: string;
  type: 'info' | 'warning' | 'success' | 'error';
  read: boolean;
  createdAt: string;
}

export interface WhatsAppTemplate {
  id: string;
  gymId: string;
  name: string;
  category: 'renewal' | 'payment' | 'welcome' | 'announcement' | 'birthday' | 'custom';
  message: string;
  status: 'active' | 'inactive';
  sentCount: number;
  lastSent?: string;
}

export interface AuditLog {
  id: string;
  userId: string;
  userName: string;
  action: string;
  details: string;
  timestamp: string;
  ipAddress: string;
}

export interface Subscription {
  id: string;
  gymId: string;
  gymName: string;
  plan: 'basic' | 'professional' | 'enterprise';
  status: 'active' | 'expired' | 'cancelled';
  startDate: string;
  endDate: string;
  amount: number;
  autoRenew: boolean;
}

export interface DashboardStats {
  label: string;
  value: string | number;
  change?: number;
  changeLabel?: string;
  icon: string;
  color: string;
}

export interface ChartData {
  name: string;
  value: number;
  [key: string]: string | number;
}

export interface ProgressRecord {
  id: string;
  memberId: string;
  date: string;
  weight: number;
  bmi: number;
  bodyFat?: number;
  notes?: string;
}
