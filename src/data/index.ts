import type { Gym, Member, Trainer, MembershipPlan, Payment, Attendance, WorkoutPlan, DietPlan, GymClass, Assessment, WhatsAppTemplate, AuditLog, Subscription, SupportTicket, Notification, ProgressRecord } from '@/types';

// ==================== GYMS ====================
export const gyms: Gym[] = [
  { id: 'gym-001', name: 'FitZone Premium', owner: 'Priya Sharma', ownerId: 'ga-001', email: 'priya@fitzone.com', phone: '+91 98765 11111', address: '45 MG Road, Indiranagar', city: 'Bangalore', state: 'Karnataka', status: 'active', memberCount: 245, trainerCount: 8, plan: 'enterprise', registeredAt: '2024-02-15', branches: [
    { id: 'br-001', gymId: 'gym-001', name: 'FitZone Indiranagar', address: '45 MG Road', city: 'Bangalore', phone: '+91 98765 11112', managerName: 'Rahul Mehra', memberCount: 145, status: 'active' },
    { id: 'br-002', gymId: 'gym-001', name: 'FitZone Koramangala', address: '12 80 Feet Road', city: 'Bangalore', phone: '+91 98765 11113', managerName: 'Sneha Das', memberCount: 100, status: 'active' },
  ]},
  { id: 'gym-002', name: 'Iron Paradise', owner: 'Vikram Singh', ownerId: 'ga-002', email: 'vikram@ironparadise.com', phone: '+91 98765 22222', address: '78 Linking Road, Bandra', city: 'Mumbai', state: 'Maharashtra', status: 'active', memberCount: 320, trainerCount: 12, plan: 'enterprise', registeredAt: '2024-01-20', branches: [
    { id: 'br-003', gymId: 'gym-002', name: 'Iron Paradise Bandra', address: '78 Linking Road', city: 'Mumbai', phone: '+91 98765 22223', managerName: 'Aarav Joshi', memberCount: 180, status: 'active' },
    { id: 'br-004', gymId: 'gym-002', name: 'Iron Paradise Andheri', address: '34 Lokhandwala', city: 'Mumbai', phone: '+91 98765 22224', managerName: 'Meera Nair', memberCount: 140, status: 'active' },
  ]},
  { id: 'gym-003', name: 'PowerHouse Gym', owner: 'Anil Kapoor', ownerId: 'ga-003', email: 'anil@powerhouse.com', phone: '+91 98765 33333', address: '23 Connaught Place', city: 'Delhi', state: 'Delhi', status: 'active', memberCount: 180, trainerCount: 6, plan: 'professional', registeredAt: '2024-03-10', branches: [
    { id: 'br-005', gymId: 'gym-003', name: 'PowerHouse CP', address: '23 Connaught Place', city: 'Delhi', phone: '+91 98765 33334', managerName: 'Rohit Verma', memberCount: 180, status: 'active' },
  ]},
  { id: 'gym-004', name: 'Flex Fitness Studio', owner: 'Neha Gupta', ownerId: 'ga-004', email: 'neha@flexfitness.com', phone: '+91 98765 44444', address: '56 Anna Nagar', city: 'Chennai', state: 'Tamil Nadu', status: 'active', memberCount: 150, trainerCount: 5, plan: 'professional', registeredAt: '2024-04-05', branches: [
    { id: 'br-006', gymId: 'gym-004', name: 'Flex Anna Nagar', address: '56 Anna Nagar', city: 'Chennai', phone: '+91 98765 44445', managerName: 'Karthik Raja', memberCount: 150, status: 'active' },
  ]},
  { id: 'gym-005', name: 'Elite Gym & Spa', owner: 'Deepak Reddy', ownerId: 'ga-005', email: 'deepak@elitegym.com', phone: '+91 98765 55555', address: '89 Jubilee Hills', city: 'Hyderabad', state: 'Telangana', status: 'active', memberCount: 200, trainerCount: 7, plan: 'enterprise', registeredAt: '2024-01-30', branches: [
    { id: 'br-007', gymId: 'gym-005', name: 'Elite Jubilee Hills', address: '89 Jubilee Hills', city: 'Hyderabad', phone: '+91 98765 55556', managerName: 'Sravani Rao', memberCount: 120, status: 'active' },
    { id: 'br-008', gymId: 'gym-005', name: 'Elite Banjara Hills', address: '15 Road No.3', city: 'Hyderabad', phone: '+91 98765 55557', managerName: 'Prasad Kumar', memberCount: 80, status: 'active' },
  ]},
  { id: 'gym-006', name: 'CrossFit Arena', owner: 'Manish Tiwari', ownerId: 'ga-006', email: 'manish@crossfitarena.com', phone: '+91 98765 66666', address: '34 Salt Lake', city: 'Kolkata', state: 'West Bengal', status: 'pending', memberCount: 0, trainerCount: 0, plan: 'basic', registeredAt: '2024-11-15', branches: [] },
  { id: 'gym-007', name: 'Muscle Factory', owner: 'Suresh Menon', ownerId: 'ga-007', email: 'suresh@musclefactory.com', phone: '+91 98765 77777', address: '67 MG Road', city: 'Pune', state: 'Maharashtra', status: 'active', memberCount: 130, trainerCount: 4, plan: 'professional', registeredAt: '2024-05-20', branches: [
    { id: 'br-009', gymId: 'gym-007', name: 'Muscle Factory Pune', address: '67 MG Road', city: 'Pune', phone: '+91 98765 77778', managerName: 'Ajay Kulkarni', memberCount: 130, status: 'active' },
  ]},
  { id: 'gym-008', name: 'Zen Fitness Hub', owner: 'Kavita Jain', ownerId: 'ga-008', email: 'kavita@zenfitness.com', phone: '+91 98765 88888', address: '12 Civil Lines', city: 'Jaipur', state: 'Rajasthan', status: 'suspended', memberCount: 85, trainerCount: 3, plan: 'basic', registeredAt: '2024-06-10', branches: [
    { id: 'br-010', gymId: 'gym-008', name: 'Zen Fitness Jaipur', address: '12 Civil Lines', city: 'Jaipur', phone: '+91 98765 88889', managerName: 'Pooja Sharma', memberCount: 85, status: 'inactive' },
  ]},
];

