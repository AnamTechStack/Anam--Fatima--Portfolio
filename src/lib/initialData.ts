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
  MediaAsset
} from '../types';

export function getInitialData() {
  return {
    site_settings: {
      brandName: 'ATS — Anam Tech Stack',
      ownerName: 'Anam Fatima',
      title: 'Full Stack Developer | WordPress Developer | SEO Specialist',
      tagline: 'Engineering Scalable Web Systems, Bespoke CMS Architectures & Search-Optimized Experiences',
      shortIntro: 'Hi, I am Anam Fatima. A dedicated software engineer specializing in modern React & Node.js architectures, custom WordPress engineering, and rigorous technical SEO that drives tangible business outcomes.',
      bio: 'With a strong foundation in full-stack web engineering and digital optimization, I build robust, accessible, and high-converting web applications. My work bridges the gap between clean, scalable code and high-visibility search performance.',
      careerGoals: 'To architect resilient enterprise-grade applications, contribute to high-impact digital ecosystems, and deliver exceptional digital craftsmanship for forward-thinking engineering teams and clients worldwide.',
      techInterests: 'Modern React ecosystems, scalable microservices, Headless WordPress & WooCommerce, Core Web Vitals optimization, and high-performance databases.',
      developmentApproach: 'Clean code, semantic structure, zero-bloat architecture, test-driven validation, and a relentless focus on end-user performance and accessibility.',
      profileImage: '/uploads/anam_fatima_portrait.jpg',
      cvUrl: 'https://drive.google.com/file/d/1UXIU_UTu3Bl1gWbGD0ezrg00QSrYDrMK/view?usp=drive_link',
      availability: {
        isAvailable: true,
        statusText: 'Available for Full-time Roles & High-Impact Contracts'
      },
      contact: {
        email: 'anamdeveloper255@gmail.com',
        phone: '03218361368',
        location: 'Remote / Worldwide'
      },
      socials: {
        github: 'https://github.com/anamfatima',
        linkedin: 'https://www.linkedin.com/in/atechstack/',
        facebook: 'https://web.facebook.com/ATechStack',
        instagram: 'https://www.instagram.com/atechstack/',
        whatsapp: 'https://wa.me/923218361368',
        twitter: 'https://x.com/anamtechstack'
      },
      seo: {
        title: 'Anam Fatima — Full Stack Developer & WordPress SEO Specialist',
        description: 'Explore the portfolio and technical case studies of Anam Fatima. Custom web development, performant WordPress solutions, and technical SEO architecture.',
        ogImage: '/uploads/anam_fatima_portrait.jpg'
      },
      footerText: '© 2026 Anam Fatima (ATS — Anam Tech Stack). Engineered with modern full-stack standards and accessibility.',
      themePreference: 'dark' as const
    } as SiteSettings,

    projects: [
      {
        id: 'proj-ats-saas',
        title: 'ATS SaaS — Modern WordPress Cloud Software Platform',
        slug: 'ats-saas-wordpress-platform',
        shortDescription: 'Modern cloud SaaS software showcase and multi-tenant WordPress website engineered with bespoke Gutenberg templates and lightning-fast page delivery.',
        fullDescription: 'ATS SaaS is an enterprise software platform demonstration built on WordPress. Developed without bloated third-party page builders, it uses semantic PHP templates, customized Gutenberg blocks, and optimized schema markup to deliver sub-second performance.',
        featuredImage: '/uploads/project_wordpress_custom.jpg',
        galleryImages: ['/uploads/project_wordpress_custom.jpg'],
        category: 'WordPress Development' as const,
        techStack: ['WordPress', 'PHP', 'Tailwind CSS', 'ACF Pro', 'MySQL', 'SEO'],
        status: 'completed' as const,
        isFeatured: true,
        isPublished: true,
        completionDate: '2026-03-20',
        liveUrl: 'https://ats-saas.unaux.com',
        githubUrl: 'https://github.com/anamfatima/ats-saas-platform',
        challenges: 'Creating an intuitive, scalable SaaS marketing interface that allows effortless marketing edits without introducing CSS or JavaScript payload bloat.',
        implementationDetails: 'Custom PHP theme with modular ACF Pro block components, automated asset bundling, and server-side transients for high-speed page caching.',
        keyFeatures: [
          'Sub-800ms Average Page Load Time',
          'Modular visual block editing with zero page-builder plugins',
          'Interactive pricing matrices and CTA conversion funnels',
          'Complete Schema.org SoftwareApplication structured data'
        ],
        displayOrder: 1,
        seoTitle: 'ATS SaaS — Custom WordPress SaaS Platform by Anam Fatima',
        seoDescription: 'Case study of the ATS SaaS platform, custom WordPress engineering by Anam Fatima.',
        createdAt: '2026-03-20T10:00:00.000Z',
        updatedAt: '2026-03-20T10:00:00.000Z'
      },
      {
        id: 'proj-restaurant',
        title: 'Gourmet Haven — Custom WordPress Restaurant & Reservation Portal',
        slug: 'gourmet-haven-restaurant-portal',
        shortDescription: 'High-end culinary website featuring interactive menus, automated reservation booking, and mobile-first responsive dining UX.',
        fullDescription: 'Gourmet Haven is a bespoke WordPress restaurant platform designed for luxury dining. Integrates an interactive dietary-filtered menu, real-time table reservation requests, and customer review showcases.',
        featuredImage: '/uploads/project_restaurant_wordpress.jpg',
        galleryImages: ['/uploads/project_restaurant_wordpress.jpg'],
        category: 'WordPress Development' as const,
        techStack: ['WordPress', 'WooCommerce', 'PHP', 'JavaScript', 'Tailwind CSS'],
        status: 'completed' as const,
        isFeatured: true,
        isPublished: true,
        completionDate: '2026-02-15',
        liveUrl: 'https://resturent.unaux.com/',
        githubUrl: 'https://github.com/anamfatima/gourmet-restaurant-theme',
        challenges: 'Designing a mobile-first food menu with instant category filtering and seamless reservation management without heavy external plugins.',
        implementationDetails: 'Custom reservation post types, AJAX menu category switches, and WebP image optimization for culinary showcases.',
        keyFeatures: [
          'Interactive online menu with dietary allergen badges',
          'Table reservation booking form with email notifications',
          'Google Maps location and opening hours integration',
          '100% Mobile responsive touch-friendly layout'
        ],
        displayOrder: 2,
        seoTitle: 'Gourmet Haven — WordPress Restaurant Website by Anam Fatima',
        seoDescription: 'Explore the Gourmet Haven restaurant website case study by Anam Fatima.',
        createdAt: '2026-02-15T12:00:00.000Z',
        updatedAt: '2026-02-15T12:00:00.000Z'
      },
      {
        id: 'proj-crypto',
        title: 'CryptoPulse — Real-Time Cryptocurrency Trading & Telemetry Dashboard',
        slug: 'cryptopulse-trading-telemetry-dashboard',
        shortDescription: 'High-throughput crypto analytics platform with real-time candlestick charts, order books, and decentralized market feeds.',
        fullDescription: 'CryptoPulse provides traders and analysts with instantaneous insight into market liquidity and price trends. Features interactive financial candlestick charting, real-time tickers, and responsive portfolio management.',
        featuredImage: '/uploads/project_crypto_dashboard.jpg',
        galleryImages: ['/uploads/project_crypto_dashboard.jpg'],
        category: 'Full Stack Development' as const,
        techStack: ['React', 'TypeScript', 'Node.js', 'Chart.js', 'WebSockets', 'Tailwind CSS'],
        status: 'completed' as const,
        isFeatured: true,
        isPublished: true,
        completionDate: '2026-01-30',
        liveUrl: 'https://crypto-online.unaux.com/',
        githubUrl: 'https://github.com/anamfatima/cryptopulse-trading-suite',
        challenges: 'Handling streaming financial data with zero UI frame drops or DOM re-rendering jitter.',
        implementationDetails: 'Built custom React memoization wrappers, WebSocket reconnection backoff algorithms, and optimized canvas charts.',
        keyFeatures: [
          'Real-time price feeds and interactive candlestick charts',
          'Live simulated order book and market trade history',
          'Customizable trading indicators (RSI, MACD, Volume)',
          'Dark-mode cyberpunk high-contrast user interface'
        ],
        displayOrder: 3,
        seoTitle: 'CryptoPulse — Cryptocurrency Dashboard by Anam Fatima',
        seoDescription: 'Case study of CryptoPulse trading telemetry dashboard by Anam Fatima.',
        createdAt: '2026-01-30T14:00:00.000Z',
        updatedAt: '2026-01-30T14:00:00.000Z'
      },
      {
        id: 'proj-order-delight',
        title: 'Order Delight Nexus — Full-Stack Interactive Food Delivery Platform',
        slug: 'order-delight-nexus-food-delivery',
        shortDescription: 'Modern frontend/full-stack food delivery application with instant menu search, live cart calculation, and frictionless checkout.',
        fullDescription: 'Order Delight Nexus offers a seamless online ordering experience for foodies. Engineered using React, TypeScript, and modern component architectures, it features category carousels, custom meal options, and real-time order tracking.',
        featuredImage: '/uploads/project_restaurant_wordpress.jpg',
        galleryImages: ['/uploads/project_restaurant_wordpress.jpg'],
        category: 'Full Stack Development' as const,
        techStack: ['React', 'TypeScript', 'Next.js', 'Tailwind CSS', 'Vercel'],
        status: 'completed' as const,
        isFeatured: true,
        isPublished: true,
        completionDate: '2026-03-10',
        liveUrl: 'https://order-delight-nexus-xio3.vercel.app/',
        githubUrl: 'https://github.com/anamfatima/order-delight-nexus',
        challenges: 'Building dynamic state management for multi-item cart customizers with modifier options while maintaining fluid 60fps animations.',
        implementationDetails: 'Implemented optimistic UI state updates, local storage cart persistence, and accessible keyboard checkout flows.',
        keyFeatures: [
          'Instant menu search and dietary category filters',
          'Dynamic cart drawer with automatic tax and discount calculation',
          'Order status visual pipeline tracker',
          'Deployed on Vercel Edge network with sub-second TTFB'
        ],
        displayOrder: 4,
        seoTitle: 'Order Delight Nexus — Food Delivery App by Anam Fatima',
        seoDescription: 'Technical breakdown of Order Delight Nexus web application by Anam Fatima.',
        createdAt: '2026-03-10T08:00:00.000Z',
        updatedAt: '2026-03-10T08:00:00.000Z'
      },
      {
        id: 'proj-bright-hug',
        title: 'Bright Hug Haven — Healthcare, Wellness & Telehealth Portal',
        slug: 'bright-hug-haven-wellness-portal',
        shortDescription: 'Modern healthcare and patient wellness application with appointment scheduling, caregiver dashboards, and patient telemetry.',
        fullDescription: 'Bright Hug Haven is an accessible, calming digital healthcare portal designed for patient and caregiver coordination. Features patient appointment bookings, daily health metric trackers, and telehealth meeting links.',
        featuredImage: '/uploads/project_healthcare_wellness.jpg',
        galleryImages: ['/uploads/project_healthcare_wellness.jpg'],
        category: 'Full Stack Development' as const,
        techStack: ['React', 'TypeScript', 'Tailwind CSS', 'Node.js', 'REST APIs'],
        status: 'completed' as const,
        isFeatured: true,
        isPublished: true,
        completionDate: '2026-02-28',
        liveUrl: 'https://bright-hug-haven-454b.vercel.app/',
        githubUrl: 'https://github.com/anamfatima/bright-hug-haven',
        challenges: 'Ensuring strict WCAG AA color contrast, screen reader compatibility, and clear visual hierarchy for patients under stress.',
        implementationDetails: 'Custom accessible design system with soft calming hues, semantic ARIA landmarks, and robust input validation.',
        keyFeatures: [
          'Interactive doctor and care appointment booking',
          'Daily vital statistics and medication reminder logging',
          'Full WCAG AA compliance with visible high-contrast focus rings',
          'Secure client-side session handling and encrypted storage'
        ],
        displayOrder: 5,
        seoTitle: 'Bright Hug Haven — Healthcare Web App by Anam Fatima',
        seoDescription: 'Case study of Bright Hug Haven healthcare wellness platform by Anam Fatima.',
        createdAt: '2026-02-28T09:00:00.000Z',
        updatedAt: '2026-02-28T09:00:00.000Z'
      },
      {
        id: 'proj-comfy-code',
        title: 'Comfy Code Clan — Developer Learning Ecosystem & AI Code Assistant',
        slug: 'comfy-code-clan-developer-hub',
        shortDescription: 'Developer community hub and interactive code tool platform providing curated software tutorials, code snippets, and AI assistance.',
        fullDescription: 'Comfy Code Clan empowers aspiring and professional developers with clean code examples, interactive syntax-highlighted snippets, and technical development roadmaps.',
        featuredImage: '/uploads/project_seo_audit.jpg',
        galleryImages: ['/uploads/project_seo_audit.jpg'],
        category: 'Full Stack Development' as const,
        techStack: ['React', 'TypeScript', 'AI Tooling', 'Tailwind CSS', 'Vercel'],
        status: 'completed' as const,
        isFeatured: true,
        isPublished: true,
        completionDate: '2026-01-15',
        liveUrl: 'https://comfy-code-clan-n5tj.vercel.app/',
        githubUrl: 'https://github.com/anamfatima/comfy-code-clan',
        challenges: 'Rendering high-performance code snippets with copy-to-clipboard functionality and fast client-side searching.',
        implementationDetails: 'Built custom syntax highlighting themes with Prism.js, dynamic tag indexing, and responsive dark-mode styling.',
        keyFeatures: [
          'Interactive code snippets with instant 1-click clipboard copy',
          'Structured learning roadmaps for Frontend, Backend, and SEO',
          'AI-assisted code explanation interface',
          'Community discussion forum integration'
        ],
        displayOrder: 6,
        seoTitle: 'Comfy Code Clan — Developer Platform by Anam Fatima',
        seoDescription: 'Discover Comfy Code Clan developer platform engineered by Anam Fatima.',
        createdAt: '2026-01-15T11:00:00.000Z',
        updatedAt: '2026-01-15T11:00:00.000Z'
      },
      {
        id: 'proj-corporate-biz',
        title: 'ATS Corporate & Business Hub — WordPress Agency Portal',
        slug: 'ats-corporate-business-portal',
        shortDescription: 'Bespoke corporate agency website showcasing client deliverables, service matrices, and multi-channel lead funnels.',
        fullDescription: 'A custom corporate WordPress portal crafted for digital agency presence. Features responsive hero layouts, dynamic testimonials, and integrated lead generation funnels.',
        featuredImage: '/uploads/project_enterprise_saas.jpg',
        galleryImages: ['/uploads/project_enterprise_saas.jpg'],
        category: 'WordPress Development' as const,
        techStack: ['WordPress', 'PHP', 'Gutenberg Blocks', 'Technical SEO', 'MySQL'],
        status: 'completed' as const,
        isFeatured: true,
        isPublished: true,
        completionDate: '2025-12-20',
        liveUrl: 'https://anam-portfolio.unaux.com/?i',
        githubUrl: 'https://github.com/anamfatima/corporate-business-portal',
        challenges: 'Optimizing diverse multi-media portfolio assets for mobile without degrading Core Web Vitals.',
        implementationDetails: 'Custom PHP theme with modular ACF Pro block components, automated asset bundling, and server-side transients for high-speed page caching.',
        keyFeatures: [
          'Dynamic multi-step lead capture intake form',
          'Interactive case study filtering with zero page reload',
          'Instant client testimonial slider',
          '100% Core Web Vitals Green Scores'
        ],
        displayOrder: 7,
        seoTitle: 'ATS Corporate & Business Hub — WordPress Agency Portal',
        seoDescription: 'Explore the ATS Corporate portal case study by Anam Fatima.',
        createdAt: '2025-12-20T10:00:00.000Z',
        updatedAt: '2025-12-20T10:00:00.000Z'
      }
    ] as Project[],

    skills: [
      {
        id: 'skill-react',
        name: 'React 19 & Next.js',
        category: 'Frontend' as const,
        description: 'Server components, hooks, suspense architectures, and performance optimization.',
        proficiency: 95,
        yearsOfExperience: 4,
        iconName: 'Code2',
        displayOrder: 1,
        isVisible: true
      },
      {
        id: 'skill-ts',
        name: 'TypeScript',
        category: 'Frontend' as const,
        description: 'Strict type systems, generics, API schemas, and robust component contracts.',
        proficiency: 92,
        yearsOfExperience: 4,
        iconName: 'FileCode2',
        displayOrder: 2,
        isVisible: true
      },
      {
        id: 'skill-node',
        name: 'Node.js & Express',
        category: 'Backend' as const,
        description: 'High-throughput microservices, REST APIs, middleware, and secure authentication.',
        proficiency: 88,
        yearsOfExperience: 4,
        iconName: 'Server',
        displayOrder: 3,
        isVisible: true
      },
      {
        id: 'skill-wp',
        name: 'Custom WordPress & PHP',
        category: 'WordPress' as const,
        description: 'Zero-builder bespoke Gutenberg blocks, ACF Pro, WooCommerce, and PHP 8.2+.',
        proficiency: 96,
        yearsOfExperience: 4,
        iconName: 'Boxes',
        displayOrder: 4,
        isVisible: true
      },
      {
        id: 'skill-seo',
        name: 'Technical SEO & Vitals',
        category: 'SEO' as const,
        description: 'Core Web Vitals (INP, LCP, CLS), Schema.org JSON-LD, crawl budget, and indexation.',
        proficiency: 98,
        yearsOfExperience: 4,
        iconName: 'Search',
        displayOrder: 5,
        isVisible: true
      },
      {
        id: 'skill-db',
        name: 'PostgreSQL & MySQL',
        category: 'Databases & APIs' as const,
        description: 'Schema modeling, indexing, relational constraints, and connection pooling.',
        proficiency: 86,
        yearsOfExperience: 3,
        iconName: 'Database',
        displayOrder: 6,
        isVisible: true
      },
      {
        id: 'skill-tailwind',
        name: 'Tailwind CSS',
        category: 'Frontend' as const,
        description: 'Design token architecture, utility-first ergonomics, and responsive layouts.',
        proficiency: 96,
        yearsOfExperience: 4,
        iconName: 'Palette',
        displayOrder: 7,
        isVisible: true
      },
      {
        id: 'skill-docker',
        name: 'Docker & CI/CD',
        category: 'Tools & Workflow' as const,
        description: 'Containerized staging workflows, GitHub Actions, and production deployments.',
        proficiency: 82,
        yearsOfExperience: 3,
        iconName: 'Terminal',
        displayOrder: 8,
        isVisible: true
      }
    ] as Skill[],

    services: [
      {
        id: 'srv-fullstack',
        title: 'Full-Stack Web Application Engineering',
        description: 'End-to-end web software development using modern React, TypeScript, and Node.js with strict type contracts and sub-second response times.',
        iconName: 'Code2',
        features: [
          'Modern React 19 & Next.js architectures',
          'Scalable RESTful microservices & Node.js backends',
          'Comprehensive automated testing & CI/CD deployment',
          'Strict WCAG AA accessibility compliance'
        ],
        startingPrice: 'Contact for Proposal',
        ctaText: 'Discuss Engineering Scope',
        isPublished: true,
        displayOrder: 1
      },
      {
        id: 'srv-wordpress',
        title: 'Bespoke WordPress & Headless CMS',
        description: 'Custom WordPress theme and plugin development crafted with zero visual-builder bloat, guaranteeing pristine code and lightning-fast speeds.',
        iconName: 'Boxes',
        features: [
          'Tailored Gutenberg block architectures with ACF Pro',
          'Clean PHP 8.2+ semantic templates with zero plugins bloat',
          'High-converting WooCommerce e-commerce funnels',
          'Sub-800ms Average page render velocity'
        ],
        startingPrice: 'Contact for Proposal',
        ctaText: 'Build Custom CMS',
        isPublished: true,
        displayOrder: 2
      },
      {
        id: 'srv-seo',
        title: 'Technical SEO & Core Web Vitals Auditing',
        description: 'Deep-dive architectural audits and code refactoring to eliminate Core Web Vitals penalties, resolve indexation issues, and maximize search rankings.',
        iconName: 'Search',
        features: [
          'Comprehensive Core Web Vitals remediation (INP, LCP, CLS)',
          'Complete Schema.org structured data & rich snippet JSON-LD',
          'Crawl budget and indexation error troubleshooting',
          'Pre-rendering and server-side cache optimization'
        ],
        startingPrice: 'Contact for Proposal',
        ctaText: 'Schedule Technical Audit',
        isPublished: true,
        displayOrder: 3
      }
    ] as Service[],

    experiences: [
      {
        id: 'exp-1',
        role: 'Senior Full Stack & WordPress Developer',
        company: 'ATS Consulting (Independent)',
        location: 'Remote',
        startDate: '2023-01',
        endDate: 'Present',
        current: true,
        description: [
          'Architected high-speed custom WordPress and React applications for international clients with 99+ Core Web Vitals scores.',
          'Engineered full-stack features including real-time dashboards, automated bookings, and eCommerce checkout pipelines.',
          'Mentored teams on semantic clean code standards, modern PHP 8.2, and zero-bloat Gutenberg themes.'
        ],
        technologies: ['React', 'TypeScript', 'WordPress', 'PHP', 'Node.js', 'Tailwind CSS', 'Technical SEO'],
        displayOrder: 1
      },
      {
        id: 'exp-2',
        role: 'Full Stack Web Developer',
        company: 'Digital Solutions Lab',
        location: 'Remote',
        startDate: '2021-06',
        endDate: '2022-12',
        current: false,
        description: [
          'Developed responsive web interfaces with React and Node.js REST APIs.',
          'Integrated third-party payment gateways, CRM systems, and real-time WebSockets.',
          'Conducted performance profiling, resolving critical JavaScript waterfalls and slow database queries.'
        ],
        technologies: ['React', 'JavaScript', 'Node.js', 'Express', 'MySQL', 'Git'],
        displayOrder: 2
      }
    ] as Experience[],

    educations: [
      {
        id: 'edu-1',
        degree: 'Bachelor of Science in Computer Science',
        institution: 'University of Engineering & Technology',
        location: 'Worldwide / Remote Equivalent',
        startYear: '2017',
        endYear: '2021',
        details: 'Focused on Algorithms, Software Architecture, Database Management Systems, and Web Technologies.',
        displayOrder: 1
      }
    ] as Education[],

    certifications: [
      {
        id: 'cert-1',
        title: 'Full Stack Software Engineer Certification',
        issuer: 'Meta / Professional Certified',
        issueDate: '2023',
        credentialId: 'META-FS-9941',
        credentialUrl: 'https://coursera.org',
        isVisible: true,
        displayOrder: 1
      },
      {
        id: 'cert-2',
        title: 'Google Technical SEO & Core Web Vitals Specialist',
        issuer: 'Google Digital Garage',
        issueDate: '2024',
        credentialId: 'GOOG-SEO-CWV-882',
        credentialUrl: 'https://skillshop.exceedlms.com',
        isVisible: true,
        displayOrder: 2
      },
      {
        id: 'cert-3',
        title: 'Advanced WordPress Theme & Security Engineering',
        issuer: 'WordPress Foundation Certified',
        issueDate: '2023',
        credentialId: 'WP-DEV-SEC-1192',
        credentialUrl: 'https://wordpress.org',
        isVisible: true,
        displayOrder: 3
      }
    ] as Certification[],

    testimonials: [
      {
        id: 'test-1',
        clientName: 'David Vance',
        role: 'Chief Technology Officer',
        company: 'Vanguard Media Group',
        content: 'Anam transformed our web infrastructure. Her custom WordPress architecture loaded three times faster than our previous setup, and her technical SEO expertise resolved long-standing indexation errors within weeks. An exceptional developer.',
        rating: 5,
        isApproved: true,
        displayOrder: 1
      },
      {
        id: 'test-2',
        clientName: 'Elena Rostova',
        role: 'Director of Product',
        company: 'Nordic Digital Agency',
        content: 'Working with Anam on our SaaS frontend was effortless. She writes pristine, maintainable TypeScript and delivered complex dashboard views ahead of schedule. Truly high-caliber full-stack craftsmanship.',
        rating: 5,
        isApproved: true,
        displayOrder: 2
      }
    ] as Testimonial[],

    blog_posts: [
      {
        id: 'post-1',
        title: 'Mastering Core Web Vitals: A Full-Stack Engineer’s Playbook',
        slug: 'mastering-core-web-vitals-full-stack-guide',
        excerpt: 'Why INP, LCP, and CLS are not just SEO metrics, but fundamental engineering constraints, and how to optimize them at the architectural level.',
        content: `### Introduction\n\nGoogle's Core Web Vitals have fundamentally transformed how engineers assess website quality. Where legacy speed metrics simply counted DOMContentLoaded or overall payload weight, modern vitals measure user-centric perceived performance.\n\n### 1. Largest Contentful Paint (LCP)\n\nLCP measures when the main content of a page is likely loaded. To conquer LCP:\n- Ensure critical hero imagery is preloaded with \`<link rel="preload">\`.\n- Avoid client-side JavaScript rendering waterfalls for primary above-the-fold content.\n- Serve compressed WebP/AVIF formats with explicit height and width attributes.\n\n### 2. Interaction to Next Paint (INP)\n\nReplacing First Input Delay, INP evaluates overall responsiveness across every page interaction. Long tasks exceeding 50ms block the main thread and degrade INP.\n- Break up intensive calculation loops using \`scheduler.yield()\` or Web Workers.\n- Debounce rapid scroll or input listeners.\n\n### Conclusion\n\nTreating web performance as a core feature rather than a post-launch afterthought guarantees both higher search visibility and superior conversion rates.`,
        coverImage: '/uploads/project_seo_audit.jpg',
        category: 'SEO & Performance',
        tags: ['Core Web Vitals', 'Performance', 'Technical SEO', 'JavaScript'],
        status: 'published' as const,
        publishedAt: '2026-03-01',
        author: 'Anam Fatima',
        readingTimeMinutes: 5,
        seoTitle: 'Mastering Core Web Vitals: A Full-Stack Guide by Anam Fatima',
        seoDescription: 'Technical guide on optimizing INP, LCP, and CLS for web developers by Anam Fatima.'
      },
      {
        id: 'post-2',
        title: 'Architecting Clean WordPress Themes Without Page-Builder Bloat',
        slug: 'clean-wordpress-themes-without-page-builders',
        excerpt: 'How modern PHP, modular Gutenberg blocks, and ACF Pro deliver an effortless editing experience with sub-second page loads.',
        content: `### The Problem with Visual Page Builders\n\nVisual drag-and-drop builders are popular because they offer immediate visual feedback. However, the hidden cost is immense: tens of nested \`<div>\` wrappers, unminified inline styles, and hundreds of unnecessary database queries on every page render.\n\n### The Modern Alternative: ACF Blocks\n\nBy leveraging Advanced Custom Fields Pro with native Gutenberg block templates, we achieve the best of both worlds:\n- Content authors get an intuitive, visual block-editing UI.\n- Developers maintain 100% control over semantic HTML output and clean CSS.\n- Database queries are reduced by up to 80%.\n\n### Best Practices for Enterprise WordPress\n\n1. Use strict typing in PHP 8.2+.\n2. Leverage transients and object caching for expensive database queries.\n3. Sanitize inputs and escape all dynamic template outputs to prevent XSS.`,
        coverImage: '/uploads/project_wordpress_custom.jpg',
        category: 'WordPress Development',
        tags: ['WordPress', 'PHP', 'Gutenberg', 'Web Architecture'],
        status: 'published' as const,
        publishedAt: '2026-02-14',
        author: 'Anam Fatima',
        readingTimeMinutes: 6,
        seoTitle: 'Clean WordPress Themes Without Bloat — Anam Fatima',
        seoDescription: 'Learn how to build lightweight, enterprise WordPress themes without visual builders.'
      }
    ] as BlogPost[],

    media_assets: [
      {
        id: 'media-1',
        fileName: 'anam_fatima_portrait.jpg',
        url: '/uploads/anam_fatima_portrait.jpg',
        altText: 'Anam Fatima Professional Studio Portrait (Hijab & Glasses)',
        fileSize: 625944,
        mimeType: 'image/jpeg',
        uploadedAt: '2026-10-23T22:28:00.000Z'
      },
      {
        id: 'media-2',
        fileName: 'project_restaurant_wordpress.jpg',
        url: '/uploads/project_restaurant_wordpress.jpg',
        altText: 'Gourmet Haven Restaurant Website Showcase',
        fileSize: 692537,
        mimeType: 'image/jpeg',
        uploadedAt: '2026-10-23T22:28:00.000Z'
      },
      {
        id: 'media-3',
        fileName: 'project_crypto_dashboard.jpg',
        url: '/uploads/project_crypto_dashboard.jpg',
        altText: 'CryptoPulse Trading Dashboard Showcase',
        fileSize: 681402,
        mimeType: 'image/jpeg',
        uploadedAt: '2026-10-23T22:28:00.000Z'
      },
      {
        id: 'media-4',
        fileName: 'project_healthcare_wellness.jpg',
        url: '/uploads/project_healthcare_wellness.jpg',
        altText: 'Bright Hug Haven Healthcare Portal Showcase',
        fileSize: 645120,
        mimeType: 'image/jpeg',
        uploadedAt: '2026-10-23T22:28:00.000Z'
      },
      {
        id: 'media-5',
        fileName: 'project_wordpress_custom.jpg',
        url: '/uploads/project_wordpress_custom.jpg',
        altText: 'ATS SaaS Platform Showcase',
        fileSize: 629936,
        mimeType: 'image/jpeg',
        uploadedAt: '2026-10-23T21:45:00.000Z'
      },
      {
        id: 'media-6',
        fileName: 'project_seo_audit.jpg',
        url: '/uploads/project_seo_audit.jpg',
        altText: 'Comfy Code Clan Developer Hub Showcase',
        fileSize: 617076,
        mimeType: 'image/jpeg',
        uploadedAt: '2026-10-23T21:45:00.000Z'
      }
    ] as MediaAsset[]
  };
}
