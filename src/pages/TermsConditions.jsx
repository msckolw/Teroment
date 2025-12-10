import React from 'react';
import { Link } from 'react-router-dom';
import { FaHome } from 'react-icons/fa';

const TermsConditions = ({ isDarkMode, setIsDarkMode }) => {
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
          <h1 style={{fontSize: '36px', marginBottom: '16px', color: isDarkMode ? '#f8fafc' : '#111827'}}>Terms and Conditions</h1>
          <p style={{color: isDarkMode ? '#94a3b8' : '#4b5563', fontSize: '18px'}}>Last updated: {new Date().toLocaleDateString()}</p>
        </div>

        <div className="content">
          <p>When you access or use the website, software, services, or other offerings provided by Teroment Solutions, referred to herein as we, us, our, or Company, you, the client or customer, agree to abide by all of the terms set forth in this Agreement, and if you do not accept these terms in full you must immediately cease using our services and withdraw from the site; this Agreement, together with any separately executed service agreement, order form, or addendum, constitutes the entire and exclusive understanding between you and Teroment Solutions regarding the services provided, superseding any prior oral or written communications or representations, and continued use of our services following updates to this Agreement constitutes your acceptance of such modifications; Teroment Solutions is a professional information technology services provider offering a wide array of services including but not limited to website development and design, mobile application development for Android, iOS or hybrid platforms, custom software development, artificial intelligence and machine learning solutions, blockchain development, cloud infrastructure setup and management, DevOps and server administration, digital marketing services, search engine optimization, user interface and user experience design, ongoing maintenance and support, consulting, advisory services, and additional offerings such as system integration, data migration, performance optimization, security audits, API development, third party integrations and other related IT consulting or managed services, the exact scope of which is documented in a separate agreement or Statement of Work; The location identified in Pune Maharashtra functions solely as a formally designated virtual point of presence for administrative and correspondence purposes, whereas the company's officially registered office remains situated within the state of West Bengal in alignment with the proprietor's legally recorded residential jurisdiction.</p>

          <p>As a client you commit to supplying accurate, complete and current information when requested, acknowledging full responsibility for the legality and appropriateness of any content, data or instructions you provide, and you further agree to use our services only in compliance with applicable laws and regulations, to refrain from actions that may disrupt or impair our services, to safeguard all credentials provided to you, and to respect all intellectual property rights belonging to Teroment Solutions and relevant third parties, and you must not copy, modify, distribute or misuse our content, services or deliverables unless expressly permitted in writing; all content, features, functionality, code, documentation, logos, trademarks and other materials we provide remain the exclusive property of Teroment Solutions or its licensors; fees, payments, due dates and billing procedures will be defined in the service agreement or Statement of Work, all fees are nonrefundable unless explicitly stated otherwise, and payments must be made according to the agreed schedule, and we reserve the right to suspend services or impose penalties for nonpayment; although we deliver services with reasonable professional skill, you acknowledge the inherent risks present in information technology development and digital services and therefore Teroment Solutions disclaims all warranties to the fullest extent permitted by law and shall not be liable for indirect or consequential damages, with total liability limited to amounts you have paid in the preceding twelve months unless otherwise agreed, and we maintain confidentiality over nonpublic information you provide and only disclose such information as necessary for service delivery or as required by law, with confidentiality obligations surviving termination.</p>

          <p>Termination of an engagement follows the procedure specified in the applicable agreement or Statement of Work, requiring payment for all completed work and ending all granted license rights while all terms intended to survive termination shall remain fully enforceable; you receive no rights to our trademarks or branding, and support or maintenance may only be provided within the scope defined in the agreement, with any additional work requiring a separate contract; you may not assign rights or obligations without written consent, and third party software dependencies may apply to our deliverables, requiring you to comply with any relevant terms and assume responsibility for your own data backups; we may revise this Agreement at any time, with changes becoming effective immediately upon notice, and your continued use of our services constitutes acceptance; this Agreement is governed by the laws of India and disputes will be resolved exclusively in the courts of West Bengal, and if any provision is held invalid the remainder continues in effect; you agree to indemnify and hold harmless Teroment Solutions and its representatives for claims resulting from your breach, misuse, violations or negligence, and by submitting an order, approving deliverables, making payments, accessing an account or using our services in any manner you confirm that you have read, understood and accepted all terms contained in this Agreement.</p>

          <h2>Contact Information</h2>
          <p>For questions about these Terms and Conditions, please contact us at:</p>
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

export default TermsConditions;