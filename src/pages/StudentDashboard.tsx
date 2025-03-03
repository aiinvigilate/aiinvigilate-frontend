import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AdminNavbar from '@/components/layout/AdminNavbar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { User, BookOpen, FileText, Award } from 'lucide-react';
import { toast } from "@/components/ui/use-toast";

// Import refactored components
import {
  ProfileCard,
  StatsCards,
  UpcomingTests,
  RecentResults,
  ModuleTable,
  TestsList,
  ResultsTable,
  EditProfileDialog,
  Student,
  Module,
  Test,
  TestResult,
  ProfileFormData
} from '@/components/student';

// Mock user data
const studentUser: Student = {
  id: 1,
  idNumber: "STU001",
  name: "John",
  surname: "Doe",
  email: "john.doe@example.com",
  profileImage: "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?q=80&w=150&auto=format&fit=crop",
  role: "student",
  program: "Bachelor of Computer Science",
  year: 2,
  enrollmentDate: "2022-02-15",
};

// Mock modules
const mockModules: Module[] = [
  { code: "CS101", name: "Introduction to Computer Science", credits: 15, grade: "A", completionStatus: "completed" },
  { code: "CS202", name: "Data Structures and Algorithms", credits: 20, grade: "B+", completionStatus: "completed" },
  { code: "CS303", name: "Database Management Systems", credits: 15, grade: "A-", completionStatus: "in-progress" },
  { code: "CS404", name: "Software Engineering", credits: 20, grade: "TBD", completionStatus: "in-progress" },
  { code: "CS505", name: "Web Development", credits: 15, grade: "TBD", completionStatus: "upcoming" },
  { code: "CS606", name: "Artificial Intelligence", credits: 20, grade: "TBD", completionStatus: "upcoming" },
];

// Mock available tests
const mockAvailableTests: Test[] = [
  { id: 1, name: "Database Midterm Exam", module: "CS303", duration: "90 min", dueDate: "2024-05-20T14:30:00", status: "upcoming" },
  { id: 2, name: "Software Engineering Quiz", module: "CS404", duration: "30 min", dueDate: "2024-05-18T10:00:00", status: "upcoming" },
  { id: 3, name: "Database Management Lab Test", module: "CS303", duration: "60 min", dueDate: "2024-05-15T15:00:00", status: "pending" },
  { id: 4, name: "Software Design Patterns Quiz", module: "CS404", duration: "45 min", dueDate: "2024-05-10T11:30:00", status: "completed" },
];

// Mock test results
const mockTestResults: TestResult[] = [
  { id: 1, name: "Introduction to Programming Final", module: "CS101", score: 92, maxScore: 100, date: "2022-06-15" },
  { id: 2, name: "Data Structures Midterm", module: "CS202", score: 85, maxScore: 100, date: "2023-03-22" },
  { id: 3, name: "Algorithms Quiz", module: "CS202", score: 78, maxScore: 100, date: "2023-04-05" },
  { id: 4, name: "Database Concepts", module: "CS303", score: 88, maxScore: 100, date: "2023-11-10" },
  { id: 5, name: "Software Design Patterns Quiz", module: "CS404", score: 75, maxScore: 100, date: "2024-05-10" },
];

const StudentDashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("overview");
  
  // Filtering for modules tab
  const [moduleStatusFilter, setModuleStatusFilter] = useState("all");
  const filteredModules = mockModules.filter(module => 
    moduleStatusFilter === "all" || module.completionStatus === moduleStatusFilter
  );
  
  // Calculate upcoming tests
  const upcomingTests = mockAvailableTests.filter(test => 
    test.status === "upcoming" || test.status === "pending"
  );
  
  // Dialog states
  const [isEditProfileOpen, setIsEditProfileOpen] = useState(false);
  
  // Form data
  const [profileForm, setProfileForm] = useState<ProfileFormData>({
    name: studentUser.name,
    surname: studentUser.surname,
    email: studentUser.email,
    profileImage: studentUser.profileImage,
  });

  // Handlers
  const handleEditProfileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProfileForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  
  const handleSaveProfile = () => {
    // In a real application, this would send the data to an API
    toast({
      title: "Profile Updated",
      description: "Your profile changes have been saved successfully.",
    });
    setIsEditProfileOpen(false);
  };
  
  return (
    <div className="min-h-screen bg-eduPrimary-light">
      <AdminNavbar userRole="student" userName={`${studentUser.name} ${studentUser.surname}`} />
      
      <div className="container mx-auto max-w-7xl py-8 px-4 md:px-8">
        <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid grid-cols-4 md:w-[600px]">
            <TabsTrigger value="overview" className="flex items-center justify-center">
              <User className="mr-2 h-4 w-4" />
              <span>Overview</span>
            </TabsTrigger>
            <TabsTrigger value="modules" className="flex items-center justify-center">
              <BookOpen className="mr-2 h-4 w-4" />
              <span>Modules</span>
            </TabsTrigger>
            <TabsTrigger value="tests" className="flex items-center justify-center">
              <FileText className="mr-2 h-4 w-4" />
              <span>Tests</span>
            </TabsTrigger>
            <TabsTrigger value="results" className="flex items-center justify-center">
              <Award className="mr-2 h-4 w-4" />
              <span>Results</span>
            </TabsTrigger>
          </TabsList>
          
          {/* Overview Tab */}
          <TabsContent value="overview">
            <div className="grid grid-cols-1 gap-6">
              {/* Profile Card - Full Width */}
              <ProfileCard 
                student={studentUser} 
                onEditProfile={() => setIsEditProfileOpen(true)} 
              />
              
              {/* Upcoming Tests - Below Profile */}
              <UpcomingTests tests={upcomingTests} />
            </div>
          </TabsContent>
          
          {/* Modules Tab */}
          <TabsContent value="modules">
            <ModuleTable 
              modules={filteredModules}
              statusFilter={moduleStatusFilter}
              onFilterChange={setModuleStatusFilter}
            />
          </TabsContent>
          
          {/* Tests Tab */}
          <TabsContent value="tests">
            <TestsList 
              tests={mockAvailableTests}
              testResults={mockTestResults}
            />
          </TabsContent>
          
          {/* Results Tab */}
          <TabsContent value="results">
            <ResultsTable 
              results={mockTestResults}
            />
          </TabsContent>
        </Tabs>
      </div>
      
      {/* Dialogs */}
      <EditProfileDialog
        open={isEditProfileOpen}
        onOpenChange={setIsEditProfileOpen}
        profileForm={profileForm}
        onChange={handleEditProfileChange}
        onSave={handleSaveProfile}
      />
    </div>
  );
};

export default StudentDashboard;
