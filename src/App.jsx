import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'
import Registration from './pages/Registration'
import Assistant from './pages/Assistant'
import FoodScanner from './pages/FoodScanner'
import History from './pages/History'
import WaterTracker from './pages/WaterTracker'
import Settings from './pages/Settings'
import NutritionPlan from './pages/NutritionPlan'
import Analytics from './pages/Analytics'
import NotFound from './pages/NotFound'
import { HealthProvider } from './context/HealthContext'
import { Toaster } from 'react-hot-toast'

function App() {
  return (
    <HealthProvider>
      <Toaster position="top-center" reverseOrder={false} />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout title="Dashboard" subtitle="Welcome back"><Home /></Layout>} />
          <Route path="/registration" element={<Layout title="Profile Setup" subtitle="User details"><Registration /></Layout>} />
          <Route path="/plan" element={<Layout title="Nutrition Plan" subtitle="AI Generated"><NutritionPlan /></Layout>} />
          <Route path="/assistant" element={<Layout title="Nutrition Assistant" subtitle="AI coach"><Assistant /></Layout>} />
          <Route path="/scanner" element={<Layout title="Food Scanner" subtitle="Scan & analyze"><FoodScanner /></Layout>} />
          <Route path="/history" element={<Layout title="Nutrition History" subtitle="Progress timeline"><History /></Layout>} />
          <Route path="/water" element={<Layout title="Water Tracker" subtitle="Hydration goal"><WaterTracker /></Layout>} />
          <Route path="/analytics" element={<Layout title="Analytics" subtitle="Health dashboard"><Analytics /></Layout>} />
          <Route path="/settings" element={<Layout title="Settings" subtitle="Preferences"><Settings /></Layout>} />
          <Route path="*" element={<Layout title="Not Found" subtitle="Error 404"><NotFound /></Layout>} />
        </Routes>
      </BrowserRouter>
    </HealthProvider>
  )

}

export default App
