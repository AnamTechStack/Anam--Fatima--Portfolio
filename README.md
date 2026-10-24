# ATS — Anam Tech Stack (Personal Portfolio & CMS)

An advanced, fully dynamic, database-driven developer portfolio and content management system engineered for **Anam Fatima** (**Full Stack Developer | WordPress Developer | SEO Specialist**).

---

## 🌐 Live Application Deployment URLs

- **Development URL**: [https://ais-dev-7i2kxaxp4hsz5sykiw2gsa-422343253150.asia-southeast1.run.app](https://ais-dev-7i2kxaxp4hsz5sykiw2gsa-422343253150.asia-southeast1.run.app)
- **Shared Production Preview**: [https://ais-pre-7i2kxaxp4hsz5sykiw2gsa-422343253150.asia-southeast1.run.app](https://ais-pre-7i2kxaxp4hsz5sykiw2gsa-422343253150.asia-southeast1.run.app)

---

## 🚀 Live Showcase Projects (7/7 User Projects Integrated)

| Project Name | Category | Live URL | Featured Image |
|---|---|---|---|
| **ATS SaaS Cloud Platform** | WordPress Development | [https://ats-saas.unaux.com](https://ats-saas.unaux.com) | `/uploads/project_wordpress_custom.jpg` |
| **Gourmet Haven Restaurant** | WordPress Development | [https://resturent.unaux.com/](https://resturent.unaux.com/) | `/uploads/project_restaurant_wordpress.jpg` |
| **CryptoPulse Trading Telemetry** | Full Stack Development | [https://crypto-online.unaux.com/](https://crypto-online.unaux.com/) | `/uploads/project_crypto_dashboard.jpg` |
| **Order Delight Nexus Delivery** | Full Stack Development | [https://order-delight-nexus-xio3.vercel.app/](https://order-delight-nexus-xio3.vercel.app/) | `/uploads/project_restaurant_wordpress.jpg` |
| **Bright Hug Haven Healthcare** | Full Stack Development | [https://bright-hug-haven-454b.vercel.app/](https://bright-hug-haven-454b.vercel.app/) | `/uploads/project_healthcare_wellness.jpg` |
| **Comfy Code Clan AI Hub** | Full Stack Development | [https://comfy-code-clan-n5tj.vercel.app/](https://comfy-code-clan-n5tj.vercel.app/) | `/uploads/project_seo_audit.jpg` |
| **ATS Corporate Business Agency** | WordPress Development | [https://anam-portfolio.unaux.com/?i](https://anam-portfolio.unaux.com/?i) | `/uploads/project_enterprise_saas.jpg` |

---

## 📄 Curriculum Vitae & Resume

- **Google Drive CV Link**: [https://drive.google.com/file/d/1UXIU_UTu3Bl1gWbGD0ezrg00QSrYDrMK/view?usp=drive_link](https://drive.google.com/file/d/1UXIU_UTu3Bl1gWbGD0ezrg00QSrYDrMK/view?usp=drive_link)
- **Interactive In-App Resume**: [View Resume](/resume)

---

## 📞 Direct Contact & Social Links

- **WhatsApp & Phone**: `03218361368` ([Chat on WhatsApp: https://wa.me/923218361368](https://wa.me/923218361368))
- **Email**: `anamdeveloper255@gmail.com`
- **LinkedIn**: [https://www.linkedin.com/in/atechstack/](https://www.linkedin.com/in/atechstack/)
- **Facebook**: [https://web.facebook.com/ATechStack](https://web.facebook.com/ATechStack)
- **Instagram**: [https://www.instagram.com/atechstack/](https://www.instagram.com/atechstack/)

---

## 📋 Portfolio QA Checklist Status (8/8 Verified)

| # | Checklist Item | Status | Verification Detail |
|---|---|:---:|---|
| 1 | **Homepage aur tamam navigation links working hain** | ✅ PASS | Header, footer, hero CTAs, and routes (`/about`, `/projects`, `/skills`, `/services`, `/resume`, `/blog`, `/contact`, `/privacy`, `/terms`, `/404`, `/admin`) fully operational. |
| 2 | **Projects database se load aur filter ho rahe hain** | ✅ PASS | Real-time loading from database with 7 live projects across categories, keyword search, and direct "View Project" links. |
| 3 | **Admin login aur permissions tested hain** | ✅ PASS | Authenticated with email/password; session Bearer token enforced for privileged routes; 401 on unauthorized access. |
| 4 | **Project add, edit, delete aur publish tested hain** | ✅ PASS | Complete CRUD: Create modal, update details, publish/draft toggle, feature toggle, delete with confirmation. |
| 5 | **Contact form database mein message save karta hai** | ✅ PASS | Server-side validation, anti-spam honeypot, rate limiting; submissions save to `data/database.json` and appear in Admin Inbox. |
| 6 | **Mobile aur desktop layouts tested hain** | ✅ PASS | 1440px desktop balance, mobile hamburger drawer, touch-friendly buttons, and 15% mobile sticky cap adherence. |
| 7 | **Database policies aur secret keys secure hain** | ✅ PASS | Zero credentials exposed in client bundles; server-side session guard (`requireAdmin`) on all mutations and inbox endpoints. |
| 8 | **README, screenshots aur demo link tayyar hain** | ✅ PASS | Live Cloud Run URLs, credential documentation, asset paths, and setup commands all included. |

---

## 🔐 Admin Authentication Credentials

To access the protected Admin Dashboard (`/admin`):

- **Login Route**: `/admin/login`
- **Email**: `anamdeveloper255@gmail.com`
- **Password**: `anamtech2026`

*(Admin credentials can be customized in `.env` via `ADMIN_EMAIL` and `ADMIN_PASSWORD`)*

---

## 🖼 Professional Compressed Assets

All images are compressed and stored in `/public/uploads/` for fast sub-second loading:

1. **Anam Fatima Studio Portrait (Hijab & Glasses)**: `/uploads/anam_fatima_portrait.jpg`
2. **Gourmet Haven Restaurant**: `/uploads/project_restaurant_wordpress.jpg`
3. **CryptoPulse Trading Telemetry**: `/uploads/project_crypto_dashboard.jpg`
4. **Bright Hug Haven Healthcare & Wellness**: `/uploads/project_healthcare_wellness.jpg`
5. **ATS SaaS Cloud Platform**: `/uploads/project_wordpress_custom.jpg`
6. **Comfy Code Clan AI Hub**: `/uploads/project_seo_audit.jpg`
7. **ATS Corporate Agency**: `/uploads/project_enterprise_saas.jpg`

---

## ⚡ Setup & Execution Commands

```bash
# 1. Run automated test suite (verifies all 8 QA checklist items)
npm test

# 2. Run full-stack dev server (Express + Vite on port 3000)
npm run dev

# 3. Compile check / production build
npm run build
```
