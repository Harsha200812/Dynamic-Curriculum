# Dynamic Curriculum

A modern web application for managing and delivering educational content with real-time analytics and student tracking.

## 🚀 Features

- **Authentication System**: Secure login and signup functionality using Supabase
- **Dashboard**: Comprehensive overview of educational metrics and progress
- **Course Management**: Create and manage educational courses
- **Student Tracking**: Monitor student progress and engagement
- **Analytics**: Visualize educational data using Chart.js
- **Responsive Design**: Modern UI built with Tailwind CSS

## 🛠️ Tech Stack

- **Frontend Framework**: React 18 with TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **State Management**: Zustand
- **Authentication**: Supabase Auth
- **Data Visualization**: Chart.js
- **Routing**: React Router v6
- **Icons**: Lucide React

## 📋 Prerequisites

- Node.js (Latest LTS version recommended)
- npm or yarn package manager
- Supabase account and project

## 🔧 Installation

1. Clone the repository:
   ```bash
   git clone [[your-repository-url]](https://github.com/Harsha200812/Dynamic-Curriculum.git)
   cd Dynamic-Curriculum
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

3. Create a `.env` file in the root directory and add your Supabase credentials:
   ```
   VITE_SUPABASE_URL=your_supabase_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

4. Start the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

## 🏗️ Project Structure

```
src/
├── components/     # Reusable UI components
├── lib/           # Utility functions and configurations
├── pages/         # Page components
├── stores/        # Zustand state management
├── types.ts       # TypeScript type definitions
├── App.tsx        # Main application component
└── main.tsx       # Application entry point
```

## 🚀 Deployment

The project is configured for deployment on Netlify. Simply connect your repository to Netlify, and it will automatically deploy your application.

## 📝 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 🔒 Environment Variables

Create a `.env` file in the root directory with the following variables:

```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 👥 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📞 Support

For support, please open an issue in the GitHub repository or contact the maintainers. 
