import {
  Linkedin,
  Twitter,
  Facebook,
  Play,
  Briefcase,
  Users,
  ShieldCheck,
  Search,
  BookOpen,
  ClipboardList,
  Sparkles,
  Globe,
  CalendarDays,
  MapPin,
  Star
} from 'lucide-react';

export const topHeaderInfo = {
  email: 'hello@quickhire.com',
  phone: '+1 (800) 555-0199',
  socials: [
    { label: 'LinkedIn', icon: Linkedin, url: '#' },
    { label: 'Twitter', icon: Twitter, url: '#' },
    { label: 'Facebook', icon: Facebook, url: '#' }
  ]
};

export const heroStats = [
  { value: '10K+', label: 'Jobs', icon: Briefcase },
  { value: '5K+', label: 'Companies', icon: Users },
  { value: '20K+', label: 'Candidates', icon: ShieldCheck }
];

export const aboutFeatures = [
  {
    title: 'Personalized job matches',
    description: 'AI-powered recommendations tailored to your skills and ambitions.',
    icon: Search
  },
  {
    title: 'Interview-ready profiles',
    description: 'Build a strong resume and showcase your best career story.',
    icon: BookOpen
  },
  {
    title: 'Trusted hiring partners',
    description: 'Work with verified recruiters and companies you can trust.',
    icon: ShieldCheck
  }
];

export const serviceCards = [
  {
    title: 'Resume Builder',
    description: 'Create professional resumes that stand out to recruiters and hiring managers.',
    icon: ClipboardList
  },
  {
    title: 'Job Search',
    description: 'Explore featured jobs, filter by role and location, and apply with a click.',
    icon: Search
  },
  {
    title: 'Company Reviews',
    description: 'Read insights from employees and compare the best workplaces.',
    icon: Globe
  },
  {
    title: 'Career Guidance',
    description: 'Get expert advice and coaching to move faster through your job hunt.',
    icon: Sparkles
  }
];

export const whyFeatures = [
  'Fast Hiring',
  'Trusted Companies',
  'AI Recommendations',
  'Secure Platform'
];

export const latestJobs = [
  {
    company: 'Nova Tech',
    title: 'Frontend Engineer',
    location: 'Remote',
    salary: '$80k - $110k',
    logoColor: 'bg-sky-500'
  },
  {
    company: 'Launch Labs',
    title: 'Product Designer',
    location: 'New York, NY',
    salary: '$75k - $95k',
    logoColor: 'bg-violet-500'
  },
  {
    company: 'PulseWorks',
    title: 'Data Analyst',
    location: 'San Francisco, CA',
    salary: '$85k - $105k',
    logoColor: 'bg-cyan-500'
  },
  {
    company: 'BrightWave',
    title: 'Recruitment Specialist',
    location: 'Austin, TX',
    salary: '$65k - $85k',
    logoColor: 'bg-blue-500'
  }
];

export const testimonials = [
  {
    name: 'Olivia Bennett',
    role: 'Marketing Manager',
    quote: 'QuickHire helped me land a role with a fast-growing company in just two weeks.',
    rating: 5
  },
  {
    name: 'Ethan Cole',
    role: 'Software Engineer',
    quote: 'The AI recommendations matched me with jobs that fit my experience perfectly.',
    rating: 5
  },
  {
    name: 'Maya Patel',
    role: 'HR Specialist',
    quote: 'As a recruiter, QuickHire made managing applications simple and fast.',
    rating: 5
  }
];

export const statsBadge = {
  label: '50K+ Active Users',
  description: 'Professionals and companies trust QuickHire every day.'
};

export const appHighlights = [
  {
    title: 'Modern dashboards',
    description: 'Clean workflows for candidates and recruiters alike.',
    icon: Sparkles
  },
  {
    title: 'Smart filters',
    description: 'Find the perfect opportunities faster with advanced search.',
    icon: CalendarDays
  }
];

export const footerLinks = [
  { label: 'Home', url: '/' },
  { label: 'Jobs', url: '/jobs' },
  { label: 'Companies', url: '/#companies' },
  { label: 'About', url: '/#about' },
  { label: 'Contact', url: '/#contact' }
];
