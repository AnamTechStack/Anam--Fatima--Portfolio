import {
  SiteSettings,
  Project,
  Skill,
  Service,
  Experience,
  Education,
  Certification,
  Testimonial,
  BlogPost,
  ContactMessage,
  MediaAsset,
  DashboardMetrics
} from '../types';

const BASE_URL = '';

function getAuthHeaders(): HeadersInit {
  const token = localStorage.getItem('ats_admin_token');
  return token ? { Authorization: `Bearer ${token}` } : {};
}

async function request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
  const url = `${BASE_URL}${endpoint}`;
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    ...getAuthHeaders(),
    ...(options.headers || {})
  };

  const response = await fetch(url, {
    ...options,
    headers
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({ error: 'Network response was not ok' }));
    throw new Error(errorData.error || `Error ${response.status}: ${response.statusText}`);
  }

  return response.json();
}

export const api = {
  // Settings
  getSettings: () => request<SiteSettings>('/api/settings'),
  updateSettings: (data: Partial<SiteSettings>) =>
    request<{ success: boolean; settings: SiteSettings }>('/api/settings', {
      method: 'PUT',
      body: JSON.stringify(data)
    }),

  // Projects
  getProjects: () => request<Project[]>('/api/projects'),
  getProject: (slug: string) => request<Project>(`/api/projects/${slug}`),
  createProject: (data: Partial<Project>) =>
    request<Project>('/api/projects', {
      method: 'POST',
      body: JSON.stringify(data)
    }),
  updateProject: (id: string, data: Partial<Project>) =>
    request<Project>(`/api/projects/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data)
    }),
  deleteProject: (id: string) =>
    request<{ success: boolean }>(`/api/projects/${id}`, {
      method: 'DELETE'
    }),

  // Skills
  getSkills: () => request<Skill[]>('/api/skills'),
  createSkill: (data: Partial<Skill>) =>
    request<Skill>('/api/skills', {
      method: 'POST',
      body: JSON.stringify(data)
    }),
  updateSkill: (id: string, data: Partial<Skill>) =>
    request<Skill>(`/api/skills/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data)
    }),
  deleteSkill: (id: string) =>
    request<{ success: boolean }>(`/api/skills/${id}`, {
      method: 'DELETE'
    }),

  // Services
  getServices: () => request<Service[]>('/api/services'),
  createService: (data: Partial<Service>) =>
    request<Service>('/api/services', {
      method: 'POST',
      body: JSON.stringify(data)
    }),
  updateService: (id: string, data: Partial<Service>) =>
    request<Service>(`/api/services/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data)
    }),
  deleteService: (id: string) =>
    request<{ success: boolean }>(`/api/services/${id}`, {
      method: 'DELETE'
    }),

  // Experience
  getExperience: () => request<Experience[]>('/api/experience'),
  createExperience: (data: Partial<Experience>) =>
    request<Experience>('/api/experience', {
      method: 'POST',
      body: JSON.stringify(data)
    }),
  updateExperience: (id: string, data: Partial<Experience>) =>
    request<Experience>(`/api/experience/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data)
    }),
  deleteExperience: (id: string) =>
    request<{ success: boolean }>(`/api/experience/${id}`, {
      method: 'DELETE'
    }),

  // Education
  getEducation: () => request<Education[]>('/api/education'),
  createEducation: (data: Partial<Education>) =>
    request<Education>('/api/education', {
      method: 'POST',
      body: JSON.stringify(data)
    }),
  updateEducation: (id: string, data: Partial<Education>) =>
    request<Education>(`/api/education/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data)
    }),
  deleteEducation: (id: string) =>
    request<{ success: boolean }>(`/api/education/${id}`, {
      method: 'DELETE'
    }),

  // Certifications
  getCertifications: () => request<Certification[]>('/api/certifications'),
  createCertification: (data: Partial<Certification>) =>
    request<Certification>('/api/certifications', {
      method: 'POST',
      body: JSON.stringify(data)
    }),
  updateCertification: (id: string, data: Partial<Certification>) =>
    request<Certification>(`/api/certifications/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data)
    }),
  deleteCertification: (id: string) =>
    request<{ success: boolean }>(`/api/certifications/${id}`, {
      method: 'DELETE'
    }),

  // Testimonials
  getTestimonials: () => request<Testimonial[]>('/api/testimonials'),
  createTestimonial: (data: Partial<Testimonial>) =>
    request<Testimonial>('/api/testimonials', {
      method: 'POST',
      body: JSON.stringify(data)
    }),
  updateTestimonial: (id: string, data: Partial<Testimonial>) =>
    request<Testimonial>(`/api/testimonials/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data)
    }),
  deleteTestimonial: (id: string) =>
    request<{ success: boolean }>(`/api/testimonials/${id}`, {
      method: 'DELETE'
    }),

  // Blog
  getBlogPosts: () => request<BlogPost[]>('/api/blog'),
  getBlogPost: (slug: string) => request<BlogPost>(`/api/blog/${slug}`),
  createBlogPost: (data: Partial<BlogPost>) =>
    request<BlogPost>('/api/blog', {
      method: 'POST',
      body: JSON.stringify(data)
    }),
  updateBlogPost: (id: string, data: Partial<BlogPost>) =>
    request<BlogPost>(`/api/blog/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data)
    }),
  deleteBlogPost: (id: string) =>
    request<{ success: boolean }>(`/api/blog/${id}`, {
      method: 'DELETE'
    }),

  // Contact Form
  submitContact: (data: { name: string; email: string; subject?: string; message: string; honeypot?: string }) =>
    request<{ success: boolean; message: string }>('/api/contact', {
      method: 'POST',
      body: JSON.stringify(data)
    }),

  // Admin Inbox
  getAdminMessages: () => request<ContactMessage[]>('/api/admin/messages'),
  updateAdminMessage: (id: string, data: Partial<ContactMessage>) =>
    request<ContactMessage>(`/api/admin/messages/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(data)
    }),
  deleteAdminMessage: (id: string) =>
    request<{ success: boolean }>(`/api/admin/messages/${id}`, {
      method: 'DELETE'
    }),

  // Admin Metrics
  getAdminMetrics: () => request<DashboardMetrics>('/api/admin/metrics'),

  // Media Library
  getMedia: () => request<MediaAsset[]>('/api/admin/media'),
  uploadMedia: (data: { fileName: string; base64Data: string; altText?: string }) =>
    request<MediaAsset>('/api/admin/media', {
      method: 'POST',
      body: JSON.stringify(data)
    }),
  deleteMedia: (id: string) =>
    request<{ success: boolean }>(`/api/admin/media/${id}`, {
      method: 'DELETE'
    }),

  // Analytics event tracking
  trackEvent: (type: string, path: string, referrer?: string) =>
    request<{ recorded: boolean }>('/api/analytics/event', {
      method: 'POST',
      body: JSON.stringify({ type, path, referrer })
    }).catch(() => null)
};
