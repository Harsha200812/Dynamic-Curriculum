import { useState } from 'react';
import { Search, Filter } from 'lucide-react';
import { CareerPathModal } from '../components/CareerPathModal';

interface ExploreItem {
  id: string;
  type: 'Course' | 'Career' | 'Skill';
  title: string;
  description: string;
  image: string;
  stats: {
    students?: string;
    rating?: number;
    courses?: number;
    duration?: string;
    level?: string;
    demand?: number;
  };
}

const items: ExploreItem[] = [
  {
    id: '1',
    type: 'Course',
    title: 'Machine Learning Fundamentals',
    description: 'Master the basics of machine learning with hands-on projects and real-world applications.',
    image: 'https://images.unsplash.com/photo-1515879218367-8466d910aaa4?auto=format&fit=crop&q=80&w=400',
    stats: {
      students: '1.2k',
      rating: 4.8
    }
  },
  {
    id: '2',
    type: 'Career',
    title: 'Data Science Career Path',
    description: 'Comprehensive learning path to become a professional Data Scientist with industry-relevant skills.',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=400',
    stats: {
      courses: 12,
      duration: '6 months'
    }
  },
  {
    id: '3',
    type: 'Skill',
    title: 'Python Programming',
    description: 'Learn Python from scratch and build a strong foundation in programming fundamentals.',
    image: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&q=80&w=400',
    stats: {
      level: 'Beginner',
      demand: 92
    }
  },
  {
    id: '4',
    type: 'Course',
    title: 'Web Development Bootcamp',
    description: 'Full-stack web development course covering modern frameworks and best practices.',
    image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&q=80&w=400',
    stats: {
      students: '2.5k',
      rating: 4.9
    }
  },
  {
    id: '5',
    type: 'Career',
    title: 'Cloud Architecture',
    description: 'Build expertise in cloud computing and become a certified Cloud Architect.',
    image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=400',
    stats: {
      courses: 8,
      duration: '4 months'
    }
  },
  {
    id: '6',
    type: 'Skill',
    title: 'React Development',
    description: 'Master React.js and build modern, responsive web applications.',
    image: 'https://images.unsplash.com/photo-1633356122102-3fe601e05bd2?auto=format&fit=crop&q=80&w=400',
    stats: {
      level: 'Intermediate',
      demand: 95
    }
  }
];

export function Explore() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState<'Popular' | 'Trending' | 'New'>('Popular');
  const [showFilters, setShowFilters] = useState(false);
  const [selectedType, setSelectedType] = useState<'Course' | 'Career' | 'Skill' | 'All'>('All');
  const [selectedCareer, setSelectedCareer] = useState<ExploreItem | null>(null);

  const filteredItems = items.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         item.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = selectedType === 'All' || item.type === selectedType;
    return matchesSearch && matchesType;
  });

  return (
    <div className="p-6 space-y-6">
      {/* Search Bar */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
        <div className="max-w-3xl mx-auto">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type="text"
              placeholder="Search for skills, courses, or career paths..."
              className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="mt-4 flex flex-wrap items-center gap-4">
            <button 
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center px-4 py-2 text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700"
            >
              <Filter className="h-4 w-4 mr-2" />
              Filters
            </button>
            <div className="flex flex-wrap gap-2">
              {['Popular', 'Trending', 'New'].map((filter) => (
                <button
                  key={filter}
                  onClick={() => setActiveFilter(filter as 'Popular' | 'Trending' | 'New')}
                  className={`px-3 py-1.5 rounded-full text-sm font-medium ${
                    activeFilter === filter
                      ? 'bg-indigo-100 dark:bg-indigo-900/50 text-indigo-800 dark:text-indigo-300'
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-300'
                  }`}
                >
                  {filter}
                </button>
              ))}
            </div>
          </div>

          {showFilters && (
            <div className="mt-4 p-4 border rounded-lg dark:border-gray-700">
              <div className="flex gap-4">
                {['All', 'Course', 'Career', 'Skill'].map((type) => (
                  <button
                    key={type}
                    onClick={() => setSelectedType(type as 'All' | 'Course' | 'Career' | 'Skill')}
                    className={`px-4 py-2 rounded-lg ${
                      selectedType === type
                        ? 'bg-indigo-100 dark:bg-indigo-900/50 text-indigo-800 dark:text-indigo-300'
                        : 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-300'
                    }`}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Grid of Items */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredItems.map((item) => (
          <div
            key={item.id}
            className="bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow"
          >
            <div className="relative h-48">
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-4 left-4">
                <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                  item.type === 'Course'
                    ? 'bg-blue-100 dark:bg-blue-900/50 text-blue-800 dark:text-blue-300'
                    : item.type === 'Career'
                    ? 'bg-purple-100 dark:bg-purple-900/50 text-purple-800 dark:text-purple-300'
                    : 'bg-green-100 dark:bg-green-900/50 text-green-800 dark:text-green-300'
                }`}>
                  {item.type}
                </span>
              </div>
            </div>
            <div className="p-6">
              <h3 className="font-semibold text-lg text-gray-800 dark:text-white mb-2">{item.title}</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">{item.description}</p>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center justify-between text-sm">
                  {item.stats.students && (
                    <span className="text-gray-600 dark:text-gray-300">{item.stats.students} students</span>
                  )}
                  {item.stats.rating && (
                    <span className="text-yellow-600 dark:text-yellow-400">★ {item.stats.rating}</span>
                  )}
                  {item.stats.courses && (
                    <span className="text-gray-600 dark:text-gray-300">{item.stats.courses} courses</span>
                  )}
                  {item.stats.duration && (
                    <span className="text-gray-600 dark:text-gray-300">{item.stats.duration}</span>
                  )}
                  {item.stats.level && (
                    <span className="text-gray-600 dark:text-gray-300">{item.stats.level}</span>
                  )}
                  {item.stats.demand && (
                    <span className="text-green-600 dark:text-green-400">{item.stats.demand}% demand</span>
                  )}
                </div>
                {item.type === 'Career' && (
                  <button
                    onClick={() => setSelectedCareer(item)}
                    className="text-indigo-600 dark:text-indigo-400 hover:underline text-sm"
                  >
                    View Career Path →
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {selectedCareer && (
        <CareerPathModal
          isOpen={true}
          onClose={() => setSelectedCareer(null)}
          careerPath={{
            title: selectedCareer.title,
            description: selectedCareer.description,
            keySkills: ['React', 'Python', 'Data Analysis'],
            matchPercentage: 89,
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