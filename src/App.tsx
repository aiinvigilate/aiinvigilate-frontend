
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Exam from "./pages/Exam";
import Login from "./pages/Login";
import Register from "./pages/Register";
import NotFound from "./pages/NotFound";
import AdminDashboard from "./pages/AdminDashboard";
import LecturerDashboard from "./pages/LecturerDashboard";
import LecturerReports from "./pages/LecturerReports";
import LecturerTestResults from "./pages/LecturerTestResults";
import StudentDashboard from "./pages/StudentDashboard";
import Results from "./pages/Results";
import TestDetails from "./pages/TestDetails";
import ModuleTests from "./pages/ModuleTests";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/exam" element={<Exam />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/lecturer" element={<LecturerDashboard />} />
          <Route path="/lecturer/reports" element={<LecturerReports />} />
          <Route path="/lecturer/results" element={<LecturerTestResults />} />
          <Route path="/student" element={<StudentDashboard />} />
          <Route path="/results" element={<Results />} />
          <Route path="/test-details" element={<TestDetails />} />
          <Route path="/module-tests" element={<ModuleTests />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