// ==================== TRAINERS ====================
const trainerNames = ['Arjun Patel','Deepika Nair','Ravi Shankar','Sania Mirza','Kiran Desai','Amit Roy','Nisha Kapoor','Sunil Gavaskar','Priya Pillai','Rahul Dravid','Anita Sharma','Vijay Kumar','Meera Joshi','Sanjay Dutt','Kavya Reddy'];
export const trainers: Trainer[] = trainerNames.map((name, i) => ({
  id: `tr-${String(i + 1).padStart(3, '0')}`,
  gymId: 'gym-001',
  name,
  email: `${name.toLowerCase().replace(' ', '.')}@fitzone.com`,
  phone: `+91 ${98700 + i * 111}${10000 + i * 1111}`,
  specialization: ['Weight Training','Yoga','CrossFit','Cardio','HIIT','Pilates','Boxing','Functional Training'][i % 8],
  experience: 2 + (i % 8),
  assignedMembers: 8 + (i % 12),
  rating: 4 + Math.round(Math.random() * 10) / 10,
  status: i < 13 ? 'active' : 'inactive',
  joiningDate: `2024-0${1 + (i % 9)}-${10 + (i % 20)}`,
  salary: 25000 + i * 2500,
  certifications: [['ACE Certified','CPR/AED'],['NSCA-CPT','Sports Nutrition'],['CrossFit L2','Kettlebell'],['Yoga Alliance RYT-200','Meditation'],['ISSA CPT','Corrective Exercise']][i % 5],
}));

// ==================== MEMBERS ====================
const firstNames = ['Ananya','Rohan','Kavya','Arjun','Diya','Sahil','Ishita','Varun','Meera','Aditya','Pooja','Nikhil','Shreya','Rahul','Tanvi','Kunal','Riya','Mohit','Neha','Siddharth','Priyanka','Akash','Divya','Harsh','Sakshi','Vikas','Ankita','Gaurav','Ritika','Amit','Bhavna','Deepak','Ekta','Farhan','Geeta','Hitesh','Isha','Jay','Kritika','Lalit','Manisha','Neeraj','Pallavi','Qasim','Rashmi','Sandeep','Tara','Umesh','Vandana','Yash'];
const lastNames = ['Verma','Singh','Sharma','Kumar','Patel','Gupta','Reddy','Joshi','Nair','Das','Mehta','Kapoor','Pillai','Rao','Iyer','Chopra','Malhotra','Saxena','Bhat','Agarwal'];

