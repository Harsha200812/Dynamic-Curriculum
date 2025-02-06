import { X } from 'lucide-react';

interface CareerPathModalProps {
  isOpen: boolean;
  onClose: () => void;
  careerPath: {
    title: string;
    description: string;
    keySkills: string[];
    matchPercentage: number;
    requirements?: string[];
    salary?: string;
    timeToComplete?: string;
  };
}

export function CareerPathModal({ isOpen, onClose, careerPath }: CareerPathModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg w-full max-w-2xl mx-4">
        <div className="p-6">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
                {careerPath.title}
              </h2>
              <p className="text-gray-500 dark:text-gray-400 mt-1">
                {careerPath.description}
              </p>
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                Required Skills
              </h3>
              <div className="flex flex-wrap gap-2">
                {careerPath.keySkills.map((skill, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-indigo-100 dark:bg-indigo-900/50 text-indigo-800 dark:text-indigo-300 rounded-full text-sm"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {careerPath.requirements && (
              <div>
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                  Requirements
                </h3>
                <ul className="list-disc list-inside space-y-1 text-gray-600 dark:text-gray-300">
                  {careerPath.requirements.map((req, index) => (
                    <li key={index}>{req}</li>
                  ))}
                </ul>
              </div>
            )}

            <div className="grid grid-cols-2 gap-4">
              {careerPath.salary && (
                <div>
                  <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400">
                    Expected Salary Range
                  </h4>
                  <p className="text-gray-900 dark:text-white">{careerPath.salary}</p>
                </div>
              )}
              {careerPath.timeToComplete && (
                <div>
                  <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400">
                    Time to Complete
                  </h4>
                  <p className="text-gray-900 dark:text-white">{careerPath.timeToComplete}</p>
                </div>
              )}
            </div>
          </div>

          <div className="mt-8 flex justify-end">
            <button
              onClick={onClose}
              className="px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 mr-2"
            >
              Close
            </button>
            <button
              className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
            >
              Start Career Path
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
