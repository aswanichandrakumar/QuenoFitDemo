'use client';

import React, { useState } from 'react';
import { dietPlans as initialDiets, members } from '@/data';
import type { DietPlan } from '@/types';
import Modal from '@/components/ui/Modal';
import { useToast } from '@/lib/toast';
import { generateId } from '@/lib/utils';
import { Plus, Apple, Clock, Flame, User } from 'lucide-react';

export default function TrainerDietsPage() {
  const [diets, setDiets] = useState<DietPlan[]>(initialDiets);
  const [showAdd, setShowAdd] = useState(false);
  const { addToast } = useToast();

  const myMembers = members.filter(m => m.assignedTrainerId === 'tr-001' || m.assignedTrainer === 'Arjun Patel');

  const [form, setForm] = useState({
    memberId: myMembers[0]?.id || 'mb-001',
    calories: '2000',
    breakfast: 'Oatmeal with whey protein, chia seeds & banana (450 kcal)',
    lunch: 'Grilled chicken breast / paneer, brown rice, green salad (600 kcal)',
    snack: 'Greek yogurt with handful of almonds (250 kcal)',
    dinner: 'Egg white omelette / tofu stir-fry with chapati (500 kcal)',
  });

  const handleSave = () => {
    const member = members.find(m => m.id === form.memberId) || myMembers[0];
    const totalCal = parseInt(form.calories) || 1800;

    const newDiet: DietPlan = {
      id: `dp-${generateId()}`,
      gymId: 'gym-001',
      memberId: member.id,
      memberName: member.name,
      trainerId: 'tr-001',
      trainerName: 'Arjun Patel',
      totalCalories: totalCal,
      createdAt: new Date().toISOString().split('T')[0],
      status: 'active',
      meals: [
        {
          id: 'meal-1',
          name: 'Breakfast',
          time: '08:00 AM',
          totalCalories: 450,
          foods: [{ name: form.breakfast, quantity: '1 portion', calories: 450, protein: 30, carbs: 45, fat: 10 }],
        },
        {
          id: 'meal-2',
          name: 'Lunch',
          time: '01:00 PM',
          totalCalories: 600,
          foods: [{ name: form.lunch, quantity: '1 portion', calories: 600, protein: 45, carbs: 55, fat: 15 }],
        },
        {
          id: 'meal-3',
          name: 'Snack',
          time: '05:00 PM',
          totalCalories: 250,
          foods: [{ name: form.snack, quantity: '1 portion', calories: 250, protein: 15, carbs: 20, fat: 8 }],
        },
        {
          id: 'meal-4',
          name: 'Dinner',
          time: '08:30 PM',
          totalCalories: 500,
          foods: [{ name: form.dinner, quantity: '1 portion', calories: 500, protein: 35, carbs: 40, fat: 12 }],
        },
      ],
    };

    setDiets(prev => [newDiet, ...prev]);
    setShowAdd(false);
    addToast('Diet plan assigned to ' + member.name, 'success');
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Custom Meal Schedules</h1>
          <p className="text-sm text-gray-500 mt-1">Prescribe macros and calorie targets for trainees</p>
        </div>
        <button
          onClick={() => setShowAdd(true)}
          className="flex items-center gap-1.5 px-4 py-2.5 bg-green-600 text-white rounded-lg text-sm font-medium hover:bg-green-700"
        >
          <Plus className="w-4 h-4" /> Create Meal Plan
        </button>
      </div>

      <div className="space-y-6">
        {diets.map(dp => (
          <div key={dp.id} className="bg-white rounded-xl border border-gray-200 p-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-6 border-b border-gray-100 pb-4">
              <div>
                <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                  <Apple className="w-5 h-5 text-green-600" />
                  Diet Plan for {dp.memberName}
                </h3>
                <p className="text-xs text-gray-500 mt-0.5">Created by {dp.trainerName} • Active Plan</p>
              </div>
              <div className="flex items-center gap-2 px-3 py-1.5 bg-green-50 text-green-700 rounded-full font-semibold text-sm">
                <Flame className="w-4 h-4 text-green-600" /> {dp.totalCalories} kcal/day
              </div>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {dp.meals.map(meal => (
                <div key={meal.id} className="p-4 rounded-xl border border-gray-100 bg-gray-50/50">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-semibold text-sm text-gray-800">{meal.name}</span>
                    <span className="text-xs text-gray-400 font-medium flex items-center gap-1">
                      <Clock className="w-3 h-3" /> {meal.time}
                    </span>
                  </div>
                  <div className="space-y-1.5">
                    {meal.foods.map((food, i) => (
                      <div key={i} className="text-xs text-gray-600">
                        <p className="font-medium text-gray-800">{food.name}</p>
                        <p className="text-gray-400">{food.quantity} • {food.calories} kcal</p>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <Modal isOpen={showAdd} onClose={() => setShowAdd(false)} title="Assign New Diet Plan" size="md">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Select Member</label>
            <select
              value={form.memberId}
              onChange={e => setForm(p => ({ ...p, memberId: e.target.value }))}
              className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm"
            >
              {myMembers.map(m => (
                <option key={m.id} value={m.id}>{m.name}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Target Calories / Day</label>
            <input
              type="number"
              value={form.calories}
              onChange={e => setForm(p => ({ ...p, calories: e.target.value }))}
              className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">Breakfast Plan</label>
            <input
              type="text"
              value={form.breakfast}
              onChange={e => setForm(p => ({ ...p, breakfast: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-200 rounded text-xs"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">Lunch Plan</label>
            <input
              type="text"
              value={form.lunch}
              onChange={e => setForm(p => ({ ...p, lunch: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-200 rounded text-xs"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">Evening Snack</label>
            <input
              type="text"
              value={form.snack}
              onChange={e => setForm(p => ({ ...p, snack: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-200 rounded text-xs"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">Dinner Plan</label>
            <input
              type="text"
              value={form.dinner}
              onChange={e => setForm(p => ({ ...p, dinner: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-200 rounded text-xs"
            />
          </div>

          <div className="flex justify-end gap-3 pt-3">
            <button
              onClick={() => setShowAdd(false)}
              className="px-4 py-2 text-sm text-gray-700 bg-gray-100 rounded-lg"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="px-4 py-2 text-sm text-white bg-green-600 rounded-lg hover:bg-green-700"
            >
              Assign Diet Plan
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