function generateMembers(): Member[] {
  const members: Member[] = [];
  const plans = ['Monthly Plan','Quarterly Plan','Half-Yearly Plan','Annual Plan'];
  const goals = ['Weight Loss','Muscle Gain','General Fitness','Endurance','Flexibility','Body Recomposition'];
  for (let i = 0; i < 155; i++) {
    const fn = firstNames[i % firstNames.length];
    const ln = lastNames[i % lastNames.length];
    const name = `${fn} ${ln}`;
    const gender = i % 3 === 0 ? 'female' : i % 3 === 1 ? 'male' : 'male';
    const planIdx = i % 4;
    const trainerIdx = i % trainers.length;
    const monthOffset = i % 12;
    const startMonth = 1 + monthOffset;
    const startDate = `2024-${String(startMonth).padStart(2, '0')}-${String(1 + (i % 28)).padStart(2, '0')}`;
    const durations = [1, 3, 6, 12];
    const endMonth = startMonth + durations[planIdx];
    const endYear = endMonth > 12 ? 2025 : 2024;
    const expiryDate = `${endYear}-${String(((endMonth - 1) % 12) + 1).padStart(2, '0')}-${String(1 + (i % 28)).padStart(2, '0')}`;
    const weight = 55 + (i % 40);
    const height = 155 + (i % 35);
    const bmi = Math.round((weight / ((height / 100) ** 2)) * 10) / 10;
    const statusOptions: Member['status'][] = ['active', 'active', 'active', 'expired', 'active', 'frozen'];
    members.push({
      id: `mb-${String(i + 1).padStart(3, '0')}`,
      memberId: `FZ-${String(2024000 + i + 1)}`,
      gymId: 'gym-001',
      name,
      email: `${fn.toLowerCase()}.${ln.toLowerCase()}@email.com`,
      phone: `+91 ${97000 + i}${10000 + i}`,
      gender,
      dateOfBirth: `${1988 + (i % 15)}-${String(1 + (i % 12)).padStart(2, '0')}-${String(1 + (i % 28)).padStart(2, '0')}`,
      address: `${10 + i}, Sector ${1 + (i % 50)}, Bangalore`,
      joiningDate: startDate,
      membershipPlan: plans[planIdx],
      membershipStart: startDate,
      membershipExpiry: expiryDate,
      assignedTrainer: trainers[trainerIdx].name,
      assignedTrainerId: trainers[trainerIdx].id,
      status: statusOptions[i % statusOptions.length],
      weight,
      height,
      bmi,
      fitnessGoal: goals[i % goals.length],
    });
  }
  return members;
}
export const members: Member[] = generateMembers();

// ==================== MEMBERSHIP PLANS ====================
export const membershipPlans: MembershipPlan[] = [
  { id: 'plan-001', gymId: 'gym-001', name: 'Monthly Plan', duration: 1, price: 2000, features: ['Full Gym Access','Locker Room','Basic Equipment','Group Classes'], status: 'active', memberCount: 45 },
  { id: 'plan-002', gymId: 'gym-001', name: 'Quarterly Plan', duration: 3, price: 5000, features: ['Full Gym Access','Locker Room','All Equipment','Group Classes','1 PT Session/Week'], status: 'active', memberCount: 38 },
  { id: 'plan-003', gymId: 'gym-001', name: 'Half-Yearly Plan', duration: 6, price: 8500, features: ['Full Gym Access','Locker Room','All Equipment','Unlimited Classes','2 PT Sessions/Week','Diet Consultation'], status: 'active', memberCount: 42 },
  { id: 'plan-004', gymId: 'gym-001', name: 'Annual Plan', duration: 12, price: 15000, features: ['Full Gym Access','Premium Locker','All Equipment','Unlimited Classes','3 PT Sessions/Week','Diet Plan','Body Assessment','Sauna Access'], status: 'active', memberCount: 30 },
];

// ==================== PAYMENTS ====================
function generatePayments(): Payment[] {
  const payments: Payment[] = [];
  const methods: Payment['method'][] = ['cash','card','upi','bank_transfer','online'];
  const statuses: Payment['status'][] = ['completed','completed','completed','pending','completed','completed'];
  for (let i = 0; i < 200; i++) {
    const member = members[i % members.length];
    const month = 1 + (i % 12);
    payments.push({
      id: `pay-${String(i + 1).padStart(3, '0')}`,
      paymentId: `PAY-${String(2024000 + i + 1)}`,
      gymId: 'gym-001',
      memberId: member.id,
      memberName: member.name,
      amount: [2000, 5000, 8500, 15000][i % 4],
      date: `2024-${String(month).padStart(2, '0')}-${String(1 + (i % 28)).padStart(2, '0')}`,
      method: methods[i % methods.length],
      status: statuses[i % statuses.length],
      description: `${member.membershipPlan} - ${['New','Renewal','Renewal','New'][i % 4]}`,
      invoiceNumber: `INV-${String(2024000 + i + 1)}`,
    });
  }
  return payments;
}
export const payments: Payment[] = generatePayments();

