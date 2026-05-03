# EDUVAULT | Modern Academic Assistant

EduVault is a premium, state-of-the-art tuition management platform integrated with an intelligent AI academic tutor. Built with a focus on high-end aesthetics and seamless user experience, it combines human expertise with artificial intelligence to accelerate learning.

## 🚀 Live Demo

- **Frontend**: [https://eduvault-frontend-337943981820.us-central1.run.app](https://eduvault-frontend-337943981820.us-central1.run.app)

## ✨ Features

- **AI Academic Tutor**: 24/7 intelligent guidance for STEM and Humanities.
- **Verified Tutors**: Direct access to expert human educators.
- **Course Marketplace**: Premium academic content across multiple disciplines.
- **Premium UI/UX**: Modern design with dark mode, glassmorphism, and smooth animations.
- **Responsive Design**: Fully optimized for mobile, tablet, and desktop viewports.
- **Always-On Backend**: Optimized for zero cold-starts on Cloud Run.

## 🛠️ Tech Stack

### Frontend
- **Framework**: Next.js 16 (App Router)
- **Styling**: Tailwind CSS 4
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Type Safety**: TypeScript

### Backend
- **Framework**: Laravel 12 (PHP 8.2)
- **Infrastructure**: Apache (Dockerized)
- **API**: RESTful JSON API
- **Deployment**: Google Cloud Run (Containerized)

## 📦 Project Structure

```text
/
├── backend-laravel/    # Laravel backend application
│   ├── app/            # Core logic (Controllers, Models)
│   ├── routes/         # API & Web routes
│   └── Dockerfile      # Production deployment configuration
├── eduvault-frontend/  # Next.js application
│   ├── app/            # App router pages & layouts
│   ├── components/     # Reusable UI components
│   └── lib/            # API services & utilities
└── .gitignore          # Monorepo git configuration
```

## 🛠️ Local Setup

### Backend
1. Navigate to `backend-laravel/`
2. Install PHP dependencies: `composer install`
3. Generate application key: `php artisan key:generate`
4. Start the server: `php artisan serve`

### Frontend
1. Navigate to `eduvault-frontend/`
2. Install dependencies: `npm install`
3. Start the development server: `npm run dev`
4. Access the app at `http://localhost:3000`

## ☁️ Deployment

The project is deployed on **Google Cloud Run**.

```bash
# Deploy Backend (Laravel)
gcloud run deploy eduvault-laravel-backend --source . --region us-central1 --min-instances 1

# Deploy Frontend (Next.js)
gcloud run deploy eduvault-frontend --source . --region us-central1
```

---
