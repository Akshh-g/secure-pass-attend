import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { GraduationCap, Shield, Users, CheckCircle } from 'lucide-react';

type UserRole = 'admin' | 'teacher' | 'student' | null;

interface LoginFormProps {
  onLogin: (role: UserRole) => void;
}

const LoginForm = ({ onLogin }: LoginFormProps) => {
  const [selectedRole, setSelectedRole] = useState<string>('');
  const [credentials, setCredentials] = useState({ username: '', password: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedRole && credentials.username && credentials.password) {
      onLogin(selectedRole as UserRole);
    }
  };

  const roleFeatures = {
    admin: {
      icon: Shield,
      title: 'Administrator',
      description: 'Manage colleges, classes, students, and teachers',
      features: ['User Management', 'System Analytics', 'Report Generation', 'Security Settings']
    },
    teacher: {
      icon: GraduationCap,
      title: 'Teacher',
      description: 'Conduct classes and monitor attendance',
      features: ['Start Class Sessions', 'Live Attendance', 'Student Reports', 'Absence Alerts']
    },
    student: {
      icon: Users,
      title: 'Student',
      description: 'Mark attendance with biometric verification',
      features: ['Biometric Check-in', 'Attendance History', 'Performance Tracking', 'Alerts & Reminders']
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50 flex items-center justify-center p-4">
      <div className="max-w-6xl w-full">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-6">
            <div className="bg-gradient-to-r from-primary to-blue-600 p-4 rounded-full">
              <GraduationCap className="h-12 w-12 text-white" />
            </div>
          </div>
          <h1 className="text-4xl font-bold text-foreground mb-4">
            College Attendance Monitoring System
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Secure, transparent, and efficient attendance tracking with biometric verification
          </p>
        </div>

        {/* Role Selection Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          {Object.entries(roleFeatures).map(([role, config]) => {
            const Icon = config.icon;
            return (
              <Card 
                key={role}
                className={`cursor-pointer transition-all duration-300 hover:shadow-lg ${
                  selectedRole === role ? 'ring-2 ring-primary shadow-lg' : ''
                }`}
                onClick={() => setSelectedRole(role)}
              >
                <CardHeader className="text-center">
                  <div className={`mx-auto w-16 h-16 rounded-full flex items-center justify-center mb-4 ${
                    selectedRole === role 
                      ? 'bg-gradient-to-r from-primary to-blue-600' 
                      : 'bg-gradient-to-r from-gray-100 to-gray-200'
                  }`}>
                    <Icon className={`h-8 w-8 ${
                      selectedRole === role ? 'text-white' : 'text-gray-600'
                    }`} />
                  </div>
                  <CardTitle className="text-xl">{config.title}</CardTitle>
                  <CardDescription className="text-sm">{config.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {config.features.map((feature) => (
                      <li key={feature} className="flex items-center text-sm text-muted-foreground">
                        <CheckCircle className="h-4 w-4 text-success mr-2 flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Login Form */}
        <Card className="max-w-md mx-auto">
          <CardHeader className="text-center">
            <CardTitle>Sign In</CardTitle>
            <CardDescription>
              {selectedRole ? `Login as ${roleFeatures[selectedRole as keyof typeof roleFeatures].title}` : 'Please select your role above'}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="username">Username / Email</Label>
                <Input
                  id="username"
                  type="text"
                  placeholder="Enter your username"
                  value={credentials.username}
                  onChange={(e) => setCredentials({ ...credentials, username: e.target.value })}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  value={credentials.password}
                  onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
                  required
                />
              </div>
              <Button 
                type="submit" 
                className="w-full bg-gradient-to-r from-primary to-blue-600 hover:from-blue-600 hover:to-primary"
                disabled={!selectedRole}
              >
                Sign In as {selectedRole ? roleFeatures[selectedRole as keyof typeof roleFeatures].title : 'User'}
              </Button>
            </form>
            
            {/* Demo Credentials */}
            <div className="mt-6 p-4 bg-muted rounded-lg">
              <p className="text-sm font-medium text-foreground mb-2">Demo Credentials:</p>
              <div className="text-xs text-muted-foreground space-y-1">
                <p><strong>Username:</strong> demo</p>
                <p><strong>Password:</strong> password</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default LoginForm;