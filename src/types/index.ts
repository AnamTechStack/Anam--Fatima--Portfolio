export interface SiteSettings {
  brandName: string;
  ownerName: string;
  title: string;
  tagline: string;
  shortIntro: string;
  bio: string;
  careerGoals: string;
  techInterests: string;
  developmentApproach: string;
  profileImage: string;
  cvUrl: string;
  availability: {
    isAvailable: boolean;
    statusText: string;
  };
  contact: {
    email: string;
    phone: string;
    location: string;
  };
  socials: {
    github: string;
    linkedin: string;
    twitter: string;
    whatsapp: string;
    facebook?: string;
    instagram?: string;
  };
  seo: {
    title: string;
    description: string;
    ogImage: string;
  };
  footerText: string;
  themePreference: 'dark' | 'light' | 'system';
}

export interface Project {
  id: string;
  title: string;
  slug: string;
  shortDescription: string;
  fullDescription: string;
  featuredImage: string;
  galleryImages: string[];
  category: string;
  techStack: string[];
  status: 'completed' | 'in-progress' | 'planned';
  isFeatured: boolean;
  isPublished: boolean;
  completionDate: string;
  liveUrl: string;
  githubUrl: string;
  challenges: string;
  implementationDetails: string;
  keyFeatures: string[];
  displayOrder: number;
  seoTitle: string;
  seoDescription: string;
  createdAt: string;
  updatedAt: string;
}

export interface Skill {
  id: string;
  name: string;
  category: 'Frontend' | 'Backend' | 'WordPress' | 'Databases & APIs' | 'SEO' | 'Tools & Workflow';
  description: string;
  proficiency: number; // 0 to 100
  yearsOfExperience: number;
  iconName: string;
  displayOrder: number;
  isVisible: boolean;
}

export interface Service {
  id: string;
  title: string;
  description: string;
  iconName: string;
  features: string[];
  startingPrice: string;
  ctaText: string;
  isPublished: boolean;
  displayOrder: number;
}

export interface Experience {
  id: string;
  role: string;
  company: string;
  location: string;
  startDate: string;
  endDate: string;
  current: boolean;
  description: string[];
  technologies: string[];
  displayOrder: number;
}

export interface Education {
  id: string;
  degree: string;
  institution: string;
  location: string;
  startYear: string;
  endYear: string;
  details: string;
  displayOrder: number;
}

export interface Certification {
  id: string;
  title: string;
  issuer: string;
  issueDate: string;
  credentialId?: string;
  credentialUrl?: string;
  isVisible: boolean;
  displayOrder: number;
}

export interface Testimonial {
  id: string;
  clientName: string;
  role: string;
  company: string;
  content: string;
  avatarUrl?: string;
  rating: number;
  isApproved: boolean;
  displayOrder: number;
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  coverImage: string;
  category: string;
  tags: string[];
  status: 'draft' | 'published' | 'scheduled';
  publishedAt: string;
  author: string;
  readingTimeMinutes: number;
  seoTitle: string;
  seoDescription: string;
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  isRead: boolean;
  isArchived: boolean;
  createdAt: string;
}

export interface MediaAsset {
  id: string;
  fileName: string;
  url: string;
  altText: string;
  fileSize: number;
  mimeType: string;
  uploadedAt: string;
}

export interface AnalyticsEvent {
  id: string;
  type: 'pageview' | 'click' | 'download_cv' | 'contact_submit';
  path: string;
  referrer?: string;
  userAgent?: string;
  timestamp: string;
}

export interface DashboardMetrics {
  totalProjects: number;
  publishedProjects: number;
  draftProjects: number;
  totalMessages: number;
  unreadMessages: number;
  totalBlogPosts: number;
  publishedBlogPosts: number;
  totalPageViews: number;
  uniqueVisitors: number;
  recentMessages: ContactMessage[];
  recentActivities: Array<{
    id: string;
    action: string;
    entity: string;
    timestamp: string;
  }>;
}
