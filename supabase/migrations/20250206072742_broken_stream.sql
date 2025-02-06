/*
  # Core tables for CurriculumAI

  1. New Tables
    - `skills`
      - Core skills that can be learned
    - `courses`
      - Available courses
    - `course_skills`
      - Skills taught in each course
    - `career_paths`
      - Career paths students can follow
    - `career_path_skills`
      - Required skills for each career path
    - `student_progress`
      - Track student progress in courses
    - `student_skills`
      - Track student skill levels

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users
*/

-- Skills table
CREATE TABLE IF NOT EXISTS skills (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  category text NOT NULL,
  description text,
  demand_score integer DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Courses table
CREATE TABLE IF NOT EXISTS courses (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text,
  duration_weeks integer NOT NULL,
  level text NOT NULL,
  instructor_name text NOT NULL,
  image_url text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Course Skills junction
CREATE TABLE IF NOT EXISTS course_skills (
  course_id uuid REFERENCES courses ON DELETE CASCADE,
  skill_id uuid REFERENCES skills ON DELETE CASCADE,
  PRIMARY KEY (course_id, skill_id)
);

-- Career Paths
CREATE TABLE IF NOT EXISTS career_paths (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text,
  demand_score integer DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Career Path Skills junction
CREATE TABLE IF NOT EXISTS career_path_skills (
  career_path_id uuid REFERENCES career_paths ON DELETE CASCADE,
  skill_id uuid REFERENCES skills ON DELETE CASCADE,
  PRIMARY KEY (career_path_id, skill_id)
);

-- Student Progress
CREATE TABLE IF NOT EXISTS student_progress (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users NOT NULL,
  course_id uuid REFERENCES courses NOT NULL,
  progress_percentage integer DEFAULT 0,
  completed boolean DEFAULT false,
  started_at timestamptz DEFAULT now(),
  completed_at timestamptz,
  UNIQUE(user_id, course_id)
);

-- Student Skills
CREATE TABLE IF NOT EXISTS student_skills (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users NOT NULL,
  skill_id uuid REFERENCES skills NOT NULL,
  level text NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  UNIQUE(user_id, skill_id)
);

-- Enable RLS
ALTER TABLE skills ENABLE ROW LEVEL SECURITY;
ALTER TABLE courses ENABLE ROW LEVEL SECURITY;
ALTER TABLE course_skills ENABLE ROW LEVEL SECURITY;
ALTER TABLE career_paths ENABLE ROW LEVEL SECURITY;
ALTER TABLE career_path_skills ENABLE ROW LEVEL SECURITY;
ALTER TABLE student_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE student_skills ENABLE ROW LEVEL SECURITY;

-- Policies

-- Skills (readable by all authenticated users)
CREATE POLICY "Skills are viewable by all authenticated users"
  ON skills FOR SELECT
  TO authenticated
  USING (true);

-- Courses (readable by all authenticated users)
CREATE POLICY "Courses are viewable by all authenticated users"
  ON courses FOR SELECT
  TO authenticated
  USING (true);

-- Course Skills (readable by all authenticated users)
CREATE POLICY "Course skills are viewable by all authenticated users"
  ON course_skills FOR SELECT
  TO authenticated
  USING (true);

-- Career Paths (readable by all authenticated users)
CREATE POLICY "Career paths are viewable by all authenticated users"
  ON career_paths FOR SELECT
  TO authenticated
  USING (true);

-- Career Path Skills (readable by all authenticated users)
CREATE POLICY "Career path skills are viewable by all authenticated users"
  ON career_path_skills FOR SELECT
  TO authenticated
  USING (true);

-- Student Progress (users can only view and modify their own progress)
CREATE POLICY "Users can view own progress"
  ON student_progress FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own progress"
  ON student_progress FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own progress"
  ON student_progress FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Student Skills (users can only view and modify their own skills)
CREATE POLICY "Users can view own skills"
  ON student_skills FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own skills"
  ON student_skills FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own skills"
  ON student_skills FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Update triggers
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_skills_updated_at
  BEFORE UPDATE ON skills
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_courses_updated_at
  BEFORE UPDATE ON courses
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_career_paths_updated_at
  BEFORE UPDATE ON career_paths
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_student_skills_updated_at
  BEFORE UPDATE ON student_skills
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();