// ==================== ATTENDANCE ====================
function generateAttendance(): Attendance[] {
  const records: Attendance[] = [];
  for (let i = 0; i < 500; i++) {
    const member = members[i % members.length];
    const day = 1 + (i % 28);
    const month = 1 + (i % 12);
    const checkInHour = 5 + (i % 14);
    records.push({
      id: `att-${String(i + 1).padStart(4, '0')}`,
      gymId: 'gym-001',
      memberId: member.id,
      memberName: member.name,
      date: `2024-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`,
      checkIn: `${String(checkInHour).padStart(2, '0')}:${String((i * 7) % 60).padStart(2, '0')}`,
      checkOut: `${String(checkInHour + 1 + (i % 2)).padStart(2, '0')}:${String((i * 11) % 60).padStart(2, '0')}`,
      method: i % 3 === 0 ? 'manual' : 'qr',
    });
  }
  return records;
}
export const attendance: Attendance[] = generateAttendance();

// ==================== WORKOUT PLANS ====================
export const workoutPlans: WorkoutPlan[] = [
  {
    id: 'wp-001', gymId: 'gym-001', name: 'Beginner Full Body', trainerId: 'tr-001', trainerName: 'Arjun Patel', memberId: 'mb-001', memberName: 'Ananya Verma', createdAt: '2024-10-01', status: 'active',
    exercises: [
      { id: 'ex-001', name: 'Squats', sets: 3, reps: 12, duration: '10 min', category: 'Legs', completed: false },
      { id: 'ex-002', name: 'Push-ups', sets: 3, reps: 10, duration: '8 min', category: 'Chest', completed: false },
      { id: 'ex-003', name: 'Lat Pulldown', sets: 3, reps: 12, duration: '10 min', category: 'Back', completed: true },
      { id: 'ex-004', name: 'Dumbbell Shoulder Press', sets: 3, reps: 10, duration: '8 min', category: 'Shoulders', completed: false },
      { id: 'ex-005', name: 'Plank', sets: 3, reps: 1, duration: '3 min', category: 'Core', completed: true },
      { id: 'ex-006', name: 'Bicep Curls', sets: 3, reps: 12, duration: '8 min', category: 'Arms', completed: false },
    ],
  },
  {
    id: 'wp-002', gymId: 'gym-001', name: 'Intermediate Push Pull', trainerId: 'tr-001', trainerName: 'Arjun Patel', memberId: 'mb-002', memberName: 'Rohan Singh', createdAt: '2024-10-05', status: 'active',
    exercises: [
      { id: 'ex-007', name: 'Bench Press', sets: 4, reps: 10, duration: '12 min', category: 'Chest', completed: false },
      { id: 'ex-008', name: 'Deadlift', sets: 4, reps: 8, duration: '15 min', category: 'Back', completed: false },
      { id: 'ex-009', name: 'Overhead Press', sets: 3, reps: 10, duration: '10 min', category: 'Shoulders', completed: false },
      { id: 'ex-010', name: 'Barbell Rows', sets: 4, reps: 10, duration: '12 min', category: 'Back', completed: true },
      { id: 'ex-011', name: 'Leg Press', sets: 4, reps: 12, duration: '12 min', category: 'Legs', completed: false },
    ],
  },
  {
    id: 'wp-003', gymId: 'gym-001', name: 'Fat Burn HIIT', trainerId: 'tr-002', trainerName: 'Deepika Nair', memberId: 'mb-003', memberName: 'Kavya Sharma', createdAt: '2024-10-08', status: 'active',
    exercises: [
      { id: 'ex-012', name: 'Burpees', sets: 4, reps: 15, duration: '5 min', category: 'Full Body', completed: false },
      { id: 'ex-013', name: 'Mountain Climbers', sets: 4, reps: 20, duration: '5 min', category: 'Core', completed: false },
      { id: 'ex-014', name: 'Jump Squats', sets: 4, reps: 15, duration: '5 min', category: 'Legs', completed: true },
      { id: 'ex-015', name: 'Box Jumps', sets: 3, reps: 12, duration: '5 min', category: 'Legs', completed: false },
      { id: 'ex-016', name: 'Battle Ropes', sets: 4, reps: 1, duration: '8 min', category: 'Full Body', completed: false },
    ],
  },
  {
    id: 'wp-004', gymId: 'gym-001', name: 'Strength Program', trainerId: 'tr-003', trainerName: 'Ravi Shankar', memberId: 'mb-004', memberName: 'Arjun Kumar', createdAt: '2024-10-12', status: 'active',
    exercises: [
      { id: 'ex-017', name: 'Back Squat', sets: 5, reps: 5, duration: '15 min', category: 'Legs', completed: false },
      { id: 'ex-018', name: 'Bench Press', sets: 5, reps: 5, duration: '15 min', category: 'Chest', completed: false },
      { id: 'ex-019', name: 'Deadlift', sets: 5, reps: 3, duration: '15 min', category: 'Back', completed: false },
      { id: 'ex-020', name: 'Pull-ups', sets: 4, reps: 8, duration: '10 min', category: 'Back', completed: false },
    ],
  },
];

