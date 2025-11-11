import React, { useState, useEffect, useRef } from 'react';
import { FaCode, FaMobileAlt, FaServer, FaChartLine, FaBrain, FaCloud, FaCog, FaSearch, FaJava, FaArrowRight, FaRocket, FaPlay, FaUsers, FaAward, FaGlobe, FaLightbulb, FaShieldAlt, FaChevronDown, FaBars, FaTimes } from 'react-icons/fa';
import { SiReact, SiNextdotjs, SiNodedotjs, SiTypescript, SiFlutter, SiSwift, SiKotlin, SiPython, SiTensorflow, SiPytorch, SiOpenai, SiGooglecloud, SiDocker, SiAngular, SiVuedotjs, SiEthereum, SiDatabricks } from 'react-icons/si';
import { FaAws, FaMicrosoft } from 'react-icons/fa';
import emailjs from '@emailjs/browser';


// Modern button component
const Button = ({ children, variant = 'primary', className = '', ...props }) => {
  const baseStyles = 'inline-flex items-center justify-center px-6 py-3 rounded-lg font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2';
  
  const variants = {
    primary: 'bg-primary text-white hover:bg-primary-light focus:ring-primary/50',
    secondary: 'bg-secondary text-white hover:bg-opacity-90 focus:ring-secondary/50',
    outline: 'border-2 border-primary text-primary hover:bg-primary/5 focus:ring-primary/50',
    ghost: 'text-primary hover:bg-primary/10 focus:ring-primary/50'
  };

  return (
    <button 
      className={`${baseStyles} ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

// Section component for consistent spacing
const Section = ({ id, title, subtitle, children, className = '' }) => (
  <section id={id} className={`py-20 ${className}`}>
    <div className="tc-container">
      {subtitle && <span className="text-primary font-semibold text-sm uppercase tracking-wider mb-2 block">{subtitle}</span>}
      {title && <h2 className="text-4xl font-bold text-gray-900 mb-12">{title}</h2>}
      {children}
    </div>
  </section>
);

// Card component for services and portfolio items
const Card = ({ icon: Icon, title, description, className = '' }) => (
  <div className={`bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow duration-300 ${className}`}>
    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary text-2xl mb-4">
      {Icon && <Icon />}
    </div>
    <h3 className="text-xl font-semibold mb-2 text-gray-900">{title}</h3>
    <p className="text-gray-600">{description}</p>
  </div>
);

export default function App() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [isLoading, setIsLoading] = useState(true);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const headerRef = useRef(null);

  // Handle scroll effect for header and active section
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 10);
      setShowScrollTop(scrollPosition > 500);
      
      // Update active section based on scroll position
      const sections = ['home', 'services', 'technologies', 'about', 'contact'];
      const sectionElements = sections.map(id => document.getElementById(id));
      
      for (let i = sections.length - 1; i >= 0; i--) {
        const element = sectionElements[i];
        if (element && element.offsetTop <= scrollPosition + 100) {
          setActiveSection(sections[i]);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Mouse tracking for interactive effects
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Loading effect
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  // Particle system
  useEffect(() => {
    if (window.innerWidth <= 768) return; // Skip on mobile

    const createParticle = () => {
      const particle = document.createElement('div');
      particle.className = 'particle';
      particle.style.left = Math.random() * 100 + '%';
      particle.style.animationDuration = (Math.random() * 15 + 10) + 's';
      particle.style.animationDelay = Math.random() * 5 + 's';
      
      const particlesContainer = document.querySelector('.particles');
      if (particlesContainer) {
        particlesContainer.appendChild(particle);
        
        setTimeout(() => {
          if (particle.parentNode) {
            particle.parentNode.removeChild(particle);
          }
        }, 25000);
      }
    };

    const particleInterval = setInterval(createParticle, 2000);
    
    return () => {
      clearInterval(particleInterval);
    };
  }, [isLoading]);

  // Intersection Observer for scroll animations
  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-on-scroll');
        }
      });
    }, observerOptions);

    // Observe all animatable elements
    const animatableElements = document.querySelectorAll('.service-card, .tech-card, .card, .testimonials .card');
    animatableElements.forEach((el, index) => {
      el.classList.add(`delay-${Math.min(index % 3, 3)}`);
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, [isLoading]);

  // Navigation items
  const navItems = [
    { name: 'Home', href: '#home' },
    { name: 'Services', href: '#services' },
    { name: 'Portfolio', href: '#portfolio' },
    { name: 'About', href: '#about' },
    { name: 'Contact', href: '#contact' },
  ];

  // Services data with icons and tech stack
  const servicesList = [
    {
      id: 1,
      title: 'Web Development',
      description: 'Custom web applications built with modern technologies like React, Next.js, and Node.js.',
      icon: FaCode,
      tech: [
        { name: 'React', icon: SiReact, color: '#61DAFB' },
        { name: 'Next.js', icon: SiNextdotjs, color: '#000000' },
        { name: 'Node.js', icon: SiNodedotjs, color: '#339933' },
        { name: 'TypeScript', icon: SiTypescript, color: '#3178C6' },
      ],
      gradient: 'from-blue-500 to-cyan-400',
    },
    {
      id: 2,
      title: 'Mobile Apps',
      description: 'Cross-platform mobile applications using React Native and Flutter for iOS and Android.',
      icon: FaMobileAlt,
      tech: [
        { name: 'React Native', icon: SiReact, color: '#61DAFB' },
        { name: 'Flutter', icon: SiFlutter, color: '#02569B' },
        { name: 'Swift', icon: SiSwift, color: '#FA7343' },
        { name: 'Kotlin', icon: SiKotlin, color: '#7F52FF' },
      ],
      gradient: 'from-purple-500 to-pink-500',
    },
    {
      id: 3,
      title: 'Cloud Solutions',
      description: 'Scalable cloud infrastructure and serverless solutions with AWS, GCP, and Azure.',
      icon: FaCloud,
      tech: [
        { name: 'AWS', icon: FaAws, color: '#FF9900' },
        { name: 'GCP', icon: SiGooglecloud, color: '#4285F4' },
        { name: 'Azure', icon: FaMicrosoft, color: '#0089D6' },
        { name: 'Docker', icon: SiDocker, color: '#2496ED' },
      ],
      gradient: 'from-amber-500 to-orange-500',
    },
    {
      id: 4,
      title: 'AI & Data Science',
      description: 'Advanced analytics, machine learning models, and AI-powered applications.',
      icon: FaBrain,
      tech: [
        { name: 'Python', icon: SiPython, color: '#3776AB' },
        { name: 'TensorFlow', icon: SiTensorflow, color: '#FF6F00' },
        { name: 'PyTorch', icon: SiPytorch, color: '#EE4C2C' },
        { name: 'OpenAI', icon: SiOpenai, color: '#412991' },
      ],
      gradient: 'from-green-500 to-emerald-400',
    },
  ];

  // Technologies we work with
  const technologies = [
    { id: 1, name: 'ReactJS', category: 'Frontend', icon: SiReact, color: '#61DAFB' },
    { id: 2, name: 'Angular', category: 'Frontend', icon: SiAngular, color: '#DD0031' },
    { id: 3, name: 'VueJS', category: 'Frontend', icon: SiVuedotjs, color: '#4FC08D' },
    { id: 4, name: 'Python', category: 'Backend', icon: SiPython, color: '#3776AB' },
    { id: 5, name: 'NodeJS', category: 'Backend', icon: SiNodedotjs, color: '#339933' },
    { id: 6, name: 'Java', category: 'Backend', icon: FaJava, color: '#ED8B00' },
    { id: 7, name: 'React Native', category: 'Mobile App', icon: SiReact, color: '#61DAFB' },
    { id: 8, name: 'Flutter', category: 'Mobile App', icon: SiFlutter, color: '#02569B' },
    { id: 9, name: 'Swift', category: 'Mobile App', icon: SiSwift, color: '#FA7343' },
    { id: 10, name: 'Kotlin', category: 'Mobile App', icon: SiKotlin, color: '#7F52FF' },
    { id: 11, name: 'Blockchain', category: 'Blockchain', icon: SiEthereum, color: '#627EEA' },
    { id: 12, name: 'GenAI', category: 'AI/ML', icon: SiOpenai, color: '#10A37F' },
    { id: 13, name: 'AgenticeAI', category: 'AI/ML', icon: FaBrain, color: '#7c3aed' },
    { id: 14, name: 'AWS', category: 'Cloud', icon: FaAws, color: '#FF9900' },
    { id: 15, name: 'Azure', category: 'Cloud', icon: FaMicrosoft, color: '#0089D6' },
    { id: 16, name: 'Databricks', category: 'Data & AI', icon: SiDatabricks, color: '#FF3621' },
  ];

  const services = [

    { 
      id: 'web', 
      title: 'Web Development', 
      short: 'Responsive, SEO-friendly websites built to convert.', 
      long: 'We build fast, secure, and accessible websites using modern frameworks and performance best practices. Focus on conversion, SEO, and scalable architecture to support growth.',
      icon: FaCode,
      color: '#4f46e5'
    },

    { 
      id: 'seo', 
      title: 'SEO & Content', 
      short: 'Technical SEO, content strategy and on-page optimization.', 
      long: 'Comprehensive SEO services including technical audits, keyword research, content planning, and on-page optimization to increase organic visibility and qualified traffic.',
      icon: FaSearch,
      color: '#059669'
    },

    { 
      id: 'ppc', 
      title: 'PPC & Social Media', 
      short: 'Paid search, social ads and performance marketing.', 
      long: 'Performance-focused paid campaigns on Google, Meta, and other ad networks — including creative A/B testing, audience targeting, and ongoing optimization to maximize ROI.',
      icon: FaChartLine,
      color: '#dc2626'
    },

    { 
      id: 'mobile', 
      title: 'Mobile Apps Development', 
      short: 'Native & cross-platform mobile apps with delightful UX.', 
      long: 'Design and develop mobile applications (iOS & Android) using React Native, Flutter or native stacks. We focus on performance, offline support and seamless user experiences.',
      icon: FaMobileAlt,
      color: '#7c3aed'
    },

    { 
      id: 'ai', 
      title: 'AI Bots & Agents', 
      short: 'Conversational AI, automation bots and intelligent agents.', 
      long: 'Custom AI solutions including chatbots, virtual assistants, and autonomous agents built with modern LLMs and MLOps practices to automate workflows and improve customer experience.',
      icon: FaBrain,
      color: '#ea580c'
    },

    { 
      id: 'blockchain', 
      title: 'Blockchain Development', 
      short: 'Smart contracts, dApps and blockchain integrations.', 
      long: 'Blockchain development covering smart contracts, tokenization, and decentralized apps on Ethereum-compatible chains, with security audits and deployment best practices.',
      icon: SiEthereum,
      color: '#0891b2'
    },

  ];

  const [showServiceModal, setShowServiceModal] = useState(null);

  // Contact form state

  const [formState, setFormState] = useState({ name: '', email: '', phone: '', service: '', message: '' });

  const [status, setStatus] = useState({ loading: false, ok: null, message: '' });

  const formRef = useRef(null);

  let ejsSid = import.meta.env.VITE_emailjs_service_id
  let ejsTid = import.meta.env.VITE_emailjs_template_id
  let ejsPkey = import.meta.env.VITE_emailjs_public_key

  // Initialize EmailJS
  useEffect(() => {
    emailjs.init(ejsPkey);
  }, []);

  useEffect(() => {

    function onKey(e) {

      if (e.key === 'Escape') {

        setShowServiceModal(null);

      }

    }

    window.addEventListener('keydown', onKey);

    return () => window.removeEventListener('keydown', onKey);

  }, []);

  async function submitForm(e) {

    e.preventDefault();

    // Basic client-side validation

    if (!formState.name || !formState.email || !formState.message) {

      setStatus({ loading: false, ok: false, message: 'Please complete all required fields.' });

      return;

    }

    setStatus({ loading: true, ok: null, message: '' });

    /*try {

      const FORM_ENDPOINT = 'https://formspree.io/f/{YOUR_FORM_ID}';

      const payload = new FormData();

      payload.append('name', formState.name);

      payload.append('email', formState.email);

      payload.append('phone', formState.phone);

      payload.append('service', formState.service);

      payload.append('message', formState.message);

      const res = await fetch(FORM_ENDPOINT, {

        method: 'POST',

        body: payload,

        headers: {

          Accept: 'application/json'

        }

      });

      if (res.ok) {

        setStatus({ loading: false, ok: true, message: 'Thanks — your message has been sent.' });

        setFormState({ name: '', email: '', phone: '', service: '', message: '' });

        if (formRef.current) formRef.current.reset();

      } else {

        const json = await res.json();

        throw new Error(json.error || 'Submission failed');

      }

    } catch (err) {

      setStatus({ loading: false, ok: false, message: 'There was an error sending your message. Please try again later.' });

      console.error(err);

    }*/

    console.log('Form data being sent:', {
      name: formState.name,
      email: formState.email,
      phone: formState.phone,
      service: formState.service,
      message: formState.message
    });

    emailjs.sendForm(
    ejsSid, //email service id
    ejsTid, //email template id
    e.target
    )
    .then((result) => {
      console.log('EmailJS Success:', result.text);
      setStatus({ loading: false, ok: true, 
      message: 'Thanks — your message has been sent.' });

      setFormState({ name: '', email: '', phone: '', service: '', message: '' });

      if (formRef.current) formRef.current.reset();

      //setTimeout(() => setStatus({ loading: false, ok: null, message: '' }), 5000);
    })
    .catch((err) => {
      console.error('EmailJS Error:', err);
      setStatus({ loading: false, ok: false, 
      message: 'There was an error sending your message. Please try again later.' });
    });

  }

  // Loading screen component
  if (isLoading) {
    return (
      <div className="loading-screen">
        <div className="loading-content">
          <div className="loading-logo">
            <div className="logo-animation">
              <img src="/asset/Android Compact - 1 (3).svg" alt="Teroment Solutions" />
            </div>
          </div>
          <div className="loading-text" style={{
            fontWeight: 700,
            fontSize: '26px',
            letterSpacing: '-0.5px',
            fontFamily: "'Inter', sans-serif"
          }}>Teroment Solutions</div>
          <div className="loading-bar">
            <div className="loading-progress"></div>
          </div>
        </div>
      </div>
    );
  }

  return (

    <div className="app-root">

      {/* Cursor follower */}
      <div 
        className="cursor-follower"
        style={{
          left: mousePosition.x,
          top: mousePosition.y,
        }}
      />

      {/* Particle background */}
      <div className="particles"></div>

      <style>{`

        :root{ 
          --tc-accent:#7c3aed; 
          --tc-accent2:#06b6d4; 
          --tc-accent3:#ec4899;
          --tc-bg:${isDarkMode ? '#0f172a' : '#f8fafc'}; 
          --tc-bg-dark:#0f172a;
          --tc-bg-gradient:linear-gradient(135deg, #667eea 0%, #764ba2 25%, #f093fb 50%, #4facfe 75%, #00f2fe 100%);
          --tc-text:${isDarkMode ? '#f8fafc' : '#111827'}; 
          --tc-text-light:${isDarkMode ? '#e2e8f0' : '#1f2937'};
          --tc-muted:${isDarkMode ? '#94a3b8' : '#4b5563'}; 
          --tc-white:#ffffff;
          --tc-card-bg:${isDarkMode ? 'rgba(30,41,59,0.95)' : 'rgba(255,255,255,0.95)'};
        }

        body {
          background: ${isDarkMode ? 'linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #334155 100%)' : 'var(--tc-bg)'};
          color: var(--tc-text);
          transition: all 0.3s ease;
        }

        /* Loading Screen */
        .loading-screen {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #334155 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 9999;
        }

        .loading-content {
          text-align: center;
          color: white;
        }

        .loading-logo {
          margin-bottom: 20px;
        }

        .logo-animation {
          width: 80px;
          height: 80px;
          border-radius: 20px;
          background: white;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 10px;
          margin: 0 auto;
          animation: logoSpin 2s ease-in-out infinite;
          box-shadow: 0 10px 30px rgba(124, 58, 237, 0.5);
        }
        
        .logo-animation img {
          width: 100%;
          height: 100%;
          object-fit: contain;
        }

        @keyframes logoSpin {
          0% { transform: scale(1) rotate(0deg); }
          50% { transform: scale(1.1) rotate(180deg); }
          100% { transform: scale(1) rotate(360deg); }
        }

        .loading-text {
          margin-bottom: 30px;
          opacity: 0.95;
        }

        .loading-bar {
          width: 200px;
          height: 4px;
          background: rgba(255, 255, 255, 0.2);
          border-radius: 2px;
          margin: 0 auto;
          overflow: hidden;
        }

        .loading-progress {
          width: 100%;
          height: 100%;
          background: var(--tc-bg-gradient);
          border-radius: 2px;
          animation: loadingProgress 1.5s ease-in-out;
        }

        @keyframes loadingProgress {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(0); }
        }

        /* Cursor Follower */
        .cursor-follower {
          position: fixed;
          width: 20px;
          height: 20px;
          background: radial-gradient(circle, rgba(124, 58, 237, 0.6) 0%, transparent 70%);
          border-radius: 50%;
          pointer-events: none;
          z-index: 9998;
          transform: translate(-50%, -50%);
          transition: all 0.1s ease;
        }

        /* Particle Background */
        .particles {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          pointer-events: none;
          z-index: 1;
        }

        .particle {
          position: absolute;
          width: 4px;
          height: 4px;
          background: rgba(124, 58, 237, 0.3);
          border-radius: 50%;
          animation: particleFloat 20s infinite linear;
        }

        @keyframes particleFloat {
          0% {
            transform: translateY(100vh) rotate(0deg);
            opacity: 0;
          }
          10% {
            opacity: 1;
          }
          90% {
            opacity: 1;
          }
          100% {
            transform: translateY(-100px) rotate(360deg);
            opacity: 0;
          }
        }

        /* Smooth scrolling improvements */
        html {
          scroll-behavior: smooth;
        }

        /* Enhanced focus states for accessibility */
        *:focus {
          outline: 2px solid var(--tc-accent);
          outline-offset: 2px;
        }

        button:focus, a:focus {
          outline: 2px solid var(--tc-accent);
          outline-offset: 2px;
        }

        @media (max-width: 768px) {
          .cursor-follower {
            display: none;
          }
          
          .particles {
            display: none;
          }
        }

        *{box-sizing:border-box; margin:0; padding:0}

        body,html,#root{height:100%;margin:0}

        .app-root{
          font-family:Inter, ui-sans-serif, system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial; 
          color:var(--tc-text); 
          background:var(--tc-bg);
          line-height:1.6;
        }

        header{
          background: ${isDarkMode ? 'rgba(15,23,42,0.95)' : 'rgba(255,255,255,0.95)'}; 
          backdrop-filter: blur(10px);
          box-shadow:0 4px 20px rgba(15,23,42,0.08); 
          position:fixed; 
          top:0; 
          left:0;
          right:0;
          z-index:1000;
          border-bottom:1px solid rgba(124,58,237,0.1);
          transition: all 0.3s ease;
        }

        header.scrolled {
          background: ${isDarkMode ? 'rgba(15,23,42,0.98)' : 'rgba(255,255,255,0.98)'};
          box-shadow: 0 8px 32px rgba(15,23,42,0.12);
        }

        .container{max-width:1200px;margin:0 auto;padding:32px 24px}

        .nav{display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:16px}

        .brand{display:flex;gap:12px;align-items:center}

        .logo{
          width:48px;height:48px;border-radius:12px;
          background:white;
          display:flex;align-items:center;justify-content:center;
          padding: 6px;
          box-shadow:0 4px 15px rgba(124,58,237,0.3);
        }
        
        .logo img {
          width: 100%;
          height: 100%;
          object-fit: contain;
        }

        nav{display:flex;gap:8px;flex-wrap:wrap}
        nav a{
          padding:8px 16px;
          color:var(--tc-muted);
          text-decoration:none;
          border-radius:8px;
          transition:all 0.3s ease;
          font-weight:500;
          position: relative;
        }
        nav a:hover, nav a.active{
          color:var(--tc-accent);
          background:rgba(124,58,237,0.08);
        }
        nav a.active::after {
          content: '';
          position: absolute;
          bottom: -2px;
          left: 50%;
          transform: translateX(-50%);
          width: 20px;
          height: 2px;
          background: var(--tc-accent);
          border-radius: 1px;
        }

        .mobile-menu-btn {
          display: none;
          background: none;
          border: none;
          color: var(--tc-muted);
          font-size: 24px;
          cursor: pointer;
          padding: 8px;
          border-radius: 8px;
          transition: all 0.3s ease;
        }
        .mobile-menu-btn:hover {
          color: var(--tc-accent);
          background: rgba(124,58,237,0.08);
        }

        .theme-toggle {
          background: none;
          border: none;
          font-size: 20px;
          cursor: pointer;
          padding: 8px;
          border-radius: 8px;
          transition: all 0.3s ease;
          margin-left: 8px;
        }

        .theme-toggle:hover {
          background: rgba(124,58,237,0.08);
          transform: scale(1.1);
        }

        @media (max-width: 768px) {
          .mobile-menu-btn {
            display: block;
          }
          
          nav {
            position: fixed;
            top: 0;
            right: ${isMobileMenuOpen ? '0' : '-100%'};
            width: 80%;
            max-width: 300px;
            height: 100vh;
            background: ${isDarkMode ? 'rgba(15,23,42,0.98)' : 'rgba(255,255,255,0.98)'};
            backdrop-filter: blur(20px);
            flex-direction: column;
            justify-content: center;
            align-items: center;
            transition: right 0.4s ease;
            z-index: 999;
            box-shadow: -10px 0 30px rgba(0,0,0,0.1);
          }
          
          nav a {
            font-size: 18px;
            padding: 16px 24px;
            width: 100%;
            text-align: center;
          }

          .theme-toggle {
            margin-top: 20px;
            font-size: 24px;
          }
        }

        .hero{
          display:grid;
          grid-template-columns:1fr 420px;
          gap:32px;
          align-items:center;
          padding:70px 40px 60px;
          background:${isDarkMode ? 
            'linear-gradient(135deg, rgba(124,58,237,0.15) 0%, rgba(6,182,212,0.1) 50%, rgba(236,72,153,0.1) 100%)' : 
            'linear-gradient(135deg, rgba(124,58,237,0.08) 0%, rgba(6,182,212,0.05) 50%, rgba(236,72,153,0.05) 100%)'
          };
          border-radius:20px;
          margin-top: 120px;
          margin-bottom:32px;
          position:relative;
          overflow:hidden;
          min-height: 75vh;
        }
        .hero::before{
          content:'';
          position:absolute;
          top:10%;
          right:-50%;
          width:200%;
          height:200%;
          background:radial-gradient(circle, rgba(124,58,237,0.1) 0%, transparent 70%);
          animation:float 20s infinite ease-in-out;
        }
        .hero::after{
          content:'';
          position:absolute;
          bottom:-30%;
          left:-30%;
          width:150%;
          height:120%;
          background:radial-gradient(circle, rgba(6,182,212,0.08) 0%, transparent 60%);
          animation:float 15s infinite ease-in-out reverse;
        }
        @keyframes float{
          0%,100%{transform:translate(0,0) rotate(0deg);}
          50%{transform:translate(-30px,30px) rotate(180deg);}
        }

        .hero-content {
          position: relative;
          z-index: 2;
        }

        .hero-stats {
          display: flex;
          gap: 32px;
          margin-top: 10px;
          flex-wrap: wrap;
        }

        .stat-item {
          text-align: center;
        }

        .stat-number {
          font-size: 32px;
          font-weight: 800;
          color: var(--tc-accent);
          display: block;
          line-height: 1;
        }

        .stat-label {
          font-size: 14px;
          color: var(--tc-muted);
          margin-top: 4px;
        }

        .hero h1{font-size:42px;margin:0 0 20px;line-height:1.2;color:var(--tc-text);font-weight:800}
        .hero p{color:var(--tc-muted);margin:0 0 24px;font-size:18px}

        .ctas{display:flex;gap:12px;flex-wrap:wrap}

        .btn{
          background:var(--tc-accent);
          color:white;
          padding:14px 28px;
          border-radius:12px;
          border:0;
          cursor:pointer;
          font-weight:600;
          font-size:15px;
          transition:all 0.3s ease;
          box-shadow:0 4px 15px rgba(124,58,237,0.3);
        }
        .btn:hover{
          transform:translateY(-2px);
          box-shadow:0 6px 20px rgba(124,58,237,0.4);
        }
        .btn.ghost{
          background:transparent;
          color:var(--tc-accent);
          border:2px solid var(--tc-accent);
          box-shadow:none;
        }
        .btn.ghost:hover{
          background:var(--tc-accent);
          color:white;
        }

        .card{
          background:var(--tc-card-bg);
          backdrop-filter:blur(10px);
          border-radius:16px;
          padding:24px;
          box-shadow:0 10px 40px rgba(15,23,42,0.1);
          border:1px solid rgba(124,58,237,0.1);
          transition:all 0.3s ease;
        }
        .card:hover{
          transform:translateY(-4px);
          box-shadow:0 15px 50px rgba(15,23,42,0.15);
        }

        .services{display:grid;grid-template-columns:repeat(3,1fr);gap:20px;margin-top:32px}

        .service-card{
          padding:28px;
          border-radius:16px;
          background:${isDarkMode ? 
            'linear-gradient(135deg, rgba(30,41,59,0.9) 0%, rgba(51,65,85,0.9) 100%)' : 
            'linear-gradient(135deg, rgba(255,255,255,0.9) 0%, rgba(248,250,252,0.9) 100%)'
          };
          border:2px solid rgba(124,58,237,0.1);
          transition:all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          position:relative;
          overflow:hidden;
          cursor: pointer;
        }
        .service-card::before{
          content:'';
          position:absolute;
          top:0;
          left:0;
          width:100%;
          height:4px;
          background:var(--tc-bg-gradient);
          transform:scaleX(0);
          transition:transform 0.3s ease;
        }
        .service-card::after{
          content:'';
          position:absolute;
          top:50%;
          left:50%;
          width:0;
          height:0;
          background:radial-gradient(circle, rgba(124,58,237,0.1) 0%, transparent 70%);
          transform:translate(-50%, -50%);
          transition:all 0.4s ease;
          border-radius:50%;
        }
        .service-card:hover::before{
          transform:scaleX(1);
        }
        .service-card:hover::after{
          width:300px;
          height:300px;
        }
        .service-card:hover{
          transform:translateY(-12px) scale(1.02);
          box-shadow:0 25px 50px rgba(124,58,237,0.2);
          border-color:var(--tc-accent);
        }

        .service-icon {
          width: 60px;
          height: 60px;
          border-radius: 12px;
          background: var(--tc-bg-gradient);
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-size: 24px;
          margin-bottom: 20px;
          transition: all 0.3s ease;
        }

        .service-card:hover .service-icon {
          transform: scale(1.1) rotate(5deg);
        }

        .technologies-grid{
          display:grid;
          grid-template-columns:repeat(auto-fit, minmax(180px, 1fr));
          gap:20px;
          margin-top:32px;
        }

        .tech-box{
          background:${isDarkMode ? 
            'linear-gradient(135deg, rgba(30,41,59,0.95) 0%, rgba(51,65,85,0.95) 100%)' : 
            'linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(248,250,252,0.95) 100%)'
          };
          border:2px solid rgba(124,58,237,0.15);
          border-radius:16px;
          padding:24px;
          text-align:center;
          transition:all 0.3s ease;
          position:relative;
          overflow:hidden;
        }
        .tech-box::before{
          content:'';
          position:absolute;
          top:0;
          left:0;
          width:100%;
          height:4px;
          background:var(--tc-bg-gradient);
          transform:scaleX(0);
          transition:transform 0.3s ease;
        }
        .tech-box:hover::before{
          transform:scaleX(1);
        }
        .tech-box:hover{
          transform:translateY(-8px);
          box-shadow:0 15px 40px rgba(124,58,237,0.2);
          border-color:var(--tc-accent);
        }
        .tech-box .tech-icon{
          font-size:48px;
          margin-bottom:12px;
          display:flex;
          align-items:center;
          justify-content:center;
          line-height:1;
        }
        .tech-box .tech-icon svg{
          width:48px;
          height:48px;
          transition:transform 0.3s ease;
        }
        .tech-box:hover .tech-icon svg{
          transform:scale(1.1);
        }
        .tech-box h3{
          font-size:20px;
          font-weight:700;
          color:var(--tc-text);
          margin:0;
        }
        .tech-box .tech-category{
          font-size:12px;
          color:var(--tc-accent);
          text-transform:uppercase;
          letter-spacing:1px;
          margin-top:8px;
          font-weight:600;
        }

        .tag{
          display:inline-block;
          padding:8px 16px;
          border-radius:20px;
          border:2px solid rgba(124,58,237,0.2);
          font-size:13px;
          font-weight:500;
          background:white;
          cursor:pointer;
          transition:all 0.3s ease;
        }
        .tag:hover, .tag[aria-pressed="true"]{
          background:var(--tc-accent);
          color:white;
          border-color:var(--tc-accent);
          transform:translateY(-2px);
        }

        section{
          margin:64px 0;
          padding:48px 0;
        }
        section h2{
          font-size:36px;
          margin-bottom:16px;
          color:var(--tc-text);
          font-weight:800;
        }

        .service-card h3{
          font-size: 20px;
          margin: 0 0 16px 0;
          color: var(--tc-text);
          font-weight: 700;
          line-height: 1.3;
        }

        #about{
          background:${isDarkMode ? 
            'linear-gradient(135deg, rgba(124,58,237,0.15) 0%, rgba(6,182,212,0.15) 100%)' : 
            'linear-gradient(135deg, rgba(124,58,237,0.05) 0%, rgba(6,182,212,0.05) 100%)'
          };
          border-radius:24px;
          padding:64px 40px;
          margin:80px 0;
        }

        #contact{
          background:${isDarkMode ? 
            'linear-gradient(135deg, rgba(236,72,153,0.15) 0%, rgba(124,58,237,0.15) 100%)' : 
            'linear-gradient(135deg, rgba(236,72,153,0.05) 0%, rgba(124,58,237,0.05) 100%)'
          };
          border-radius:24px;
          padding:64px 40px;
          margin:80px 0;
        }

        .footer{
          padding:48px 0;
          color:var(--tc-muted);
          background:linear-gradient(135deg, var(--tc-bg-dark) 0%, #1e293b 100%);
          margin-top:80px;
          position:relative;
          overflow:hidden;
        }
        .footer::before{
          content:'';
          position:absolute;
          top:0;
          left:0;
          width:100%;
          height:2px;
          background:rgba(124,58,237,0.2);
          transform:skewY(-5deg);
          transform-origin:left;
        }
        .footer .container{
          display:flex;
          flex-direction:column;
          gap:32px;
        }
        .footer-content{
          display:flex;
          justify-content:center;
          align-items:flex-start;
          flex-wrap:wrap;
          gap:32px;
        }
        .footer-links{
          display:flex;
          gap:80px;
          flex-wrap:wrap;
          justify-content:space-between;
          width:100%;
          max-width:900px;
        }
        .footer-links > div{
          flex: 1 1 200px;
        }
        .footer .muted{
          color:rgba(255,255,255,0.7);
        }
        .footer h4{
          color:white;
          margin-bottom:16px;
          font-size:18px;
        }

        .two-col{display:grid;grid-template-columns:1fr 400px;gap:32px;margin-top:32px}

        .testimonials{
          display:grid;
          grid-template-columns:repeat(3,1fr);
          gap:20px;
          margin-top:32px;
        }
        .testimonials .card{
          background:var(--tc-card-bg);
          border-left:4px solid var(--tc-accent);
        }

        .contact-grid{
          display:grid;
          grid-template-columns:1.2fr 1fr;
          gap:32px;
          margin-top:32px;
        }

        .contact-info-card{
          background:${isDarkMode ? 
            'linear-gradient(135deg, rgba(124,58,237,0.2) 0%, rgba(6,182,212,0.2) 100%)' : 
            'linear-gradient(135deg, rgba(124,58,237,0.1) 0%, rgba(6,182,212,0.1) 100%)'
          };
          padding:32px;
          border-radius:20px;
          border:2px solid rgba(124,58,237,0.2);
        }

        .social-links{
          display:flex;
          gap:12px;
          margin-top:16px;
        }
        .social-links a{
          padding:10px 20px;
          background:${isDarkMode ? '#334155' : 'white'};
          border-radius:10px;
          text-decoration:none;
          color:var(--tc-accent);
          font-weight:600;
          transition:all 0.3s ease;
          border:2px solid transparent;
        }
        .social-links a:hover{
          background:var(--tc-accent);
          color:white;
          transform:translateY(-2px);
          box-shadow:0 4px 15px rgba(124,58,237,0.3);
        }

        /* Scroll animations */
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fadeInLeft {
          from {
            opacity: 0;
            transform: translateX(-30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes fadeInRight {
          from {
            opacity: 0;
            transform: translateX(30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        .animate-on-scroll {
          opacity: 0;
          animation: fadeInUp 0.6s ease forwards;
        }

        .animate-on-scroll.delay-1 {
          animation-delay: 0.1s;
        }

        .animate-on-scroll.delay-2 {
          animation-delay: 0.2s;
        }

        .animate-on-scroll.delay-3 {
          animation-delay: 0.3s;
        }

        /* Parallax effect */
        .parallax-bg {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 120%;
          background: linear-gradient(45deg, rgba(124,58,237,0.05) 0%, rgba(6,182,212,0.05) 100%);
          transform: translateZ(0);
          will-change: transform;
        }

        /* Improved button animations */
        .btn {
          position: relative;
          overflow: hidden;
        }

        .btn::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
          transition: left 0.5s;
        }

        .btn:hover::before {
          left: 100%;
        }

        @media (max-width:900px){
          .hero{grid-template-columns:1fr; padding:70px 24px 40px; text-align: center; margin-top: 100px;}
          .hero h1{font-size:32px;}
          .hero-stats{justify-content: center;}
          .services{grid-template-columns:repeat(2,1fr)}
          .technologies-grid{grid-template-columns:repeat(2,1fr)}
          .testimonials{grid-template-columns:1fr}
          .two-col{grid-template-columns:1fr}
          .contact-grid{grid-template-columns:1fr}
          section{padding:32px 0;}
          #about, #contact{padding:40px 24px;}
          .footer-content{flex-direction:column;}
          .footer-links{flex-direction:column; gap:24px;}
        }

        @media (max-width:600px){
          .services{grid-template-columns:1fr}
          .technologies-grid{grid-template-columns:1fr}
          .hero{padding:60px 16px 32px; margin-top: 90px;}
          .hero h1{font-size:28px;}
          .hero-stats{flex-direction: column; gap: 16px;}
          section h2{font-size:28px;}
          .container{padding: 32px 16px;}
        }

        /* Floating Action Buttons */
        .fab {
          position: fixed;
          bottom: 30px;
          right: 30px;
          width: 60px;
          height: 60px;
          border-radius: 50%;
          background: var(--tc-bg-gradient);
          color: white;
          border: none;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 24px;
          box-shadow: 0 8px 25px rgba(124,58,237,0.4);
          transition: all 0.3s ease;
          z-index: 999;
          animation: fabPulse 2s infinite;
        }

        .fab:hover {
          transform: scale(1.1);
          box-shadow: 0 12px 35px rgba(124,58,237,0.5);
        }

        .fab.scroll-top {
          bottom: 100px;
          background: rgba(255,255,255,0.9);
          color: var(--tc-accent);
          backdrop-filter: blur(10px);
          border: 2px solid rgba(124,58,237,0.2);
          opacity: ${showScrollTop ? '1' : '0'};
          visibility: ${showScrollTop ? 'visible' : 'hidden'};
          animation: none;
        }

        .fab.scroll-top:hover {
          background: var(--tc-accent);
          color: white;
        }

        @keyframes fabPulse {
          0% { box-shadow: 0 8px 25px rgba(124,58,237,0.4); }
          50% { box-shadow: 0 8px 25px rgba(124,58,237,0.6), 0 0 0 10px rgba(124,58,237,0.1); }
          100% { box-shadow: 0 8px 25px rgba(124,58,237,0.4); }
        }

        /* modal styles */
        .modal-backdrop{
          position:fixed;
          inset:0;
          background:rgba(2,6,23,0.8);
          backdrop-filter:blur(8px);
          display:flex;
          align-items:center;
          justify-content:center;
          padding:20px;
          z-index:1001;
          animation: modalFadeIn 0.3s ease;
        }

        @keyframes modalFadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        .modal{
          background:${isDarkMode ? '#1e293b' : 'white'};
          color: var(--tc-text);
          border-radius:20px;
          max-width:900px;
          width:100%;
          max-height:90vh;
          overflow:auto;
          padding:32px;
          box-shadow:0 25px 80px rgba(0,0,0,0.4);
          transform: scale(0.9);
          animation: modalSlideIn 0.3s ease forwards;
        }

        @keyframes modalSlideIn {
          from { transform: scale(0.9); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }

        .close-btn{
          background:transparent;
          border:0;
          font-size:24px;
          cursor:pointer;
          color:var(--muted);
          transition:all 0.3s ease;
          padding: 8px;
          border-radius: 8px;
        }
        .close-btn:hover{
          color:var(--accent);
          background: rgba(124,58,237,0.1);
          transform: scale(1.1);
        }

        /* form styles */
        form label{
          display:block;
          font-size:14px;
          margin-bottom:8px;
          font-weight:600;
          color:var(--tc-text);
        }
        input,textarea,select{
          width:100%;
          padding:14px 16px;
          border-radius:12px;
          border:2px solid rgba(124,58,237,0.2);
          margin-bottom:20px;
          font-size:15px;
          transition:all 0.3s ease;
          background:${isDarkMode ? '#334155' : 'white'};
          color: var(--tc-text);
          font-family:inherit;
        }
        select{
          appearance: auto;
          cursor: pointer;
        }
        select option{
          background:${isDarkMode ? '#1e293b' : 'white'};
          color: var(--tc-text);
          padding: 10px;
        }
        input:focus,textarea:focus,select:focus{
          outline:none;
          border-color:var(--accent);
          box-shadow:0 0 0 4px rgba(124,58,237,0.1);
        }
        textarea{min-height:140px;resize:vertical}

        /* small helpers */
        .muted{color:var(--muted)}
        .section-title{
          font-size:14px;
          text-transform:uppercase;
          letter-spacing:2px;
          color:var(--accent);
          font-weight:700;
          margin-bottom:8px;
        }

        ul{
          list-style:none;
          padding:0;
        }
        ul li{
          padding:12px 0;
          padding-left:24px;
          position:relative;
          color:var(--text-light);
        }
        ul li::before{
          content:'✓';
          position:absolute;
          left:0;
          color:var(--accent);
          font-weight:bold;
          font-size:18px;
        }

        /* Mobile Responsive Styles */
        @media (max-width: 900px) {
          .hero {
            grid-template-columns: 1fr;
            padding: 70px 24px 40px;
            text-align: center;
            margin-top: 100px;
            min-height: auto;
          }
          
          .hero h1 {
            font-size: 32px;
          }
          
          .hero p {
            font-size: 16px;
          }
          
          .hero-stats {
            justify-content: center;
          }
          
          .ctas {
            justify-content: center;
            align-items: center;
          }
          
          .services {
            grid-template-columns: repeat(2, 1fr);
            gap: 16px;
          }
          
          .technologies-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 16px;
          }
          
          .testimonials {
            grid-template-columns: 1fr;
          }
          
          .two-col {
            grid-template-columns: 1fr;
          }
          
          .contact-grid {
            grid-template-columns: 1fr;
          }
          
          section {
            padding: 32px 0;
          }
          
          #about, #contact {
            padding: 40px 24px;
          }
          
          .footer-content {
            flex-direction: column;
          }
          
          .footer-links {
            flex-direction: column;
            gap: 24px;
          }
          
          .container {
            padding: 32px 16px;
          }
          
          .logo {
            width: 40px;
            height: 40px;
          }
          
          .brand img {
            height: 60px !important;
          }
          
          .modal {
            padding: 24px;
            margin: 16px;
          }
          
          .service-card {
            padding: 20px;
          }
          
          .tech-box {
            padding: 20px 16px;
          }
        }

        @media (max-width: 600px) {
          .services {
            grid-template-columns: 1fr;
            gap: 16px;
          }
          
          .technologies-grid {
            grid-template-columns: 1fr;
            gap: 16px;
          }
          
          .hero {
            padding: 60px 16px 32px;
            margin-top: 90px;
          }
          
          .hero h1 {
            font-size: 28px;
            line-height: 1.2;
          }
          
          .hero p {
            font-size: 15px;
          }
          
          .hero-stats {
            flex-direction: column;
            gap: 16px;
            align-items: center;
          }
          
          .stat-item {
            width: 100%;
            max-width: 200px;
          }
          
          section h2 {
            font-size: 28px;
          }
          
          .container {
            padding: 32px 16px;
          }
          
          .btn {
            width: 100%;
            max-width: 300px;
            padding: 12px 20px;
            font-size: 14px;
            justify-content: center;
          }
          
          .ctas {
            flex-direction: column;
            width: 100%;
            align-items: center;
            justify-content: center;
          }
          
          .brand img {
            height: 50px !important;
          }
          
          nav a {
            font-size: 16px;
            padding: 12px 20px;
          }
          
          .fab {
            width: 50px;
            height: 50px;
            font-size: 20px;
            bottom: 20px;
            right: 20px;
          }
          
          .fab.scroll-top {
            bottom: 80px;
            right: 20px;
          }
          
          .service-icon {
            width: 50px;
            height: 50px;
            font-size: 20px;
          }
          
          .tech-box .tech-icon svg {
            width: 40px;
            height: 40px;
          }
          
          .card {
            padding: 20px;
          }
          
          input, textarea, select {
            font-size: 16px;
            padding: 12px 14px;
          }
          
          .social-links {
            flex-wrap: wrap;
          }
          
          .social-links a {
            flex: 1 1 calc(50% - 6px);
            min-width: 120px;
            text-align: center;
          }
          
          .footer {
            padding: 32px 0;
          }
          
          .footer-links {
            gap: 32px;
          }
          
          .modal {
            padding: 20px;
            margin: 12px;
            max-height: 85vh;
          }
          
          .section-title {
            font-size: 12px;
          }
        }

        @media (max-width: 480px) {
          .hero h1 {
            font-size: 24px;
          }
          
          .hero p {
            font-size: 14px;
          }
          
          section h2 {
            font-size: 24px;
          }
          
          .brand img {
            height: 45px !important;
          }
          
          .service-card h3 {
            font-size: 18px;
          }
          
          .tech-box h3 {
            font-size: 16px;
          }
          
          .btn {
            padding: 10px 16px;
            font-size: 13px;
          }
        }

      `}</style>

      <header className={isScrolled ? 'scrolled' : ''}>

        <div className="container nav">

          <a 
            href="#home" 
            className="brand" 
            onClick={() => {
              window.scrollTo({top: 0, behavior: 'smooth'});
              setIsMobileMenuOpen(false);
            }}
            style={{cursor: 'pointer', textDecoration: 'none', display: 'flex', alignItems: 'center', justifyContent: 'flex-start'}}
          >
            <img 
              src="/asset/Android Compact - 1 (3).svg" 
              alt="Teroment Solutions" 
              style={{
                height: '80px',
                width: 'auto',
                maxWidth: '100%',
                objectFit: 'contain',
                display: 'block'
              }} 
            />
          </a>

          <button 
            className="mobile-menu-btn"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle mobile menu"
          >
            {isMobileMenuOpen ? <FaTimes /> : <FaBars />}
          </button>

          <nav aria-label="Main navigation">

            <a 
              href="#home" 
              className={activeSection === 'home' ? 'active' : ''}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Home
            </a>

            <a 
              href="#services" 
              className={activeSection === 'services' ? 'active' : ''}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Services
            </a>

            <a 
              href="#technologies" 
              className={activeSection === 'technologies' ? 'active' : ''}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Technologies
            </a>

            <a 
              href="#about" 
              className={activeSection === 'about' ? 'active' : ''}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              About
            </a>

            <a 
              href="#contact" 
              className={activeSection === 'contact' ? 'active' : ''}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Contact
            </a>

            <button 
              className="theme-toggle"
              onClick={() => setIsDarkMode(!isDarkMode)}
              title={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              {isDarkMode ? '☀️' : '🌙'}
            </button>

          </nav>

        </div>

      </header>

      <main className="container">

        <section id="home" className="hero">

          <div className="hero-content">

            <h1>We build IT solutions & digital marketing that drive growth</h1>

            <p>Websites, mobile apps, AI solutions and blockchain development — practical solutions that deliver measurable results.</p>

            <div className="ctas">

              <button className="btn" onClick={(e) => {
                e.preventDefault();
                const contactSection = document.getElementById('contact');
                if (contactSection) {
                  contactSection.scrollIntoView({behavior:'smooth', block: 'start'});
                }
              }}>
                Get a Quote <FaArrowRight style={{marginLeft: '8px'}} />
              </button>

              <button className="btn ghost" onClick={(e) => {
                e.preventDefault();
                const servicesSection = document.getElementById('services');
                if (servicesSection) {
                  servicesSection.scrollIntoView({behavior:'smooth', block: 'start'});
                }
              }}>
                <FaPlay style={{marginRight: '8px'}} /> View Services
              </button>

            </div>

            <div className="hero-stats">
              <div className="stat-item">
                <span className="stat-number">50+</span>
                <span className="stat-label">Projects Delivered</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">25+</span>
                <span className="stat-label">Happy Clients</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">3+</span>
                <span className="stat-label">Years Experience</span>
              </div>
            </div>

          </div>

          <aside>

            <div className="card" style={{padding: '0', overflow: 'hidden'}}>

              <div style={{padding: '24px 24px 16px 24px'}}>
                <h3 style={{
                  margin: '0',
                  color: 'var(--tc-text)',
                  fontSize: '24px',
                  fontWeight: '800',
                  lineHeight: '1.3',
                  letterSpacing: '-0.02em'
                }}>Teroment Solutions Intro</h3>
              </div>

              <div style={{
                position: 'relative',
                paddingBottom: '56.25%',
                height: 0,
                overflow: 'hidden'
              }}>
                <iframe
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    border: 0
                  }}
                  src="https://www.youtube.com/embed/iIoqVnlrbvE"
                  title="Teroment Solutions Intro"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>

            </div>

          </aside>

        </section>

        <section id="services" style={{
          background: isDarkMode ? 
            'linear-gradient(135deg, rgba(6,182,212,0.1) 0%, rgba(124,58,237,0.1) 100%)' : 
            'linear-gradient(135deg, rgba(6,182,212,0.03) 0%, rgba(124,58,237,0.03) 100%)', 
          borderRadius:'24px', 
          padding:'64px 40px', 
          margin:'80px 0',
          scrollMarginTop: '100px'
        }}>

          <div className="section-title">Our Services</div>
          <h2>Complete IT & Digital Marketing Solutions</h2>

          <p style={{fontSize:'18px', marginBottom:'40px', color:'var(--tc-muted)', lineHeight: '1.6'}}>Integrated IT & digital marketing services — pick what you need or ask for a tailored plan.</p>

          <div className="services">

            {services.map(s => {
              const Icon = s.icon;
              return (
                <article key={s.id} className="service-card" aria-labelledby={`service-${s.id}`} onClick={() => setShowServiceModal(s)}>

                  <div className="service-icon" style={{background: `linear-gradient(135deg, ${s.color}, ${s.color}dd)`}}>
                    <Icon />
                  </div>

                  <h3 id={`service-${s.id}`} style={{
                    color: 'var(--tc-text)',
                    fontSize: '20px',
                    fontWeight: '700',
                    margin: '0 0 16px 0',
                    lineHeight: '1.3',
                    position: 'relative',
                    zIndex: 2
                  }}>{s.title}</h3>

                  <p style={{color: 'var(--tc-muted)', lineHeight: '1.6', position: 'relative', zIndex: 2}}>{s.short}</p>

                  <div style={{marginTop:20, position: 'relative', zIndex: 2}}>

                    <button className="btn ghost" onClick={(e) => {e.stopPropagation(); setShowServiceModal(s);}} style={{color: s.color, borderColor: s.color}}>
                      Learn more <FaArrowRight style={{marginLeft: '8px', fontSize: '12px'}} />
                    </button>

                  </div>

                </article>
              );
            })}

          </div>

        </section>

        <section id="technologies" style={{
          background: isDarkMode ? 
            'linear-gradient(135deg, rgba(236,72,153,0.1) 0%, rgba(124,58,237,0.1) 100%)' : 
            'linear-gradient(135deg, rgba(236,72,153,0.03) 0%, rgba(124,58,237,0.03) 100%)', 
          borderRadius:'24px', 
          padding:'64px 40px', 
          margin:'80px 0',
          scrollMarginTop: '100px'
        }}>

          <div className="section-title">Technologies</div>
          <h2>Technologies We Work With</h2>

          <p className="muted" style={{fontSize:'18px', marginBottom:'40px'}}>We leverage cutting-edge technologies to build robust, scalable, and innovative solutions for our clients.</p>

          <div className="technologies-grid" style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '20px', marginBottom: '40px'}}>
            {technologies.map((tech) => {
              const Icon = tech.icon;
              return (
                <div 
                  key={tech.id} 
                  className="tech-card" 
                  style={{
                    background: isDarkMode ? '#1e293b' : '#ffffff', 
                    borderRadius: '16px', 
                    padding: '28px 20px', 
                    textAlign: 'center', 
                    boxShadow: '0 4px 12px rgba(0,0,0,0.05)', 
                    transition: 'all 0.3s ease',
                    border: `1px solid ${isDarkMode ? '#334155' : '#e2e8f0'}`,
                    '&:hover': {
                      boxShadow: '0 8px 25px rgba(0,0,0,0.1)',
                      transform: 'translateY(-5px)'
                    }
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-5px)'}
                  onMouseLeave={(e) => e.currentTarget.style.transform = 'none'}
                >
                  <div style={{
                    width: '70px', 
                    height: '70px', 
                    margin: '0 auto 16px', 
                    backgroundColor: `${tech.color}15`, 
                    borderRadius: '16px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    <Icon size={36} style={{ color: tech.color }} />
                  </div>
                  <h3 style={{
                    margin: '0 0 8px', 
                    color: 'var(--tc-text)',
                    fontSize: '18px',
                    fontWeight: '600'
                  }}>{tech.name}</h3>
                  <p style={{
                    fontSize: '14px',
                    color: 'var(--tc-muted)',
                    margin: 0,
                    fontWeight: '500'
                  }}>{tech.category}</p>
                </div>
              );
            })}
          </div>

          <div id="about" className="two-col" style={{scrollMarginTop: '100px'}}>
            <div>
              <p style={{fontSize:'18px', marginBottom:'32px', color:'var(--tc-text-light)', lineHeight: '1.6'}}>
                Teroment Solutions pairs technical excellence with marketing-driven thinking. We help businesses scale by building products, optimizing channels, and ensuring infrastructure is reliable and secure.
              </p>

              <h3 style={{fontSize:'24px', marginBottom:'20px', color:'var(--tc-text)', fontWeight: '700'}}>Why clients choose us</h3>

              <ul style={{marginBottom:'40px'}}>

                <li>Outcome-focused delivery and transparent reporting</li>

                <li>Cross-functional teams: devs, designers, marketers</li>

                <li>Practical strategies — no buzzword engineering</li>

              </ul>

              <h3 style={{fontSize:'24px', marginTop:'40px', marginBottom:'24px', color:'var(--tc-text)', fontWeight: '700'}}>What our clients say</h3>

              <div className="testimonials">

                <div className="card">

                  <p style={{fontSize:'16px', marginBottom:'12px', fontStyle:'italic', color: 'var(--tc-text-light)', lineHeight: '1.6'}}>&ldquo;Our web and mobile apps launched flawlessly - smooth project execution.&rdquo;</p>

                  <div style={{fontWeight:600, color:'var(--accent)'}}>— Kevin</div>
                  <div className="muted" style={{fontSize:'14px'}}>Founder</div>

                </div>

                <div className="card">

                  <p style={{fontSize:'16px', marginBottom:'12px', fontStyle:'italic', color: 'var(--tc-text-light)', lineHeight: '1.6'}}>&ldquo;Strong technical SEO improvements and clear reporting.&rdquo;</p>

                  <div style={{fontWeight:600, color:'var(--accent)'}}>— Trisha</div>
                  <div className="muted" style={{fontSize:'14px'}}>Head of Marketing</div>

                </div>

                <div className="card">

                  <p style={{fontSize:'16px', marginBottom:'12px', fontStyle:'italic', color: 'var(--tc-text-light)', lineHeight: '1.6'}}>&ldquo;AI-driven features were integrated seamlessly - smart and reliable team.&rdquo;</p>

                  <div style={{fontWeight:600, color:'var(--accent)'}}>— Vikram</div>
                  <div className="muted" style={{fontSize:'14px'}}>CTO</div>

                </div>

              </div>

            </div>

            <aside>

              <div className="card" style={{position:'sticky', top:'100px'}}>

                <h4 style={{fontSize:'20px', marginBottom:'16px', color:'var(--tc-text)', fontWeight: '600'}}>Get in touch</h4>

                <div style={{marginBottom:'24px', color: 'var(--tc-muted)', fontSize: '15px'}}>Teroment Solutions — IT, AI & Digital Marketing</div>

                <div style={{marginTop:'20px'}}>
                  <div style={{marginBottom:'20px'}}>
                    <strong style={{display:'block', marginBottom:'8px', color:'var(--text)'}}>📍 Address</strong>
                    <div style={{lineHeight:'1.6', color: 'var(--tc-muted)', fontSize: '15px'}}>3rd floor, Rajib Gandhi Infotech Park, Hinjewadi Phase 1, Pune, Maharashtra, India, PIN: 411057</div>
                  </div>

                  <div style={{marginBottom:'20px'}}>
                    <strong style={{display:'block', marginBottom:'8px', color:'var(--text)'}}>📞 Phone</strong>
                    <div style={{color: 'var(--tc-muted)', fontSize: '15px'}}>+91 7001414991</div>
                  </div>

                  <div style={{marginBottom:'20px'}}>
                    <strong style={{display:'block', marginBottom:'8px', color:'var(--text)'}}>✉️ Email</strong>
                    <div style={{color: 'var(--tc-muted)', fontSize: '15px'}}>info@teroment.com</div>
                  </div>
                </div>

              </div>

            </aside>

          </div>

        </section>

        <section id="contact" style={{scrollMarginTop: '100px'}}>

          <div className="section-title">Get In Touch</div>
          <h2>Let's start a conversation</h2>

          <p className="muted" style={{fontSize:'18px', marginBottom:'40px'}}>Send us a message — we usually reply within 1 business day.</p>

          <div className="contact-grid">

            <form className="card" onSubmit={submitForm} ref={formRef} aria-label="Contact form" style={{background: isDarkMode ? '#1e293b' : 'white'}}>

              <label htmlFor="name">Full name *</label>

              <input id="name" name="from_name" type="text" required value={formState.name} onChange={e => setFormState({...formState,name:e.target.value})} placeholder="John Doe" />

              <label htmlFor="email">Email *</label>

              <input id="email" name="from_email" type="email" required value={formState.email} onChange={e => setFormState({...formState,email:e.target.value})} placeholder="john@example.com" />

              <label htmlFor="phone">Phone</label>

              <input id="phone" name="from_phone" type="tel" value={formState.phone} onChange={e => setFormState({...formState,phone:e.target.value})} placeholder="+91 9876543210" />

              <label htmlFor="service">Service interested in</label>

              <select id="service" name="service" value={formState.service} onChange={e => setFormState({...formState,service:e.target.value})}>

                <option value="">Choose a service</option>

                {services.map(s=> <option key={s.id} value={s.title}>{s.title}</option>)}

                <option value="Others">Others</option>

              </select>

              <label htmlFor="message">Message *</label>

              <textarea id="message" name="message" required value={formState.message} onChange={e => setFormState({...formState,message:e.target.value})} placeholder="Tell us about your project..."></textarea>

              <div style={{display:'flex',gap:12, flexWrap:'wrap', marginTop:'24px'}}>

                <button className="btn" type="submit" disabled={status.loading} style={{flex:1, minWidth:'150px'}}>
                  {status.loading ? 'Sending...' : 'Send message'}
                </button>

                <button className="btn ghost" type="button" onClick={() => { setFormState({ name: '', email: '', phone: '', service: '', message: '' }); if (formRef.current) formRef.current.reset(); }}>
                  Reset
                </button>

              </div>

              {status.message && (

                <div style={{marginTop:16, padding:'12px 16px', borderRadius:'8px', background: status.ok ? 'rgba(34,197,94,0.1)' : 'rgba(239,68,68,0.1)', color: status.ok ? '#16a34a' : '#dc2626', fontWeight:500}} role="status">
                  {status.message}
                </div>

              )}

            </form>

            <aside>

              <div className="contact-info-card">

                <h4 style={{fontSize:'22px', marginBottom:'24px', color:'var(--text)'}}>📍 Office Information</h4>

                <div style={{marginBottom:'28px'}}>
                  <strong style={{display:'block', marginBottom:'8px', color:'var(--text)'}}>Address</strong>
                  <div className="muted" style={{lineHeight:'1.7'}}>3rd floor, Rajib Gandhi Infotech Park, Hinjewadi Phase 1, Pune, Maharashtra, India, PIN: 411057</div>
                </div>

                <div style={{marginBottom:'28px'}}>
                  <strong style={{display:'block', marginBottom:'8px', color:'var(--text)'}}>🕐 Business Hours</strong>
                  <div className="muted" style={{fontSize:'15px'}}>Monday - Friday</div>
                  <div className="muted" style={{fontSize:'15px'}}>9:30am - 6:30pm IST</div>
                </div>

                <div>
                  <strong style={{display:'block', marginBottom:'16px', color:'var(--text)'}}>🔗 Follow Us</strong>

                  <div className="social-links">

                    <a href="#" target="_blank" rel="noopener noreferrer">LinkedIn</a>

                    <a href="#" target="_blank" rel="noopener noreferrer">Twitter</a>

                    <a href="#" target="_blank" rel="noopener noreferrer">Instagram</a>

                  </div>

                </div>

              </div>

            </aside>

          </div>

        </section>

        <footer className="footer">

          <div className="container">

            <div className="footer-content">

              <div className="footer-links" style={{display: 'flex', gap: '80px', flexWrap: 'wrap', justifyContent: 'space-between', width: '100%'}}>

                <div style={{flex: '1 1 200px'}}>

                  <h4>Services</h4>

                  <div style={{display:'flex', flexDirection:'column', gap:'12px', marginTop:'12px'}}>

                    <a href="#services" className="muted" style={{textDecoration:'none', transition:'color 0.3s'}} onMouseEnter={e => e.target.style.color='white'} onMouseLeave={e => e.target.style.color='rgba(255,255,255,0.7)'}>Web Development</a>

                    <a href="#services" className="muted" style={{textDecoration:'none', transition:'color 0.3s'}} onMouseEnter={e => e.target.style.color='white'} onMouseLeave={e => e.target.style.color='rgba(255,255,255,0.7)'}>Mobile Apps</a>

                    <a href="#services" className="muted" style={{textDecoration:'none', transition:'color 0.3s'}} onMouseEnter={e => e.target.style.color='white'} onMouseLeave={e => e.target.style.color='rgba(255,255,255,0.7)'}>AI Solutions</a>

                    <a href="#services" className="muted" style={{textDecoration:'none', transition:'color 0.3s'}} onMouseEnter={e => e.target.style.color='white'} onMouseLeave={e => e.target.style.color='rgba(255,255,255,0.7)'}>Blockchain</a>

                  </div>

                </div>

                <div style={{flex: '1 1 200px'}}>

                  <h4>Insights</h4>

                  <div style={{display:'flex', flexDirection:'column', gap:'12px', marginTop:'12px'}}>

                    <a href="#" className="muted" style={{textDecoration:'none', transition:'color 0.3s'}} onMouseEnter={e => e.target.style.color='white'} onMouseLeave={e => e.target.style.color='rgba(255,255,255,0.7)'}>Blog</a>

                    <a href="#" className="muted" style={{textDecoration:'none', transition:'color 0.3s'}} onMouseEnter={e => e.target.style.color='white'} onMouseLeave={e => e.target.style.color='rgba(255,255,255,0.7)'}>Case Studies</a>

                    <a href="#" className="muted" style={{textDecoration:'none', transition:'color 0.3s'}} onMouseEnter={e => e.target.style.color='white'} onMouseLeave={e => e.target.style.color='rgba(255,255,255,0.7)'}>Sitemap</a>

                  </div>

                </div>

                <div style={{flex: '1 1 200px'}}>

                  <h4>Company</h4>

                  <div style={{display:'flex', flexDirection:'column', gap:'12px', marginTop:'12px'}}>

                    <a href="#about" className="muted" style={{textDecoration:'none', transition:'color 0.3s'}} onMouseEnter={e => e.target.style.color='white'} onMouseLeave={e => e.target.style.color='rgba(255,255,255,0.7)'}>About Us</a>

                    <a href="#technologies" className="muted" style={{textDecoration:'none', transition:'color 0.3s'}} onMouseEnter={e => e.target.style.color='white'} onMouseLeave={e => e.target.style.color='rgba(255,255,255,0.7)'}>Technologies</a>

                    <a href="#contact" className="muted" style={{textDecoration:'none', transition:'color 0.3s'}} onMouseEnter={e => e.target.style.color='white'} onMouseLeave={e => e.target.style.color='rgba(255,255,255,0.7)'}>Contact</a>

                  </div>

                </div>

              </div>

            </div>

            <div style={{paddingTop:'32px', borderTop:'1px solid rgba(255,255,255,0.1)', display:'flex', justifyContent:'space-between', alignItems:'center', flexWrap:'wrap', gap:'16px'}}>

              <div className="muted" style={{fontSize:'14px'}}>© {new Date().getFullYear()} Teroment Solutions. All rights reserved.</div>

              <div style={{display:'flex', gap:'20px'}}>

                <a href="#" className="muted" style={{textDecoration:'none', fontSize:'14px', transition:'color 0.3s'}} onMouseEnter={e => e.target.style.color='white'} onMouseLeave={e => e.target.style.color='rgba(255,255,255,0.7)'}>Privacy Policy</a>

                <a href="#" className="muted" style={{textDecoration:'none', fontSize:'14px', transition:'color 0.3s'}} onMouseEnter={e => e.target.style.color='white'} onMouseLeave={e => e.target.style.color='rgba(255,255,255,0.7)'}>Terms of Service</a>

              </div>

            </div>

          </div>

        </footer>

        {/* Service modal */}

        {showServiceModal && (

          <div className="modal-backdrop" role="dialog" aria-modal="true" aria-labelledby="service-title" onClick={() => setShowServiceModal(null)}>

            <div className="modal" onClick={e => e.stopPropagation()}>

              <div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>

                <h3 id="service-title">{showServiceModal.title}</h3>

                <button className="close-btn" onClick={() => setShowServiceModal(null)} aria-label="Close">✕</button>

              </div>

              <p className="muted">{showServiceModal.long}</p>

              <div style={{marginTop:12}}>

                <button className="btn" onClick={(e) => { 
                  e.preventDefault();
                  const contactSection = document.getElementById('contact');
                  if (contactSection) {
                    contactSection.scrollIntoView({behavior:'smooth', block: 'start'});
                  }
                  setShowServiceModal(null); 
                }}>Request this service</button>

              </div>

            </div>

          </div>

        )}

        {/* Floating Action Buttons */}
        <button 
          className="fab"
          onClick={(e) => {
            e.preventDefault();
            const contactSection = document.getElementById('contact');
            if (contactSection) {
              contactSection.scrollIntoView({behavior:'smooth', block: 'start'});
            }
          }}
          title="Get in touch"
        >
          <FaRocket />
        </button>

        <button 
          className="fab scroll-top"
          onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}
          title="Scroll to top"
        >
          <FaArrowRight style={{transform: 'rotate(-90deg)'}} />
        </button>

        {/* Mobile menu overlay */}
        {isMobileMenuOpen && (
          <div 
            className="modal-backdrop" 
            style={{background: 'rgba(0,0,0,0.5)', zIndex: 998}}
            onClick={() => setIsMobileMenuOpen(false)}
          />
        )}

      </main>

    </div>

  );

}
