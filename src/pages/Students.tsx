import { Search, Filter } from 'lucide-react';
import { useState } from 'react';

// Function to get initials from name
const getInitials = (name: string) => {
  return name
    .split(' ')
    .map(word => word[0])
    .join('')
    .toUpperCase();
};

// Function to get consistent color based on name
const getColorFromName = (name: string) => {
  const colors = [
    'bg-blue-500',
    'bg-purple-500',
    'bg-green-500',
    'bg-pink-500',
    'bg-indigo-500',
    'bg-red-500',
    'bg-yellow-500',
    'bg-teal-500'
  ];
  const index = name.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  return colors[index % colors.length];
};

const students = [
  {
    id: 1,
    name: "Jonathan Pulipaka",
    email: "jonathan.p@example.com",
    progress: 78,
    enrolled: 3,
    completed: 2,
    achievements: 5
  },
  {
    id: 2,
    name: "Harsha Manchala",
    email: "harsha.m@example.com",
    progress: 92,
    enrolled: 4,
    completed: 3,
    achievements: 7
  },
  {
    id: 3,
    name: "Gowthami Goriparthi",
    email: "gowthami.g@example.com",
    progress: 65,
    enrolled: 2,
    completed: 1,
    achievements: 3
  },
  {
    id: 4,
    name: "Anusha Goriparthi",
    email: "anusha.g@example.com",
    progress: 85,
    enrolled: 3,
    completed: 2,
    achievements: 4
  }
];

export function Students() {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredStudents = students.filter(student =>
    student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    student.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="p-6">
      <div className="flex justify-between mb-6">
        <div className="relative flex-1 max-w-2xl">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
          <input
            type="text"
            placeholder="Search students..."
            className="w-full pl-10 pr-4 py-2 border rounded-lg dark:bg-gray-800 dark:border-gray-700 dark:text-white"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <button className="flex items-center space-x-2 px-4 py-2 border rounded-lg dark:border-gray-700 ml-4">
          <Filter className="h-5 w-5" />
          <span>Filters</span>
        </button>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow">
        <div className="grid grid-cols-6 gap-4 p-4 text-sm font-medium text-gray-500 dark:text-gray-400 border-b dark:border-gray-700">
          <div className="col-span-2">STUDENT</div>
          <div>PROGRESS</div>
          <div>COURSES</div>
          <div>ACHIEVEMENTS</div>
          <div>ACTIONS</div>
        </div>

        {filteredStudents.map((student) => (
          <div key={student.id} className="grid grid-cols-6 gap-4 p-4 items-center border-b last:border-0 dark:border-gray-700">
            <div className="col-span-2 flex items-center space-x-3">
              <div 
                className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-medium ${getColorFromName(student.name)}`}
              >
                {getInitials(student.name)}
              </div>
              <div>
                <div className="font-medium text-gray-900 dark:text-white">{student.name}</div>
                <div className="text-sm text-gray-500 dark:text-gray-400">{student.email}</div>
              </div>
            </div>
            <div className="flex items-center">
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                <div 
                  className="bg-indigo-600 h-2 rounded-full" 
                  style={{ width: `${student.progress}%` }} 
                />
              </div>
              <span className="ml-2 text-sm text-gray-600 dark:text-gray-300">{student.progress}%</span>
            </div>
            <div>
              <div className="text-sm text-gray-900 dark:text-white">{student.enrolled} Enrolled</div>
              <div className="text-sm text-gray-500 dark:text-gray-400">{student.completed} Completed</div>
            </div>
            <div className="flex items-center space-x-1">
              <span className="text-yellow-500">★</span>
              <span className="text-gray-900 dark:text-white">{student.achievements}</span>
            </div>
            <div>
              <button className="text-indigo-600 dark:text-indigo-400 hover:underline">
                View Profile
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
} 