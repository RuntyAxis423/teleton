import { User, Benefactor, Interaction, Commitment, KPI, Course, ImpactTemplate } from '../types';

export const mockUsers: User[] = [
  {
    id: '1',
    name: 'María González',
    email: 'maria.gonzalez@teleton.org',
    role: 'coordinador',
    crit: 'CDMX',
  },
  {
    id: '2',
    name: 'Carlos Mendoza',
    email: 'carlos.mendoza@teleton.org',
    role: 'promotor',
    crit: 'MTY',
  },
  {
    id: '3',
    name: 'Ana Rodríguez',
    email: 'ana.rodriguez@teleton.org',
    role: 'promotor',
    crit: 'GDL',
  },
];

export const mockBenefactors: Benefactor[] = [
  {
    id: '1',
    name: 'Grupo Empresarial López',
    email: 'contacto@grupolopez.com',
    phone: '+52 55 1234 5678',
    crit: 'CDMX',
    totalDonated: 250000,
    isVIP: true,
    lastInteraction: new Date('2024-01-15'),
    status: 'active',
  },
  {
    id: '2',
    name: 'Fundación Corazón',
    email: 'info@fundacioncorazon.org',
    phone: '+52 81 9876 5432',
    crit: 'MTY',
    totalDonated: 180000,
    isVIP: true,
    lastInteraction: new Date('2024-01-10'),
    status: 'active',
  },
  {
    id: '3',
    name: 'Comercializadora Tapatía',
    email: 'donaciones@comercializadoratapatia.com',
    phone: '+52 33 5555 7777',
    crit: 'GDL',
    totalDonated: 95000,
    isVIP: false,
    lastInteraction: new Date('2024-01-08'),
    status: 'pending',
  },
];

export const mockInteractions: Interaction[] = [
  {
    id: '1',
    benefactorId: '1',
    date: new Date('2024-01-15'),
    type: 'meeting',
    notes: 'Reunión para renovación de convenio anual. Interesados en apoyar nuevos programas de rehabilitación.',
    responsibleId: '1',
  },
  {
    id: '2',
    benefactorId: '2',
    date: new Date('2024-01-10'),
    type: 'call',
    notes: 'Llamada de seguimiento post-evento navideño. Muy satisfechos con la organización.',
    responsibleId: '2',
  },
];

export const mockCommitments: Commitment[] = [
  {
    id: '1',
    benefactorId: '1',
    description: 'Envío de informe trimestral de impacto con casos específicos',
    promiseDate: new Date('2024-01-20'),
    dueDate: new Date('2024-01-22'),
    status: 'pending',
  },
  {
    id: '2',
    benefactorId: '2',
    description: 'Coordinación de visita a instalaciones para marzo',
    promiseDate: new Date('2024-01-25'),
    dueDate: new Date('2024-01-27'),
    status: 'overdue',
  },
];

export const mockKPIs: KPI[] = [
  {
    crit: 'CDMX',
    nps: 8.5,
    servqual: 9.2,
    date: new Date('2024-01-01'),
    totalBenefactors: 150,
    activeCommitments: 45,
  },
  {
    crit: 'MTY',
    nps: 7.8,
    servqual: 8.9,
    date: new Date('2024-01-01'),
    totalBenefactors: 120,
    activeCommitments: 38,
  },
  {
    crit: 'GDL',
    nps: 6.2,
    servqual: 7.5,
    date: new Date('2024-01-01'),
    totalBenefactors: 95,
    activeCommitments: 28,
  },
];

export const mockCourses: Course[] = [
  {
    id: '1',
    title: 'Atención al Benefactor VIP',
    description: 'Estrategias avanzadas para la gestión de grandes donantes',
    modules: [
      { id: '1', title: 'Perfil del Benefactor VIP', content: '', completed: true, score: 95 },
      { id: '2', title: 'Comunicación Efectiva', content: '', completed: false },
    ],
    minScore: 80,
    duration: 120,
  },
  {
    id: '2',
    title: 'Transparencia y Rendición de Cuentas',
    description: 'Mejores prácticas para reporteo de impacto',
    modules: [
      { id: '3', title: 'Indicadores de Impacto', content: '', completed: false },
      { id: '4', title: 'Elaboración de Reportes', content: '', completed: false },
    ],
    minScore: 80,
    duration: 90,
  },
];

export const mockImpactTemplates: ImpactTemplate[] = [
  {
    id: '1',
    type: 'letter',
    title: 'Carta de Agradecimiento Personal',
    fields: ['benefactorName', 'donationAmount', 'impactDescription', 'testimonial'],
    preview: 'Estimado [benefactorName], gracias a su generosa donación de $[donationAmount]...',
  },
  {
    id: '2',
    type: 'infographic',
    title: 'Infografía de Impacto Trimestral',
    fields: ['period', 'beneficiariesServed', 'programsSupported', 'successStories'],
    preview: 'Su apoyo en [period] logró impactar a [beneficiariesServed] beneficiarios...',
  },
];