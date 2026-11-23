'use client';

import React from 'react';
import { dietPlans } from '@/data';
import { Apple, Clock, Flame } from 'lucide-react';

export default function DietsPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">Diet Plans</h1>
      {dietPlans.map(dp => (
        <div key={dp.id} className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <div><h3 className="font-semibold text-gray-900 text-lg">Diet Plan for {dp.memberName}</h3><p className="text-sm text-gray-500">By {dp.trainerName} • Total: {dp.totalCalories} kcal/day</p></div>
            <div className="flex items-center gap-2 px-3 py-1.5 bg-green-50 rounded-full"><Flame className="w-4 h-4 text-green-600" /><span className="text-sm font-semibold text-green-700">{dp.totalCalories} kcal</span></div>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {dp.meals.map(meal => (
              <div key={meal.id} className="border border-gray-100 rounded-xl p-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2"><Apple className="w-4 h-4 text-green-600" /><h4 className="font-semibold text-gray-900 text-sm">{meal.name}</h4></div>
                  <div className="flex items-center gap-1 text-xs text-gray-500"><Clock className="w-3 h-3" />{meal.time}</div>
                </div>
                <div className="space-y-2">
                  {meal.foods.map((food, i) => (
                    <div key={i} className="flex items-center justify-between text-sm">
                      <div><p className="text-gray-800">{food.name}</p><p className="text-xs text-gray-400">{food.quantity}</p></div>
                      <span className="text-xs text-gray-500">{food.calories} kcal</span>
                    </div>
                  ))}
                </div>
                <div className="mt-3 pt-2 border-t border-gray-100 text-xs text-gray-500 flex justify-between">
                  <span>P: {meal.foods.reduce((s,f) => s+f.protein, 0)}g</span>
                  <span>C: {meal.foods.reduce((s,f) => s+f.carbs, 0)}g</span>
                  <span>F: {meal.foods.reduce((s,f) => s+f.fat, 0)}g</span>
                  <span className="font-medium text-gray-700">{meal.totalCalories} kcal</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
