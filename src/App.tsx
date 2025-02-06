import React, { useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { DashboardLayout } from './components/DashboardLayout';
import { AuthGuard } from './components/AuthGuard';
import { Dashboard } from './pages/Dashboard';
import { Explore } from './pages/Explore';
import { Courses } from './pages/Courses';
import { Students } from './pages/Students';
import { Analytics } from './pages/Analytics';
import { Settings } from './pages/Settings';
import { Login } from './pages/Login';
import { supabase } from './lib/supabase';
import { useAuthStore } from './stores/authStore';

function App() {
  const { setUser, setSession } = useAuthStore();

  useEffect(() => {
    // Check active session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
    });

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, [setUser, setSession]);

  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Login />} />
      <Route
        path="/"
        element={
          <AuthGuard>
            <DashboardLayout>
              <Dashboard />
            </DashboardLayout>
          </AuthGuard>
        }
      />
      <Route
        path="/explore"
        element={
          <AuthGuard>
            <DashboardLayout>
              <Explore />
            </DashboardLayout>
          </AuthGuard>
        }
      />
      <Route
        path="/courses"
        element={
          <AuthGuard>
            <DashboardLayout>
              <Courses />
            </DashboardLayout>
          </AuthGuard>
        }
      />
      <Route
        path="/students"
        element={
          <AuthGuard>
            <DashboardLayout>
              <Students />
            </DashboardLayout>
          </AuthGuard>
        }
      />
      <Route
        path="/analytics"
        element={
          <AuthGuard>
            <DashboardLayout>
              <Analytics />
            </DashboardLayout>
          </AuthGuard>
        }
      />
      <Route
        path="/settings"
        element={
          <AuthGuard>
            <DashboardLayout>
              <Settings />
            </DashboardLayout>
          </AuthGuard>
        }
      />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App