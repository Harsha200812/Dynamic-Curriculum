import React from 'react';
import { CareerPath } from '../types';
import { TrendingUp, ChevronRight } from 'lucide-react';

interface CareerPathCardProps {
  careerPath: CareerPath;
}

export function CareerPathCard({ careerPath }: CareerPathCardProps) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100">{careerPath.title}</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{careerPath.description}</p>
        </div>
        <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-indigo-100 dark:bg-indigo-900/50 text-indigo-800 dark:text-indigo-300">
          <TrendingUp className="w-4 h-4 mr-1" />
          {careerPath.demandScore}% Match
        </span>
      </div>
      
      <div className="mt-4">
        <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300">Key Skills</h4>
        <div className="mt-2 flex flex-wrap gap-2">
          {careerPath.requiredSkills.slice(0, 4).map((skill) => (
            <span
              key={skill.id}
              className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-300"
            >
              {skill.name}
            </span>
          ))}
          {careerPath.requiredSkills.length > 4 && (
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400">
              +{careerPath.requiredSkills.length - 4} more
            </span>
          )}
        </div>
      </div>

      <div className="mt-4 pt-4 border-t border-gray-100 dark:border-gray-700">
        <button className="inline-flex items-center text-sm font-medium text-indigo-600 dark:text-indigo-400 hover:text-indigo-500 dark:hover:text-indigo-300">
          View Career Path
          <ChevronRight className="w-4 h-4 ml-1" />
        </button>
      </div>
    </div>
  );
}