// ==================== DIET PLANS ====================
export const dietPlans: DietPlan[] = [
  {
    id: 'dp-001', gymId: 'gym-001', memberId: 'mb-001', memberName: 'Ananya Verma', trainerId: 'tr-001', trainerName: 'Arjun Patel', totalCalories: 1800, createdAt: '2024-10-01', status: 'active',
    meals: [
      { id: 'meal-001', name: 'Breakfast', time: '07:30', totalCalories: 450, foods: [
        { name: 'Oats with Milk', quantity: '1 bowl', calories: 250, protein: 10, carbs: 40, fat: 6 },
        { name: 'Banana', quantity: '1', calories: 100, protein: 1, carbs: 27, fat: 0 },
        { name: 'Almonds', quantity: '10 pcs', calories: 100, protein: 4, carbs: 3, fat: 9 },
      ]},
      { id: 'meal-002', name: 'Mid-Morning Snack', time: '10:30', totalCalories: 200, foods: [
        { name: 'Protein Shake', quantity: '1 glass', calories: 150, protein: 25, carbs: 5, fat: 3 },
        { name: 'Apple', quantity: '1', calories: 50, protein: 0, carbs: 14, fat: 0 },
      ]},
      { id: 'meal-003', name: 'Lunch', time: '13:00', totalCalories: 550, foods: [
        { name: 'Brown Rice', quantity: '1 cup', calories: 200, protein: 5, carbs: 45, fat: 2 },
        { name: 'Grilled Chicken', quantity: '150g', calories: 250, protein: 40, carbs: 0, fat: 8 },
        { name: 'Mixed Salad', quantity: '1 bowl', calories: 100, protein: 3, carbs: 15, fat: 4 },
      ]},
      { id: 'meal-004', name: 'Evening Snack', time: '17:00', totalCalories: 200, foods: [
        { name: 'Greek Yogurt', quantity: '1 cup', calories: 130, protein: 15, carbs: 8, fat: 5 },
        { name: 'Mixed Nuts', quantity: '30g', calories: 70, protein: 3, carbs: 3, fat: 6 },
      ]},
      { id: 'meal-005', name: 'Dinner', time: '20:00', totalCalories: 400, foods: [
        { name: 'Chapati', quantity: '2', calories: 150, protein: 5, carbs: 30, fat: 3 },
        { name: 'Paneer Curry', quantity: '150g', calories: 200, protein: 15, carbs: 8, fat: 14 },
        { name: 'Cucumber Raita', quantity: '1 bowl', calories: 50, protein: 3, carbs: 5, fat: 2 },
      ]},
    ],
  },
];

