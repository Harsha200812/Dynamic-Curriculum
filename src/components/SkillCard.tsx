import React from 'react';
import { Skill } from '../types';
import { TrendingUp, TrendingDown } from 'lucide-react';

interface SkillCardProps {
  skill: Skill;
}

export function SkillCard({ skill }: SkillCardProps) {
  const isDemandHigh = skill.demand > 70;

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4 hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="font-semibold text-gray-800 dark:text-gray-100">{skill.name}</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{skill.category}</p>
        </div>
        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
          isDemandHigh ? 'bg-green-100 dark:bg-green-900/50 text-green-800 dark:text-green-300' : 'bg-yellow-100 dark:bg-yellow-900/50 text-yellow-800 dark:text-yellow-300'
        }`}>
          {isDemandHigh ? (
            <TrendingUp className="w-3 h-3 mr-1" />
          ) : (
            <TrendingDown className="w-3 h-3 mr-1" />
          )}
          {skill.demand}% Demand
        </span>
      </div>
      <div className="mt-3">
        <div className="flex items-center">
          <div className="flex-1 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
            <div
              className={`h-2 rounded-full ${
                skill.level === 'beginner' ? 'w-1/3 bg-blue-500' :
                skill.level === 'intermediate' ? 'w-2/3 bg-indigo-500' :
                'w-full bg-purple-500'
              }`}
            />
          </div>
          <span className="ml-2 text-xs text-gray-500 dark:text-gray-400 capitalize">{skill.level}</span>
        </div>
      </div>
    </div>
  );
}