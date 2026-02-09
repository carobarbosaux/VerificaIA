export interface Student {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  program: string;
  academicYear: string;
  semester: string;
  enrollmentId: string;
  enrollmentStep: number;
  totalSteps: number;
  progress: number;
}

export interface Enrollment {
  id: string;
  program: string;
  period: string;
  status: 'validated' | 'pending_payment' | 'in_progress' | 'pending_documents';
  enrollmentId: string;
}
