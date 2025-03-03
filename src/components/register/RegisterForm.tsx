
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import { Form } from '@/components/ui/form';
import Button from '@/components/ui-custom/Button';
import PersonalInfoFields from './PersonalInfoFields';
import PasswordFields from './PasswordFields';
import RoleAndCourseFields from './RoleAndCourseFields';
import { registerSchema, RegisterFormValues, Course } from './RegisterFormSchema';

interface RegisterFormProps {
  courses: Course[];
  isLoadingCourses: boolean;
}

const RegisterForm: React.FC<RegisterFormProps> = ({ courses, isLoadingCourses }) => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const form = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      surname: "",
      gender: undefined,
      email: "",
      idNumber: "",
      password: "",
      confirmPassword: "",
      role: undefined,
      course: "",
    },
    mode: "onChange",
  });

  const onSubmit = async (values: RegisterFormValues) => {
    setIsSubmitting(true);
    
    setTimeout(() => {
      try {
        console.log("Form submitted:", values);
        
        toast.success("Registration successful!", {
          description: "Your account has been created. Please log in.",
        });
        
        navigate("/login");
      } catch (error) {
        toast.error("Registration failed", {
          description: "There was an error creating your account. Please try again.",
        });
      } finally {
        setIsSubmitting(false);
      }
    }, 1500);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <PersonalInfoFields control={form.control} />
        <PasswordFields control={form.control} />
        <RoleAndCourseFields 
          control={form.control} 
          courses={courses} 
          isLoadingCourses={isLoadingCourses} 
        />
        
        <div className="flex flex-col space-y-4 pt-4">
          <Button 
            type="submit" 
            variant="primary" 
            loading={isSubmitting}
            className="w-full"
          >
            Create Account
          </Button>
          
          <div className="text-center">
            <span className="text-eduText-light">Already have an account? </span>
            <Button variant="link" to="/login">
              Log In
            </Button>
          </div>
        </div>
      </form>
    </Form>
  );
};

export default RegisterForm;
