import React from 'react';
import { Link } from 'react-router-dom';
import { FaHome } from 'react-icons/fa';

const PrivacyPolicy = ({ isDarkMode, setIsDarkMode }) => {
  return (
    <div className="app-root">
      <style>{`
        body {
          background: ${isDarkMode ? 'linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #334155 100%)' : '#f8fafc'};
          color: ${isDarkMode ? '#f8fafc' : '#111827'};
        }
        .page-container {
          max-width: 800px;
          margin: 0 auto;
          padding: 120px 24px 60px;
          line-height: 1.7;
        }
        .page-header {
          text-align: center;
          margin-bottom: 40px;
        }
        .back-btn {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 12px 24px;
          background: #7c3aed;
          color: white;
          border: none;
          border-radius: 8px;
          cursor: pointer;
          font-weight: 600;
          margin-bottom: 32px;
          transition: all 0.3s ease;
          text-decoration: none;
        }
        .back-btn:hover {
          background: #6d28d9;
          transform: translateY(-2px);
          color: white;
        }
        .content h2 {
          color: ${isDarkMode ? '#f8fafc' : '#111827'};
          margin-top: 32px;
          margin-bottom: 16px;
          font-size: 24px;
        }
        .content p {
          color: ${isDarkMode ? '#e2e8f0' : '#1f2937'};
          margin-bottom: 16px;
          line-height: 1.7;
        }
      `}</style>
      
      <header style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        background: isDarkMode ? 'rgba(15,23,42,0.95)' : 'rgba(255,255,255,0.95)',
        backdropFilter: 'blur(10px)',
        borderBottom: '1px solid rgba(124,58,237,0.1)',
        padding: '16px 0'
      }}>
        <div style={{maxWidth: '1200px', margin: '0 auto', padding: '0 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
          <Link to="/">
            <img src="/asset/Android Compact - 1 (3).svg" alt="Teroment Solutions" style={{height: '50px'}} />
          </Link>
          <button 
            onClick={() => setIsDarkMode(!isDarkMode)}
            style={{
              background: 'none',
              border: 'none',
              fontSize: '20px',
              cursor: 'pointer',
              padding: '8px',
              borderRadius: '8px'
            }}
          >
            {isDarkMode ? '☀️' : '🌙'}
          </button>
        </div>
      </header>

      <div className="page-container">
        <Link to="/" className="back-btn">
          <FaHome /> Back to Home
        </Link>
        
        <div className="page-header">
          <h1 style={{fontSize: '36px', marginBottom: '16px', color: isDarkMode ? '#f8fafc' : '#111827'}}>Privacy Policy</h1>
          <p style={{color: isDarkMode ? '#94a3b8' : '#4b5563', fontSize: '18px'}}>Last updated: {new Date().toLocaleDateString()}</p>
        </div>

        <div className="content">
          <h2>Information We Collect</h2>
          <p>We collect information you provide directly to us, such as when you fill out our contact form, subscribe to our newsletter, or communicate with us. This may include your name and contact information, email address and phone number, company information and project details, and communication preferences.</p>

          <h2>How We Use Your Information</h2>
          <p>We use the information we collect to respond to your inquiries and provide customer support, send you technical notices and support messages, communicate with you about our services and projects, improve our website and services, and comply with legal obligations.</p>

          <h2>Information Sharing and Disclosure</h2>
          <p>We do not sell, trade, or otherwise transfer your personal information to third parties without your consent, except as described in this policy. We may share your information with your explicit consent, to comply with legal requirements, to protect our rights and safety, or with trusted service providers who assist in our operations.</p>

          <h2>Data Security</h2>
          <p>We implement appropriate security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the internet is 100% secure.</p>

          <h2>Your Rights</h2>
          <p>You have the right to access your personal information, correct inaccurate information, request deletion of your information, and opt-out of marketing communications.</p>

          <h2>Cookies and Tracking</h2>
          <p>Our website may use cookies and similar tracking technologies to enhance your browsing experience and analyze website traffic.</p>

          <h2>Changes to This Policy</h2>
          <p>We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new policy on this page with an updated date.</p>

          <h2>Contact Information</h2>
          <p>If you have any questions about this Privacy Policy, please contact us at:</p>
          <div style={{background: isDarkMode ? 'rgba(124,58,237,0.1)' : 'rgba(124,58,237,0.05)', padding: '20px', borderRadius: '8px', marginTop: '16px', color: isDarkMode ? '#e2e8f0' : '#1f2937'}}>
            <p><strong>Email:</strong> info@teroment.com</p>
            <p><strong>Phone:</strong> +91 7001414991</p>
            <p><strong>Address:</strong> 3rd floor, Rajib Gandhi Infotech Park, Hinjewadi Phase 1, Pune, Maharashtra, India, PIN: 411057</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;