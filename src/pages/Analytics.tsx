import React from 'react';
import { BarChart2, TrendingUp, Users, BookOpen } from 'lucide-react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ChartData,
} from 'chart.js';
import { Line, Bar } from 'react-chartjs-2';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export function Analytics() {
  // Progress Chart Data
  const progressData: ChartData<'line'> = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Average Progress',
        data: [65, 70, 68, 72, 75, 73],
        borderColor: 'rgb(99, 102, 241)',
        backgroundColor: 'rgba(99, 102, 241, 0.5)',
        tension: 0.4,
      },
      {
        label: 'Top Performers',
        data: [85, 88, 87, 90, 92, 95],
        borderColor: 'rgb(34, 197, 94)',
        backgroundColor: 'rgba(34, 197, 94, 0.5)',
        tension: 0.4,
      },
    ],
  };

  // Engagement Chart Data
  const engagementData: ChartData<'bar'> = {
    labels: ['Python', 'React', 'Machine Learning', 'Data Science', 'Web Dev', 'Cloud'],
    datasets: [
      {
        label: 'Active Students',
        data: [450, 380, 320, 280, 260, 240],
        backgroundColor: 'rgba(99, 102, 241, 0.8)',
      },
      {
        label: 'Course Completion Rate',
        data: [85, 78, 70, 75, 82, 68],
        backgroundColor: 'rgba(34, 197, 94, 0.8)',
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div className="space-y-6">
      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { title: 'Total Students', value: '1,234', change: '+12%', icon: Users, color: 'text-blue-600' },
          { title: 'Course Completion', value: '87%', change: '+5%', icon: BookOpen, color: 'text-green-600' },
          { title: 'Average Progress', value: '73%', change: '+8%', icon: TrendingUp, color: 'text-purple-600' },
          { title: 'Active Courses', value: '24', change: '+2', icon: BarChart2, color: 'text-indigo-600' },
        ].map((stat, index) => (
          <div key={index} className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">{stat.title}</p>
                <p className="text-2xl font-semibold text-gray-900 dark:text-white mt-1">{stat.value}</p>
              </div>
              <stat.icon className={`h-6 w-6 ${stat.color}`} />
            </div>
            <div className="mt-2">
              <span className="text-sm text-green-600 dark:text-green-400">{stat.change}</span>
              <span className="text-sm text-gray-500 dark:text-gray-400"> vs last month</span>
            </div>
          </div>
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">Student Progress</h3>
          <div className="h-64">
            <Line options={chartOptions} data={progressData} />
          </div>
        </div>
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">Course Engagement</h3>
          <div className="h-64">
            <Bar options={chartOptions} data={engagementData} />
          </div>
        </div>
      </div>

      {/* Detailed Stats */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">Performance Metrics</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            { label: 'Average Course Rating', value: '4.8/5.0' },
            { label: 'Course Completion Rate', value: '87%' },
            { label: 'Student Satisfaction', value: '92%' },
            { label: 'Active Learning Hours', value: '2,456' },
            { label: 'Total Assessments', value: '1,890' },
            { label: 'Certification Rate', value: '78%' },
          ].map((metric, index) => (
            <div key={index} className="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
              <p className="text-sm text-gray-600 dark:text-gray-400">{metric.label}</p>
              <p className="text-xl font-semibold text-gray-900 dark:text-white mt-1">{metric.value}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}