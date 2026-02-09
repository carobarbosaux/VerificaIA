export type DocumentStatus =
  | 'not_uploaded'
  | 'pending'
  | 'validating'
  | 'validated'
  | 'rejected';

export type DocumentCategory =
  | 'identity'
  | 'academic'
  | 'financial'
  | 'legal'
  | 'other';

export interface Document {
  id: string;
  name: string;
  category: DocumentCategory;
  status: DocumentStatus;
  required: boolean;
  deadline: Date | null;
  uploadedDate: Date | null;
  fileUrl: string | null;
  rejectionReason: string | null;
  resubmitAttempts: number;
  maxResubmitAttempts: number;
  phase: 1 | 2;
  order: number;
  helpText?: string;
}

export interface DocumentGroup {
  category: DocumentCategory;
  label: string;
  documents: Document[];
}
