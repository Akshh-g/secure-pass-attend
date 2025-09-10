import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  Fingerprint,
  Camera,
  CheckCircle,
  AlertTriangle,
  Clock,
  LogOut,
  Calendar,
  TrendingUp,
  Bell,
  BookOpen,
  User,
  Shield
} from 'lucide-react';
import BiometricVerification from '@/components/BiometricVerification';

interface StudentDashboardProps {
  onLogout: () => void;
}

const StudentDashboard = ({ onLogout }: StudentDashboardProps) => {
  const [showBiometric, setShowBiometric] = useState(false);
  
  // Mock data
  const studentInfo = {
    name: 'Alex Johnson',
    id: 'CS2021001',
    department: 'Computer Science',
    semester: '6th Semester',
    overallAttendance: 85.2,
    requiredAttendance: 75
  };

  const currentClass = {
    name: 'Object Oriented Programming',
    teacher: 'Dr. Sarah Wilson',
    room: 'CS-102',
    time: '11:00 - 12:30',
    isActive: true,
    hasMarked: false
  };

  const recentClasses = [
    { subject: 'Data Structures', date: 'Today, 9:00 AM', attendance: 'Present', status: 'completed' },
    { subject: 'Database Systems', date: 'Yesterday, 2:00 PM', attendance: 'Present', status: 'completed' },
    { subject: 'Software Engineering', date: 'Yesterday, 11:00 AM', attendance: 'Absent', status: 'completed' },
    { subject: 'Computer Networks', date: 'Oct 15, 3:00 PM', attendance: 'Present', status: 'completed' }
  ];

  const subjectAttendance = [
    { subject: 'Data Structures & Algorithms', present: 28, total: 32, percentage: 87.5 },
    { subject: 'Object Oriented Programming', present: 26, total: 30, percentage: 86.7 },
    { subject: 'Database Management Systems', present: 24, total: 29, percentage: 82.8 },
    { subject: 'Software Engineering', present: 22, total: 28, percentage: 78.6 },
    { subject: 'Computer Networks', present: 20, total: 26, percentage: 76.9 }
  ];

  const handleBiometricSuccess = () => {
    setShowBiometric(false);
    // In real app, mark attendance here
  };

  const getAttendanceColor = (percentage: number) => {
    if (percentage >= 85) return 'text-success';
    if (percentage >= 75) return 'text-warning';
    return 'text-destructive';
  };

  const getAttendanceVariant = (percentage: number) => {
    if (percentage >= 85) return 'default';
    if (percentage >= 75) return 'secondary';
    return 'destructive';
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-white border-b border-border shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <div className="bg-primary p-2 rounded-lg mr-3">
                <User className="h-6 w-6 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-xl font-semibold text-foreground">Student Dashboard</h1>
                <p className="text-sm text-muted-foreground">{studentInfo.name} - {studentInfo.id}</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Badge variant="secondary" className={`${getAttendanceColor(studentInfo.overallAttendance)}`}>
                {studentInfo.overallAttendance}% Attendance
              </Badge>
              <Button variant="outline" size="sm">
                <Bell className="h-4 w-4 mr-2" />
                Notifications
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
        {/* Student Info Card */}
        <Card className="mb-8">
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="w-20 h-20 bg-gradient-to-r from-primary to-blue-600 rounded-full flex items-center justify-center mx-auto mb-3">
                  <User className="h-10 w-10 text-white" />
                </div>
                <h3 className="font-semibold">{studentInfo.name}</h3>
                <p className="text-sm text-muted-foreground">{studentInfo.id}</p>
              </div>
              <div className="text-center">
                <TrendingUp className="h-8 w-8 text-primary mx-auto mb-2" />
                <p className="text-2xl font-bold text-foreground">{studentInfo.overallAttendance}%</p>
                <p className="text-sm text-muted-foreground">Overall Attendance</p>
              </div>
              <div className="text-center">
                <BookOpen className="h-8 w-8 text-success mx-auto mb-2" />
                <p className="text-lg font-semibold">{studentInfo.department}</p>
                <p className="text-sm text-muted-foreground">{studentInfo.semester}</p>
              </div>
              <div className="text-center">
                {studentInfo.overallAttendance >= studentInfo.requiredAttendance ? (
                  <CheckCircle className="h-8 w-8 text-success mx-auto mb-2" />
                ) : (
                  <AlertTriangle className="h-8 w-8 text-destructive mx-auto mb-2" />
                )}
                <p className="text-lg font-semibold">
                  {studentInfo.overallAttendance >= studentInfo.requiredAttendance ? 'On Track' : 'At Risk'}
                </p>
                <p className="text-sm text-muted-foreground">
                  Required: {studentInfo.requiredAttendance}%
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Current Class */}
        {currentClass.isActive && (
          <Card className="mb-8 ring-2 ring-success shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Clock className="h-5 w-5 mr-2 text-success" />
                Current Class Session
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">{currentClass.name}</h3>
                  <div className="space-y-1 text-sm text-muted-foreground">
                    <p>Teacher: {currentClass.teacher}</p>
                    <p>Room: {currentClass.room}</p>
                    <p>Time: {currentClass.time}</p>
                  </div>
                </div>
                <div className="text-center">
                  {currentClass.hasMarked ? (
                    <div className="text-center">
                      <CheckCircle className="h-12 w-12 text-success mx-auto mb-2" />
                      <p className="text-sm font-medium text-success">Attendance Marked</p>
                    </div>
                  ) : (
                    <Button 
                      size="lg" 
                      className="bg-gradient-to-r from-success to-green-600 hover:from-green-600 hover:to-success"
                      onClick={() => setShowBiometric(true)}
                    >
                      <Fingerprint className="h-5 w-5 mr-2" />
                      Mark Attendance
                    </Button>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Subject-wise Attendance */}
          <Card>
            <CardHeader>
              <CardTitle>Subject-wise Attendance</CardTitle>
              <CardDescription>Your attendance for each subject</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {subjectAttendance.map((subject) => (
                  <div key={subject.subject} className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="font-medium">{subject.subject}</span>
                      <span className="text-muted-foreground">
                        {subject.present}/{subject.total} classes
                      </span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Progress 
                        value={subject.percentage} 
                        className="flex-1"
                      />
                      <Badge variant={getAttendanceVariant(subject.percentage)} className="w-16 justify-center">
                        {subject.percentage}%
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Recent Classes */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Classes</CardTitle>
              <CardDescription>Your attendance history</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {recentClasses.map((classItem, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <p className="font-medium text-sm">{classItem.subject}</p>
                      <p className="text-xs text-muted-foreground">{classItem.date}</p>
                    </div>
                    <Badge variant={classItem.attendance === 'Present' ? 'default' : 'destructive'}>
                      {classItem.attendance === 'Present' ? (
                        <CheckCircle className="h-3 w-3 mr-1" />
                      ) : (
                        <AlertTriangle className="h-3 w-3 mr-1" />
                      )}
                      {classItem.attendance}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Alerts and Reminders */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Bell className="h-5 w-5 mr-2" />
              Alerts & Reminders
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center p-3 bg-warning/10 border border-warning/20 rounded-lg">
                <AlertTriangle className="h-5 w-5 text-warning mr-3" />
                <div>
                  <p className="font-medium text-sm">Software Engineering attendance is below 80%</p>
                  <p className="text-xs text-muted-foreground">Attend the next 3 classes to improve your percentage</p>
                </div>
              </div>
              <div className="flex items-center p-3 bg-primary/10 border border-primary/20 rounded-lg">
                <Calendar className="h-5 w-5 text-primary mr-3" />
                <div>
                  <p className="font-medium text-sm">Upcoming class: Database Systems at 2:00 PM</p>
                  <p className="text-xs text-muted-foreground">Room CS-103 with Prof. Michael Brown</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Biometric Verification Modal */}
      {showBiometric && (
        <BiometricVerification 
          onSuccess={handleBiometricSuccess}
          onCancel={() => setShowBiometric(false)}
        />
      )}
    </div>
  );
};

export default StudentDashboard;