// ==================== CLASSES ====================
export const gymClasses: GymClass[] = [
  { id: 'cls-001', gymId: 'gym-001', name: 'Morning Yoga', trainerId: 'tr-002', trainerName: 'Deepika Nair', schedule: 'Mon, Wed, Fri', time: '06:00', duration: 60, capacity: 20, enrolled: 15, status: 'active', category: 'Yoga' },
  { id: 'cls-002', gymId: 'gym-001', name: 'HIIT Blast', trainerId: 'tr-003', trainerName: 'Ravi Shankar', schedule: 'Tue, Thu', time: '07:00', duration: 45, capacity: 15, enrolled: 12, status: 'active', category: 'HIIT' },
  { id: 'cls-003', gymId: 'gym-001', name: 'Spin Class', trainerId: 'tr-004', trainerName: 'Sania Mirza', schedule: 'Mon, Wed, Fri', time: '08:00', duration: 45, capacity: 25, enrolled: 22, status: 'active', category: 'Cardio' },
  { id: 'cls-004', gymId: 'gym-001', name: 'Boxing Fundamentals', trainerId: 'tr-007', trainerName: 'Nisha Kapoor', schedule: 'Tue, Thu, Sat', time: '17:00', duration: 60, capacity: 12, enrolled: 10, status: 'active', category: 'Boxing' },
  { id: 'cls-005', gymId: 'gym-001', name: 'Pilates', trainerId: 'tr-006', trainerName: 'Amit Roy', schedule: 'Mon, Wed', time: '09:00', duration: 50, capacity: 15, enrolled: 8, status: 'active', category: 'Pilates' },
  { id: 'cls-006', gymId: 'gym-001', name: 'CrossFit', trainerId: 'tr-005', trainerName: 'Kiran Desai', schedule: 'Mon, Wed, Fri', time: '18:00', duration: 60, capacity: 15, enrolled: 14, status: 'active', category: 'CrossFit' },
  { id: 'cls-007', gymId: 'gym-001', name: 'Zumba Dance', trainerId: 'tr-009', trainerName: 'Priya Pillai', schedule: 'Tue, Thu, Sat', time: '19:00', duration: 45, capacity: 30, enrolled: 25, status: 'active', category: 'Dance' },
  { id: 'cls-008', gymId: 'gym-001', name: 'Strength Training', trainerId: 'tr-001', trainerName: 'Arjun Patel', schedule: 'Mon-Sat', time: '16:00', duration: 60, capacity: 10, enrolled: 8, status: 'active', category: 'Strength' },
];

// ==================== ASSESSMENTS ====================
export const assessments: Assessment[] = [
  { id: 'as-001', memberId: 'mb-001', memberName: 'Ananya Verma', trainerId: 'tr-001', date: '2024-10-01', weight: 62, height: 165, bmi: 22.8, bodyFat: 24, chest: 86, waist: 68, hips: 94, biceps: 28, thighs: 54, fitnessGoal: 'Weight Loss', notes: 'Good overall fitness. Focus on cardio and core.' },
  { id: 'as-002', memberId: 'mb-001', memberName: 'Ananya Verma', trainerId: 'tr-001', date: '2024-11-01', weight: 60.5, height: 165, bmi: 22.2, bodyFat: 22.5, chest: 85, waist: 66, hips: 93, biceps: 28.5, thighs: 53, fitnessGoal: 'Weight Loss', notes: 'Good progress. Lost 1.5 kg. Continue current plan.' },
  { id: 'as-003', memberId: 'mb-002', memberName: 'Rohan Singh', trainerId: 'tr-001', date: '2024-10-05', weight: 78, height: 178, bmi: 24.6, bodyFat: 18, chest: 102, waist: 84, hips: 96, biceps: 36, thighs: 60, fitnessGoal: 'Muscle Gain', notes: 'Strong base. Increase protein intake and progressive overload.' },
];

// ==================== WHATSAPP TEMPLATES ====================
export const whatsappTemplates: WhatsAppTemplate[] = [
  { id: 'wa-001', gymId: 'gym-001', name: 'Membership Renewal Reminder', category: 'renewal', message: 'Hi {{name}}, your membership at FitZone Premium expires on {{expiry_date}}. Renew now to continue your fitness journey! 💪', status: 'active', sentCount: 234, lastSent: '2024-11-20' },
  { id: 'wa-002', gymId: 'gym-001', name: 'Payment Due Reminder', category: 'payment', message: 'Dear {{name}}, your payment of ₹{{amount}} is due. Please clear your dues at the earliest. Thank you! 🏋️', status: 'active', sentCount: 156, lastSent: '2024-11-19' },
  { id: 'wa-003', gymId: 'gym-001', name: 'Welcome New Member', category: 'welcome', message: 'Welcome to FitZone Premium, {{name}}! 🎉 Your fitness journey starts now. Your trainer {{trainer}} is excited to work with you!', status: 'active', sentCount: 89, lastSent: '2024-11-18' },
  { id: 'wa-004', gymId: 'gym-001', name: 'Gym Announcement', category: 'announcement', message: 'Dear Members, {{message}}. Stay fit, stay healthy! 🏋️‍♂️ - FitZone Premium', status: 'active', sentCount: 450, lastSent: '2024-11-15' },
  { id: 'wa-005', gymId: 'gym-001', name: 'Birthday Wishes', category: 'birthday', message: 'Happy Birthday, {{name}}! 🎂🎉 Wishing you health and happiness. Enjoy a complimentary smoothie today at FitZone! 🥤', status: 'active', sentCount: 67, lastSent: '2024-11-21' },
];

