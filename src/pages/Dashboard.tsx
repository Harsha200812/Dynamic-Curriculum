import { useState } from 'react';
import { SkillCard } from '../components/SkillCard';
import { Skill, CareerPath } from '../types';
import { BarChart3, Users, BookOpen, TrendingUp } from 'lucide-react';
import { CareerPathModal } from '../components/CareerPathModal';

// Mock data remains the same
const mockSkills: Skill[] = [
  { id: '1', name: 'Machine Learning', category: 'AI/ML', level: 'intermediate', demand: 85 },
  { id: '2', name: 'React', category: 'Frontend', level: 'advanced', demand: 92 },
  { id: '3', name: 'Python', category: 'Programming', level: 'beginner', demand: 78 },
  { id: '4', name: 'Data Analysis', category: 'Data Science', level: 'intermediate', demand: 65 },
];

const mockCareerPaths: CareerPath[] = [
  {
    id: '1',
    title: 'AI Engineer',
    description: 'Design and implement AI solutions for enterprise applications',
    requiredSkills: mockSkills,
    recommendedCourses: [],
    demandScore: 89,
  },
  {
    id: '2',
    title: 'Full Stack Developer',
    description: 'Build end-to-end web applications and services',
    requiredSkills: mockSkills.slice(1),
    recommendedCourses: [],
    demandScore: 92,
  },
];

const stats = [
  { name: 'Active Courses', value: '24', icon: BookOpen, color: 'bg-blue-500' },
  { name: 'Students', value: '1,200', icon: Users, color: 'bg-green-500' },
  { name: 'Skills Tracked', value: '156', icon: BarChart3, color: 'bg-purple-500' },
  { name: 'Industry Demand', value: '+15%', icon: TrendingUp, color: 'bg-indigo-500' },
];

export function Dashboard() {
  const [selectedCareer, setSelectedCareer] = useState<any>(null);

  return (
    <div className="p-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map((stat) => (
          <div key={stat.name} className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
            <div className="flex items-center">
              <div className={`p-2 rounded-lg ${stat.color} bg-opacity-10 dark:bg-opacity-20`}>
                <stat.icon className={`w-6 h-6 ${stat.color.replace('bg-', 'text-')}`} />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">{stat.name}</p>
                <p className="text-2xl font-semibold text-gray-900 dark:text-white">{stat.value}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Skills Section */}
        <div>
          <h2 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">Trending Skills</h2>
          <div className="grid grid-cols-1 gap-4">
            {mockSkills.map((skill) => (
              <SkillCard key={skill.id} skill={skill} />
            ))}
          </div>
        </div>

        {/* Career Paths Section */}
        <div>
          <h2 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">Recommended Career Paths</h2>
          <div className="grid grid-cols-1 gap-4">
            {mockCareerPaths.map((careerPath) => (
              <div
                key={careerPath.id}
                className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white">{careerPath.title}</h3>
                    <p className="text-gray-500 dark:text-gray-400 mt-1">{careerPath.description}</p>
                    <button
                      onClick={() => setSelectedCareer(careerPath)}
                      className="text-indigo-600 hover:underline mt-4 text-sm"
                    >
                      View Career Path →
                    </button>
                  </div>
                  <span className="bg-indigo-50 dark:bg-indigo-900/50 text-indigo-600 dark:text-indigo-400 text-sm px-3 py-1 rounded-full">
                    {careerPath.demandScore}% Match
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {selectedCareer && (
        <CareerPathModal
          isOpen={true}
          onClose={() => setSelectedCareer(null)}
          careerPath={{
            title: selectedCareer.title,
            description: selectedCareer.description,
            keySkills: selectedCareer.requiredSkills.map((skill: { name: string }) => skill.name),
            matchPercentage: selectedCareer.demandScore,
            requirements: [
              "Bachelor's degree in related field",
              "2+ years of experience",
              "Strong problem-solving skills"
            ],
            salary: "$80,000 - $150,000",
            timeToComplete: "6-12 months"
          }}
        />
      )}
    </div>
  );
}