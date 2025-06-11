export interface User {
  id: string;
  name: string;
  email: string;
  role: 'promotor' | 'coordinador';
  crit: string;
  avatar?: string;
}

export interface Benefactor {
  id: string;
  name: string;
  email: string;
  phone: string;
  crit: string;
  totalDonated: number;
  isVIP: boolean;
  lastInteraction?: Date;
  status: 'active' | 'pending' | 'inactive';
}

export interface Interaction {
  id: string;
  benefactorId: string;
  date: Date;
  type: 'call' | 'email' | 'meeting' | 'donation';
  notes: string;
  responsibleId: string;
  attachments?: string[];
}

export interface Commitment {
  id: string;
  benefactorId: string;
  description: string;
  promiseDate: Date;
  dueDate: Date;
  status: 'pending' | 'completed' | 'overdue';
  evidence?: string[];
}

export interface KPI {
  crit: string;
  nps: number;
  servqual: number;
  date: Date;
  totalBenefactors: number;
  activeCommitments: number;
}

export interface Course {
  id: string;
  title: string;
  description: string;
  modules: CourseModule[];
  minScore: number;
  duration: number;
}

export interface CourseModule {
  id: string;
  title: string;
  content: string;
  completed: boolean;
  score?: number;
}

export interface ImpactTemplate {
  id: string;
  type: 'video' | 'letter' | 'infographic';
  title: string;
  fields: string[];
  preview: string;
}