// ==================== SUBSCRIPTIONS ====================
export const subscriptions: Subscription[] = gyms.map((gym, i) => ({
  id: `sub-${String(i + 1).padStart(3, '0')}`,
  gymId: gym.id,
  gymName: gym.name,
  plan: gym.plan,
  status: gym.status === 'active' ? 'active' : gym.status === 'suspended' ? 'cancelled' : 'active',
  startDate: gym.registeredAt,
  endDate: `2025-${String(1 + (i % 12)).padStart(2, '0')}-${String(15 + (i % 15)).padStart(2, '0')}`,
  amount: gym.plan === 'enterprise' ? 9999 : gym.plan === 'professional' ? 4999 : 1999,
  autoRenew: gym.status === 'active',
}));

// ==================== AUDIT LOGS ====================
export const auditLogs: AuditLog[] = [
  { id: 'al-001', userId: 'sa-001', userName: 'Rajesh Kumar', action: 'Gym Approved', details: 'Approved gym registration for FitZone Premium', timestamp: '2024-11-21 14:30:00', ipAddress: '192.168.1.100' },
  { id: 'al-002', userId: 'sa-001', userName: 'Rajesh Kumar', action: 'User Created', details: 'Created gym admin account for Priya Sharma', timestamp: '2024-11-21 14:35:00', ipAddress: '192.168.1.100' },
  { id: 'al-003', userId: 'ga-001', userName: 'Priya Sharma', action: 'Member Added', details: 'Added new member Ananya Verma', timestamp: '2024-11-20 10:15:00', ipAddress: '192.168.1.105' },
  { id: 'al-004', userId: 'ga-001', userName: 'Priya Sharma', action: 'Payment Recorded', details: 'Recorded payment of ₹5,000 from Rohan Singh', timestamp: '2024-11-20 11:00:00', ipAddress: '192.168.1.105' },
  { id: 'al-005', userId: 'sa-001', userName: 'Rajesh Kumar', action: 'Gym Suspended', details: 'Suspended Zen Fitness Hub for payment default', timestamp: '2024-11-19 09:30:00', ipAddress: '192.168.1.100' },
  { id: 'al-006', userId: 'tr-001', userName: 'Arjun Patel', action: 'Workout Created', details: 'Created workout plan "Beginner Full Body" for Ananya Verma', timestamp: '2024-11-19 16:45:00', ipAddress: '192.168.1.110' },
  { id: 'al-007', userId: 'ga-001', userName: 'Priya Sharma', action: 'Plan Modified', details: 'Updated Annual Plan pricing', timestamp: '2024-11-18 13:20:00', ipAddress: '192.168.1.105' },
  { id: 'al-008', userId: 'sa-001', userName: 'Rajesh Kumar', action: 'Settings Updated', details: 'Updated platform notification settings', timestamp: '2024-11-17 10:00:00', ipAddress: '192.168.1.100' },
];

// ==================== SUPPORT TICKETS ====================
export const supportTickets: SupportTicket[] = [
  { id: 'st-001', gymId: 'gym-001', userId: 'mb-001', userName: 'Ananya Verma', subject: 'Unable to scan QR code', message: 'My QR code is not being scanned at the entry. Please help.', status: 'open', priority: 'high', createdAt: '2024-11-21 08:00:00', updatedAt: '2024-11-21 08:00:00' },
  { id: 'st-002', gymId: 'gym-001', userId: 'mb-005', userName: 'Diya Patel', subject: 'Membership renewal issue', message: 'I renewed my membership but the system still shows expired.', status: 'in-progress', priority: 'medium', createdAt: '2024-11-20 15:30:00', updatedAt: '2024-11-21 09:00:00' },
  { id: 'st-003', gymId: 'gym-002', userId: 'ga-002', userName: 'Vikram Singh', subject: 'Need more branches', message: 'Want to add 3 more branches to our plan. What are the options?', status: 'resolved', priority: 'low', createdAt: '2024-11-18 10:00:00', updatedAt: '2024-11-19 14:00:00' },
  { id: 'st-004', gymId: 'gym-001', userId: 'mb-010', userName: 'Aditya Gupta', subject: 'Trainer change request', message: 'I would like to be assigned to a different trainer for my evening sessions.', status: 'open', priority: 'medium', createdAt: '2024-11-21 11:00:00', updatedAt: '2024-11-21 11:00:00' },
];

