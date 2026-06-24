# NutriMind AI - Professional Health & Nutrition Consultant

NutriMind AI is a comprehensive, genuinely AI-powered nutrition and health tracking application built with React, Vite, and Material UI. It uses Google's Gemini AI engine to act as a world-class dietician, generating deeply personalized 20-point health reports based on extensive user profiling.

## Features
- **Comprehensive User Profiling**: A 5-step Stepper UI to collect precise data regarding personal details, lifestyle, food habits, medical history, and fitness goals.
- **Purely AI-Powered**: Uses Gemini AI to dynamically generate nutrition strategies, meal plans, health warnings, and fitness advice without relying on static templates.
- **Advanced Dashboard**: A multi-tab dashboard to view your AI reports, including Nutrition Assessment, Calorie/Macro Targets, Daily Meal Plans, and Long-Term Strategies.
- **Historical Report Tracking**: Save, view, and regenerate past AI reports.
- **Gamified Health Tracking**: Log your daily water intake and track your active streaks to unlock visual achievement badges.
- **Analytics Visualization**: Interactive charts (via Recharts) displaying your weekly hydration trends and total historical stats.
- **Data Export**: Download your complete health history and logs as a JSON file.

## Tech Stack
- **Framework**: React 19 + Vite
- **Styling**: Material UI (MUI) + Framer Motion (for animations)
- **State Management**: React Context API + LocalStorage
- **Data Visualization**: Recharts
- **AI Integration**: Google Gemini API (@google/generative-ai)
- **Notifications**: React Hot Toast

---

## 🚀 Installation Guide

Ensure you have Node.js (v18+) installed on your machine.

1. **Clone the repository (or extract the project files)**:
   ```bash
   cd nutrirefer-ai
   ```

2. **Install all dependencies**:
   ```bash
   npm install
   ```

---

## ⚙️ Environment Setup Guide

The application requires a Google Gemini API key to function. 

1. Go to [Google AI Studio](https://aistudio.google.com/) and create an API key.
2. In the root directory of the project, create a file named `.env`.
3. Add your API key to the file exactly like this:
   ```env
   VITE_GEMINI_API_KEY=your_actual_api_key_here
   ```
*(Note: Do not wrap the key in quotes)*

---

## 💻 Running Locally

Once the dependencies are installed and the `.env` file is set up, you can start the development server:

```bash
npm run dev
```

Open your browser and navigate to `http://localhost:5173` to view the application.

---

## 🌐 Deployment Guide

The application is fully optimized for production deployment on platforms like Vercel, Netlify, or GitHub Pages.

1. **Build for Production**:
   ```bash
   npm run build
   ```
   This will generate a `dist/` directory with the compiled, minified output.

2. **Deploying to Vercel/Netlify**:
   - Connect your GitHub repository to Vercel or Netlify.
   - Set the build command to `npm run build` and the output directory to `dist`.
   - **Crucial Step**: In the Vercel/Netlify dashboard, go to the Environment Variables settings and add `VITE_GEMINI_API_KEY` with your Google Gemini key.

---

*Built for demonstration as a comprehensive Computer Science Project.*
