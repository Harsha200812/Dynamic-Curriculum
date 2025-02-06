import { Clock, Users, Star } from 'lucide-react';
import { useState } from 'react';

export function Courses() {
  const [selectedCategory, setSelectedCategory] = useState('All Categories');
  const [selectedLevel, setSelectedLevel] = useState('All Levels');
  const [selectedDuration, setSelectedDuration] = useState('Duration');

  const courses = [
    {
      id: 1,
      title: 'Introduction to Machine Learning',
      description: 'Learn the fundamentals of machine learning and AI',
      instructor: 'Dr. Sarah Chen',
      duration: '8 weeks',
      students: 1234,
      rating: 4.8,
      category: 'Machine Learning',
      level: 'Beginner',
      image: 'https://images.unsplash.com/photo-1515879218367-8466d910aaa4',
    },
    {
      id: 2,
      title: 'Advanced React Development',
      description: 'Master modern React patterns and best practices',
      instructor: 'Alex Johnson',
      duration: '10 weeks',
      students: 856,
      rating: 4.9,
      category: 'Programming',
      level: 'Advanced',
      image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee',
    },
    {
      id: 3,
      title: 'Data Science Fundamentals',
      description: 'Comprehensive introduction to data science',
      instructor: 'Maria Garcia',
      duration: '12 weeks',
      students: 2156,
      rating: 4.7,
      category: 'Data Science',
      level: 'Beginner',
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71',
    },
    {
      id: 4,
      title: 'Python for Data Analysis',
      description: 'Learn data analysis using Python and pandas',
      instructor: 'John Smith',
      duration: '6 weeks',
      students: 1567,
      rating: 4.6,
      category: 'Data Science',
      level: 'Intermediate',
      image: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5',
    },
    {
      id: 5,
      title: 'Deep Learning Specialization',
      description: 'Advanced deep learning and neural networks',
      instructor: 'Dr. Michael Lee',
      duration: '16 weeks',
      students: 789,
      rating: 4.9,
      category: 'Machine Learning',
      level: 'Advanced',
      image: 'https://images.unsplash.com/photo-1555949963-aa79dcee981c',
    },
    {
      id: 6,
      title: 'Web Development Bootcamp',
      description: 'Full-stack web development fundamentals',
      instructor: 'Emma Wilson',
      duration: '12 weeks',
      students: 3421,
      rating: 4.8,
      category: 'Programming',
      level: 'Beginner',
      image: 'https://images.unsplash.com/photo-1587620962725-abab7fe55159',
    },
    {
      id: 7,
      title: 'Cloud Architecture Fundamentals',
      description: 'Learn cloud computing and architecture',
      instructor: 'David Brown',
      duration: '8 weeks',
      students: 1123,
      rating: 4.7,
      category: 'Cloud Computing',
      level: 'Intermediate',
      image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa',
    },
    {
      id: 8,
      title: 'Mobile App Development',
      description: 'Build iOS and Android applications',
      instructor: 'Sophie Chen',
      duration: '14 weeks',
      students: 945,
      rating: 4.8,
      category: 'Programming',
      level: 'Intermediate',
      image: 'https://images.unsplash.com/photo-1522199755839-a2bacb67c546',
    },
    {
      id: 9,
      title: 'DevOps Engineering',
      description: 'Master modern DevOps practices',
      instructor: 'Robert Martinez',
      duration: '10 weeks',
      students: 678,
      rating: 4.9,
      category: 'DevOps',
      level: 'Advanced',
      image: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6',
    }
  ];

  // Extract unique categories, levels, and duration ranges
  const categories = ['All Categories', ...new Set(courses.map(course => course.category))];
  const levels = ['All Levels', ...new Set(courses.map(course => course.level))];
  
  const getDurationRange = (weeks: number) => {
    if (weeks <= 4) return '0-4 weeks';
    if (weeks <= 8) return '4-8 weeks';
    return '8+ weeks';
  };

  // Filter courses based on selected filters
  const filteredCourses = courses.filter(course => {
    const matchCategory = selectedCategory === 'All Categories' || course.category === selectedCategory;
    const matchLevel = selectedLevel === 'All Levels' || course.level === selectedLevel;
    const matchDuration = selectedDuration === 'Duration' || 
      getDurationRange(parseInt(course.duration)) === selectedDuration;
    
    return matchCategory && matchLevel && matchDuration;
  });

  return (
    <div className="space-y-6">
      {/* Course Filters */}
      <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm">
        <div className="flex flex-wrap gap-4">
          <select 
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            {categories.map(category => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>

          <select 
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            value={selectedLevel}
            onChange={(e) => setSelectedLevel(e.target.value)}
          >
            {levels.map(level => (
              <option key={level} value={level}>{level}</option>
            ))}
          </select>

          <select 
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            value={selectedDuration}
            onChange={(e) => setSelectedDuration(e.target.value)}
          >
            <option value="Duration">Duration</option>
            <option value="0-4 weeks">0-4 weeks</option>
            <option value="4-8 weeks">4-8 weeks</option>
            <option value="8+ weeks">8+ weeks</option>
          </select>
        </div>
      </div>

      {/* Course Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCourses.map((course) => (
          <div key={course.id} className="bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow">
            <img src={course.image} alt={course.title} className="w-full h-48 object-cover" />
            <div className="p-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-indigo-600 dark:text-indigo-400">{course.category}</span>
                <span className="text-sm font-medium text-gray-500 dark:text-gray-400">{course.level}</span>
              </div>
              <h3 className="font-semibold text-lg text-gray-800 dark:text-white">{course.title}</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{course.description}</p>
              <p className="text-sm text-gray-600 dark:text-gray-300 mt-2">Instructor: {course.instructor}</p>
              
              <div className="mt-4 flex items-center justify-between text-sm text-gray-600 dark:text-gray-300">
                <div className="flex items-center">
                  <Clock className="h-4 w-4 mr-1" />
                  {course.duration}
                </div>
                <div className="flex items-center">
                  <Users className="h-4 w-4 mr-1" />
                  {course.students}
                </div>
                <div className="flex items-center">
                  <Star className="h-4 w-4 mr-1 text-yellow-400" />
                  {course.rating}
                </div>
              </div>

              <button className="mt-4 w-full bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 transition-colors">
                Enroll Now
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}