// ==================== NOTIFICATIONS ====================
export const notifications: Notification[] = [
  { id: 'n-001', gymId: 'gym-001', title: 'Welcome to FitZone Premium!', message: 'Start your fitness journey today. Check your workout plan.', type: 'success', read: false, createdAt: '2024-11-21 10:00:00' },
  { id: 'n-002', gymId: 'gym-001', title: 'Membership Expiring Soon', message: 'Your membership expires in 7 days. Renew now for uninterrupted access.', type: 'warning', read: false, createdAt: '2024-11-20 08:00:00' },
  { id: 'n-003', gymId: 'gym-001', title: 'New Class Available', message: 'Zumba Dance class has been added to the schedule. Book your spot!', type: 'info', read: true, createdAt: '2024-11-19 12:00:00' },
  { id: 'n-004', gymId: 'gym-001', title: 'Payment Received', message: 'Your payment of ₹5,000 has been received successfully.', type: 'success', read: true, createdAt: '2024-11-18 14:00:00' },
  { id: 'n-005', gymId: 'gym-001', title: 'Gym Closed on Diwali', message: 'The gym will be closed on November 1st for Diwali. Happy Diwali! 🎆', type: 'info', read: true, createdAt: '2024-10-30 10:00:00' },
];

// ==================== PROGRESS RECORDS ====================
export const progressRecords: ProgressRecord[] = [
  { id: 'pr-001', memberId: 'mb-001', date: '2024-07-01', weight: 65, bmi: 23.9, bodyFat: 26, notes: 'Starting weight' },
  { id: 'pr-002', memberId: 'mb-001', date: '2024-08-01', weight: 64, bmi: 23.5, bodyFat: 25.2 },
  { id: 'pr-003', memberId: 'mb-001', date: '2024-09-01', weight: 63, bmi: 23.1, bodyFat: 24.5 },
  { id: 'pr-004', memberId: 'mb-001', date: '2024-10-01', weight: 62, bmi: 22.8, bodyFat: 24 },
  { id: 'pr-005', memberId: 'mb-001', date: '2024-11-01', weight: 60.5, bmi: 22.2, bodyFat: 22.5, notes: 'Great progress' },
  { id: 'pr-006', memberId: 'mb-001', date: '2024-12-01', weight: 59.5, bmi: 21.9, bodyFat: 21.8, notes: 'Target nearly reached' },
];

// ==================== CHART DATA HELPERS ====================
export const monthlyRevenue = [
  { name: 'Jan', revenue: 185000 },
  { name: 'Feb', revenue: 210000 },
  { name: 'Mar', revenue: 195000 },
  { name: 'Apr', revenue: 240000 },
  { name: 'May', revenue: 260000 },
  { name: 'Jun', revenue: 230000 },
  { name: 'Jul', revenue: 275000 },
  { name: 'Aug', revenue: 290000 },
  { name: 'Sep', revenue: 310000 },
  { name: 'Oct', revenue: 285000 },
  { name: 'Nov', revenue: 320000 },
  { name: 'Dec', revenue: 350000 },
];

export const membershipDistribution = [
  { name: 'Monthly', value: 45, color: '#16A34A' },
  { name: 'Quarterly', value: 38, color: '#064E3B' },
  { name: 'Half-Yearly', value: 42, color: '#10B981' },
  { name: 'Annual', value: 30, color: '#6EE7B7' },
];

export const attendanceWeekly = [
  { name: 'Mon', count: 85 },
  { name: 'Tue', count: 72 },
  { name: 'Wed', count: 90 },
  { name: 'Thu', count: 68 },
  { name: 'Fri', count: 95 },
  { name: 'Sat', count: 110 },
  { name: 'Sun', count: 45 },
];

export const gymRegistrationGrowth = [
  { name: 'Jan', gyms: 2 },
  { name: 'Feb', gyms: 3 },
  { name: 'Mar', gyms: 4 },
  { name: 'Apr', gyms: 5 },
  { name: 'May', gyms: 6 },
  { name: 'Jun', gyms: 6 },
  { name: 'Jul', gyms: 7 },
  { name: 'Aug', gyms: 7 },
  { name: 'Sep', gyms: 7 },
  { name: 'Oct', gyms: 7 },
  { name: 'Nov', gyms: 8 },
];

export const subscriptionDistribution = [
  { name: 'Basic', value: 2, color: '#6EE7B7' },
  { name: 'Professional', value: 3, color: '#10B981' },
  { name: 'Enterprise', value: 3, color: '#064E3B' },
];
