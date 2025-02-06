export interface Skill {
  id: string;
  name: string;
  category: string;
  level: 'beginner' | 'intermediate' | 'advanced';
  demand: number;
}

export interface Course {
  id: string;
  title: string;
  description: string;
  skills: Skill[];
  duration: number;
  level: 'beginner' | 'intermediate' | 'advanced';
}

export interface CareerPath {
  id: string;
  title: string;
  description: string;
  requiredSkills: Skill[];
  recommendedCourses: Course[];
  demandScore: number;
}