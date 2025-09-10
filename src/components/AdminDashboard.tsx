import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  Users, 
  GraduationCap, 
  Building, 
  TrendingUp, 
  Clock, 
  AlertTriangle,
  LogOut,
  Settings,
  BarChart3,
  UserCheck,
  UserX
} from 'lucide-react';

interface AdminDashboardProps {
  onLogout: () => void;
}

const AdminDashboard = ({ onLogout }: AdminDashboardProps) => {
  // Mock data
  const stats = {
    totalStudents: 2847,
    totalTeachers: 142,
    totalClasses: 85,
    todayAttendance: 78.5,
    activeClasses: 12,
    lowAttendanceAlerts: 23
  };

  const recentActivities = [
    { type: 'class', message: 'Mathematics 101 session started by Dr. Smith', time: '10 mins ago' },
    { type: 'alert', message: '15 students below 75% attendance threshold', time: '25 mins ago' },
    { type: 'enrollment', message: 'New student enrollment: John Doe (CS Department)', time: '1 hour ago' },
    { type: 'class', message: 'Physics Lab session completed', time: '2 hours ago' }
  ];

  const departmentStats = [
    { name: 'Computer Science', students: 650, attendance: 82.1 },
    { name: 'Electrical Engineering', students: 580, attendance: 79.3 },
    { name: 'Mechanical Engineering', students: 520, attendance: 76.8 },
    { name: 'Civil Engineering', students: 480, attendance: 74.2 },
    { name: 'Business Administration', students: 617, attendance: 81.5 }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-white border-b border-border shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <div className="bg-primary p-2 rounded-lg mr-3">
                <GraduationCap className="h-6 w-6 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-xl font-semibold text-foreground">Admin Dashboard</h1>
                <p className="text-sm text-muted-foreground">College Attendance Management</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="outline" size="sm">
                <Settings className="h-4 w-4 mr-2" />
                Settings
              </Button>
              <Button variant="outline" size="sm" onClick={onLogout}>
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <Users className="h-8 w-8 text-primary" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-muted-foreground">Total Students</p>
                  <p className="text-2xl font-bold">{stats.totalStudents.toLocaleString()}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <GraduationCap className="h-8 w-8 text-success" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-muted-foreground">Total Teachers</p>
                  <p className="text-2xl font-bold">{stats.totalTeachers}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <Building className="h-8 w-8 text-warning" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-muted-foreground">Total Classes</p>
                  <p className="text-2xl font-bold">{stats.totalClasses}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <TrendingUp className="h-8 w-8 text-primary" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-muted-foreground">Today's Attendance</p>
                  <p className="text-2xl font-bold">{stats.todayAttendance}%</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <Clock className="h-8 w-8 text-success" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-muted-foreground">Active Classes</p>
                  <p className="text-2xl font-bold">{stats.activeClasses}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <AlertTriangle className="h-8 w-8 text-destructive" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-muted-foreground">Low Attendance</p>
                  <p className="text-2xl font-bold">{stats.lowAttendanceAlerts}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Department Statistics */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <BarChart3 className="h-5 w-5 mr-2" />
                Department Attendance Overview
              </CardTitle>
              <CardDescription>Attendance rates by department</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {departmentStats.map((dept) => (
                  <div key={dept.name} className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="font-medium">{dept.name}</span>
                      <span className="text-muted-foreground">{dept.students} students</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Progress value={dept.attendance} className="flex-1" />
                      <span className="text-sm font-medium w-12">{dept.attendance}%</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Recent Activities */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Activities</CardTitle>
              <CardDescription>Latest system activities and alerts</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivities.map((activity, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <div className={`rounded-full p-2 ${
                      activity.type === 'class' ? 'bg-success/10' :
                      activity.type === 'alert' ? 'bg-destructive/10' :
                      'bg-primary/10'
                    }`}>
                      {activity.type === 'class' ? (
                        <GraduationCap className={`h-4 w-4 ${
                          activity.type === 'class' ? 'text-success' : ''
                        }`} />
                      ) : activity.type === 'alert' ? (
                        <AlertTriangle className="h-4 w-4 text-destructive" />
                      ) : (
                        <UserCheck className="h-4 w-4 text-primary" />
                      )}
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">{activity.message}</p>
                      <p className="text-xs text-muted-foreground">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="mt-8">
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
              <CardDescription>Common administrative tasks</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <Button variant="outline" className="h-24 flex-col">
                  <Users className="h-6 w-6 mb-2" />
                  Manage Students
                </Button>
                <Button variant="outline" className="h-24 flex-col">
                  <GraduationCap className="h-6 w-6 mb-2" />
                  Manage Teachers
                </Button>
                <Button variant="outline" className="h-24 flex-col">
                  <Building className="h-6 w-6 mb-2" />
                  Manage Classes
                </Button>
                <Button variant="outline" className="h-24 flex-col">
                  <BarChart3 className="h-6 w-6 mb-2" />
                  Generate Reports
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;