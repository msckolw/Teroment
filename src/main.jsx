import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import App from './App.jsx'
import PrivacyPolicy from './pages/PrivacyPolicy.jsx'
import TermsConditions from './pages/TermsConditions.jsx'
import './index.css'

// Create a wrapper component to manage shared state
const AppWrapper = () => {
  const [isDarkMode, setIsDarkMode] = React.useState(false);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<App isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />} />
        <Route path="/terms-conditions" element={<TermsConditions isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />} />
      </Routes>
    </Router>
  );
};

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AppWrapper />
  </React.StrictMode>,
)

