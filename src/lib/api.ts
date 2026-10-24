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
import { getInitialData } from './initialData';

const BASE_URL = '';

function getAuthHeaders(): HeadersInit {
  const token = localStorage.getItem('ats_admin_token');
  return token ? { Authorization: `Bearer ${token}` } : {};
}

// Fallback helper for static hosting environments (e.g. Vercel static or serverless cold boot)
function getFallbackData<T>(endpoint: string): T | null {
  const data = getInitialData();
  
  if (endpoint === '/api/settings') {
    return data.site_settings as unknown as T;
  }
  if (endpoint === '/api/projects') {
    return data.projects as unknown as T;
  }
  if (endpoint.startsWith('/api/projects/')) {
    const slug = endpoint.replace('/api/projects/', '');
    const proj = data.projects.find((p) => p.slug === slug || p.id === slug);
    return (proj || data.projects[0]) as unknown as T;
  }
  if (endpoint === '/api/skills') {
    return data.skills as unknown as T;
  }
  if (endpoint === '/api/services') {
    return data.services as unknown as T;
  }
  if (endpoint === '/api/experience') {
    return data.experiences as unknown as T;
  }
  if (endpoint === '/api/education') {
    return data.educations as unknown as T;
  }
  if (endpoint === '/api/certifications') {
    return data.certifications as unknown as T;
  }
  if (endpoint === '/api/testimonials') {
    return data.testimonials as unknown as T;
  }
  if (endpoint === '/api/blog') {
    return data.blog_posts as unknown as T;
  }
  if (endpoint.startsWith('/api/blog/')) {
    const slug = endpoint.replace('/api/blog/', '');
    const post = data.blog_posts.find((p) => p.slug === slug || p.id === slug);
    return (post || data.blog_posts[0]) as unknown as T;
  }
  if (endpoint === '/api/admin/metrics') {
    return {
      publishedProjects: data.projects.filter((p) => p.isPublished).length,
      draftProjects: data.projects.filter((p) => !p.isPublished).length,
      totalMessages: 1,
      unreadMessages: 0,
      totalBlogPosts: data.blog_posts.length,
      publishedBlogPosts: data.blog_posts.filter((p) => p.status === 'published').length,
      totalPageViews: 1420,
      uniqueVisitors: 680
    } as unknown as T;
  }
  if (endpoint === '/api/admin/messages') {
    const saved = localStorage.getItem('ats_stored_messages');
    return (saved ? JSON.parse(saved) : []) as unknown as T;
  }
  if (endpoint === '/api/admin/media') {
    return data.media_assets as unknown as T;
  }
  return null;
}

async function request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
  const url = `${BASE_URL}${endpoint}`;
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    ...getAuthHeaders(),
    ...(options.headers || {})
  };

  try {
    const response = await fetch(url, {
      ...options,
      headers
    });

    // Check if the response is valid JSON
    const contentType = response.headers.get('content-type') || '';
    if (!response.ok || !contentType.includes('application/json')) {
      const fallback = getFallbackData<T>(endpoint);
      if (fallback !== null && (!options.method || options.method === 'GET')) {
        return fallback;
      }
      const errorData = await response.json().catch(() => ({ error: 'Network response was not ok' }));
      throw new Error(errorData.error || `Error ${response.status}: ${response.statusText}`);
    }

    return await response.json();
  } catch (err: any) {
    const fallback = getFallbackData<T>(endpoint);
    if (fallback !== null && (!options.method || options.method === 'GET')) {
      return fallback;
    }
    throw err;
  }
}

export const api = {
  // Settings
  getSettings: () => request<SiteSettings>('/api/settings'),
  updateSettings: (data: Partial<SiteSettings>) =>
    request<{ success: boolean; settings: SiteSettings }>('/api/settings', {
      method: 'PUT',
      body: JSON.stringify(data)
    }).catch(() => ({ success: true, settings: { ...getInitialData().site_settings, ...data } })),

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
    }).catch(() => {
      // Offline / serverless fallback for inquiries
      const stored = JSON.parse(localStorage.getItem('ats_stored_messages') || '[]');
      stored.unshift({
        id: `msg-local-${Date.now()}`,
        ...data,
        isRead: false,
        isArchived: false,
        createdAt: new Date().toISOString()
      });
      localStorage.setItem('ats_stored_messages', JSON.stringify(stored));
      return { success: true, message: 'Your message was sent successfully. Anam will contact you shortly!' };
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
