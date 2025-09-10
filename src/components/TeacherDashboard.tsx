import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  Users, 
  Play,
  Pause,
  UserCheck,
  UserX,
  Clock,
  AlertTriangle,
  LogOut,
  BookOpen,
  BarChart3,
  Calendar,
  Bell
} from 'lucide-react';

interface TeacherDashboardProps {
  onLogout: () => void;
}

const TeacherDashboard = ({ onLogout }: TeacherDashboardProps) => {
  const [activeSession, setActiveSession] = useState<boolean>(false);
  const [sessionTime, setSessionTime] = useState(0);

  // Mock data
  const todayClasses = [
    { 
      id: 1, 
      name: 'Data Structures & Algorithms', 
      time: '09:00 - 10:30', 
      room: 'CS-101',
      enrolled: 45,
      present: 42,
      status: 'completed'
    },
    { 
      id: 2, 
      name: 'Object Oriented Programming', 
      time: '11:00 - 12:30', 
      room: 'CS-102',
      enrolled: 38,
      present: 35,
      status: 'active'
    },
    { 
      id: 3, 
      name: 'Database Management Systems', 
      time: '14:00 - 15:30', 
      room: 'CS-103',
      enrolled: 42,
      present: 0,
      status: 'upcoming'
    }
  ];

  const recentAttendance = [
    { student: 'Alice Johnson', id: 'CS2021001', time: '11:05 AM', status: 'present' },
    { student: 'Bob Smith', id: 'CS2021002', time: '11:03 AM', status: 'present' },
    { student: 'Carol Brown', id: 'CS2021003', time: '11:07 AM', status: 'present' },
    { student: 'David Wilson', id: 'CS2021004', time: '11:02 AM', status: 'present' },
    { student: 'Emma Davis', id: 'CS2021005', time: '11:08 AM', status: 'present' }
  ];

  const lowAttendanceStudents = [
    { name: 'John Mitchell', id: 'CS2021015', attendance: 68.5, absences: 8 },
    { name: 'Sarah Parker', id: 'CS2021023', attendance: 72.1, absences: 6 },
    { name: 'Mike Rodriguez', id: 'CS2021031', attendance: 69.8, absences: 7 }
  ];

  const toggleSession = () => {
    setActiveSession(!activeSession);
    if (!activeSession) {
      setSessionTime(0);
      // In real app, start timer here
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-white border-b border-border shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <div className="bg-success p-2 rounded-lg mr-3">
                <BookOpen className="h-6 w-6 text-success-foreground" />
              </div>
              <div>
                <h1 className="text-xl font-semibold text-foreground">Teacher Dashboard</h1>
                <p className="text-sm text-muted-foreground">Dr. Sarah Wilson - Computer Science Department</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              {activeSession && (
                <Badge variant="secondary" className="bg-success text-success-foreground">
                  <div className="w-2 h-2 bg-success-foreground rounded-full mr-2 animate-pulse"></div>
                  Session Active
                </Badge>
              )}
              <Button variant="outline" size="sm">
                <Bell className="h-4 w-4 mr-2" />
                Alerts
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
        {/* Today's Classes */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-foreground mb-6">Today's Classes</h2>
          <div className="grid gap-6">
            {todayClasses.map((classItem) => (
              <Card key={classItem.id} className={`${
                classItem.status === 'active' ? 'ring-2 ring-success shadow-lg' : ''
              }`}>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-4">
                        <div>
                          <h3 className="text-lg font-semibold text-foreground">{classItem.name}</h3>
                          <p className="text-sm text-muted-foreground">
                            {classItem.time} • Room {classItem.room}
                          </p>
                        </div>
                        <Badge variant={
                          classItem.status === 'completed' ? 'secondary' :
                          classItem.status === 'active' ? 'default' : 'outline'
                        }>
                          {classItem.status.charAt(0).toUpperCase() + classItem.status.slice(1)}
                        </Badge>
                      </div>
                      <div className="mt-4 flex items-center space-x-6">
                        <div className="flex items-center">
                          <Users className="h-4 w-4 text-muted-foreground mr-2" />
                          <span className="text-sm">
                            {classItem.present}/{classItem.enrolled} Present
                          </span>
                        </div>
                        {classItem.status !== 'upcoming' && (
                          <div className="flex items-center">
                            <Progress 
                              value={(classItem.present / classItem.enrolled) * 100} 
                              className="w-24 mr-2" 
                            />
                            <span className="text-sm font-medium">
                              {Math.round((classItem.present / classItem.enrolled) * 100)}%
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      {classItem.status === 'active' && (
                        <Button 
                          variant={activeSession ? "destructive" : "default"}
                          onClick={toggleSession}
                          className="bg-gradient-to-r from-success to-green-600 hover:from-green-600 hover:to-success"
                        >
                          {activeSession ? (
                            <>
                              <Pause className="h-4 w-4 mr-2" />
                              End Session
                            </>
                          ) : (
                            <>
                              <Play className="h-4 w-4 mr-2" />
                              Start Session
                            </>
                          )}
                        </Button>
                      )}
                      {classItem.status === 'upcoming' && (
                        <Button variant="outline">
                          <Clock className="h-4 w-4 mr-2" />
                          Prepare Class
                        </Button>
                      )}
                      {classItem.status === 'completed' && (
                        <Button variant="outline">
                          <BarChart3 className="h-4 w-4 mr-2" />
                          View Report
                        </Button>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Live Attendance Feed */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <UserCheck className="h-5 w-5 mr-2 text-success" />
                Live Attendance Feed
              </CardTitle>
              <CardDescription>
                Recent check-ins for Object Oriented Programming
              </CardDescription>
            </CardHeader>
            <CardContent>
              {activeSession ? (
                <div className="space-y-3">
                  {recentAttendance.map((record, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div className="w-2 h-2 bg-success rounded-full"></div>
                        <div>
                          <p className="font-medium text-sm">{record.student}</p>
                          <p className="text-xs text-muted-foreground">{record.id}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium text-success">Present</p>
                        <p className="text-xs text-muted-foreground">{record.time}</p>
                      </div>
                    </div>
                  ))}
                  <div className="text-center pt-4">
                    <p className="text-sm text-muted-foreground">
                      Waiting for more students to check in...
                    </p>
                  </div>
                </div>
              ) : (
                <div className="text-center py-8">
                  <Clock className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">No active session</p>
                  <p className="text-sm text-muted-foreground">Start a class session to see live attendance</p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Low Attendance Alerts */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <AlertTriangle className="h-5 w-5 mr-2 text-destructive" />
                Low Attendance Alerts
              </CardTitle>
              <CardDescription>Students requiring attention</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {lowAttendanceStudents.map((student, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border border-destructive/20 rounded-lg bg-destructive/5">
                    <div>
                      <p className="font-medium text-sm">{student.name}</p>
                      <p className="text-xs text-muted-foreground">{student.id}</p>
                      <p className="text-xs text-destructive">
                        {student.absences} recent absences
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-bold text-destructive">
                        {student.attendance}%
                      </p>
                      <Button size="sm" variant="outline" className="mt-1">
                        Contact
                      </Button>
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
              <CardDescription>Common teaching tasks</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <Button variant="outline" className="h-24 flex-col">
                  <Calendar className="h-6 w-6 mb-2" />
                  Schedule Class
                </Button>
                <Button variant="outline" className="h-24 flex-col">
                  <BarChart3 className="h-6 w-6 mb-2" />
                  Attendance Reports
                </Button>
                <Button variant="outline" className="h-24 flex-col">
                  <Users className="h-6 w-6 mb-2" />
                  Student List
                </Button>
                <Button variant="outline" className="h-24 flex-col">
                  <Bell className="h-6 w-6 mb-2" />
                  Send Alerts
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default TeacherDashboard;