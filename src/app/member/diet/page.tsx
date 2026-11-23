'use client';

import React from 'react';
import { dietPlans } from '@/data';
import { Apple, Clock, Flame, ShieldAlert } from 'lucide-react';

export default function MemberDietPage() {
  const plan = dietPlans[0]; // Diet plan for Ananya

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Personalized Nutrition Plan</h1>
          <p className="text-sm text-gray-500 mt-1">Prescribed by {plan.trainerName} for Weight Loss & Energy</p>
        </div>
        <div className="flex items-center gap-2 px-4 py-2 bg-green-50 text-green-700 rounded-xl font-bold text-sm">
          <Flame className="w-5 h-5 text-green-600" />
          Target: {plan.totalCalories} kcal / day
        </div>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {plan.meals.map(meal => (
          <div key={meal.id} className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
            <div className="flex items-center justify-between mb-4 border-b border-gray-100 pb-3">
              <div>
                <h3 className="font-bold text-gray-900 text-base">{meal.name}</h3>
                <span className="text-xs text-gray-400 flex items-center gap-1 mt-0.5">
                  <Clock className="w-3 h-3" /> {meal.time}
                </span>
              </div>
              <span className="text-xs font-bold text-green-700 bg-green-50 px-2.5 py-1 rounded-full">
                {meal.totalCalories} kcal
              </span>
            </div>

            <div className="space-y-3">
              {meal.foods.map((food, idx) => (
                <div key={idx} className="flex justify-between items-start text-xs">
                  <div>
                    <p className="font-semibold text-gray-800">{food.name}</p>
                    <p className="text-gray-400">{food.quantity}</p>
                  </div>
                  <div className="text-right">
                    <span className="font-medium text-gray-700">{food.calories} kcal</span>
                    <p className="text-[10px] text-gray-400">P:{food.protein}g C:{food.carbs}g F:{food.fat}g</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
