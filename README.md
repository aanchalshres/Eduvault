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

## 🛠️ Tech Stack

### Frontend
- **Framework**: Next.js 16 (App Router)
- **Styling**: Tailwind CSS 4
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Type Safety**: TypeScript

### Backend
- **Framework**: FastAPI (Python 3.11+)
- **Validation**: Pydantic v2
- **Server**: Uvicorn
- **Asynchronous**: Built on `asyncio` for high performance

## 📦 Project Structure

```text
/
├── backend/            # FastAPI application
│   ├── main.py         # API entry point & logic
│   └── requirements.txt # Python dependencies
├── eduvault-frontend/  # Next.js application
│   ├── app/            # App router pages & layouts
│   ├── components/     # Reusable UI components
│   └── lib/            # API services & utilities
└── .gitignore          # Monorepo git configuration
```

## 🛠️ Local Setup

### Backend
1. Navigate to `backend/`
2. Create a virtual environment: `python -m venv venv`
3. Activate it: `venv\Scripts\activate` (Windows) or `source venv/bin/activate` (Mac/Linux)
4. Install dependencies: `pip install -r requirements.txt`
5. Start the server: `python main.py` or run `run.bat`

### Frontend
1. Navigate to `eduvault-frontend/`
2. Install dependencies: `npm install`
3. Start the development server: `npm run dev`
4. Access the app at `http://localhost:3000`

## ☁️ Deployment

The project is configured for deployment on **Google Cloud Run** using Google Cloud Buildpacks.

```bash
# Deploy Backend
gcloud run deploy eduvault-backend --source backend/ --region us-central1

# Deploy Frontend
gcloud run deploy eduvault-frontend --source eduvault-frontend/ --region us-central1
```

---

