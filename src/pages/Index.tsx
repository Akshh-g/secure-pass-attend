import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { GraduationCap, Shield, Users, CheckCircle } from 'lucide-react';
import LoginForm from '@/components/LoginForm';
import AdminDashboard from '@/components/AdminDashboard';
import TeacherDashboard from '@/components/TeacherDashboard';
import StudentDashboard from '@/components/StudentDashboard';

type UserRole = 'admin' | 'teacher' | 'student' | null;

const Index = () => {
  const [currentUser, setCurrentUser] = useState<UserRole>(null);

  const handleLogin = (role: UserRole) => {
    setCurrentUser(role);
  };

  const handleLogout = () => {
    setCurrentUser(null);
  };

  if (!currentUser) {
    return <LoginForm onLogin={handleLogin} />;
  }

  return (
    <div className="min-h-screen bg-background">
      {currentUser === 'admin' && <AdminDashboard onLogout={handleLogout} />}
      {currentUser === 'teacher' && <TeacherDashboard onLogout={handleLogout} />}
      {currentUser === 'student' && <StudentDashboard onLogout={handleLogout} />}
    </div>
  );
};

export default Index;