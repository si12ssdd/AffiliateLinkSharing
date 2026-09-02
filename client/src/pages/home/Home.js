import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

function Home() {
  const [activeFaq, setActiveFaq] = useState(null);

  const toggleFaq = (index) => {
    setActiveFaq(activeFaq === index ? null : index);
  };

  const faqs = [
    {
      q: "How does Affiliate++ track clicks and conversions in real-time?",
      a: "Affiliate++ uses high-performance redirect edge routers that log every incoming request instantly before redirecting the user to your destination URL, giving you live analytics."
    },
    {
      q: "Can I use custom branded domains and slugs for my short links?",
      a: "Yes! Pro and Enterprise accounts allow you to connect custom domain names and customize link slugs to boost CTR and trust."
    },
    {
      q: "How do credits work for link generation and management?",
      a: "Credits are used when generating new shortened affiliate links or running deep export reports. New accounts start with free credits and can top up anytime."
    },
    {
      q: "Is team collaboration supported with permission roles?",
      a: "Absolutely. Our platform supports role-based access control (RBAC), allowing admin, editor, and viewer roles across your team."
    }
  ];

  return (
    <div className="landing-page">

      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-bg-glow"></div>
        <div className="hero-grid-pattern"></div>
        <div className="container position-relative z-2">
          <div className="row align-items-center g-5 min-vh-75">
            <div className="col-lg-6 text-start">
              <h1 className="hero-title">
                Stop Guessing,<br />
                Start <span className="hero-gradient-text">Growing.</span>
              </h1>
              <p className="hero-description">
                Optimize, track, and scale your affiliate marketing campaigns effortlessly with our all-in-one link management platform. Built for performance and clarity.
              </p>
              <div className="hero-actions">
                <Link to="/register" className="hero-cta-btn">
                  Get Started Free
                </Link>
              </div>
            </div>
            
            <div className="col-lg-6">
              <div className="hero-mockup-wrapper">
                {/* Floating Active Links Badge */}
                <div className="floating-stat-badge">
                  <div className="badge-icon">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#667eea" strokeWidth="2.5">
                      <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path>
                      <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path>
                    </svg>
                  </div>
                  <div>
                    <div className="badge-value">1,245</div>
                    <div className="badge-label">Active Links</div>
                  </div>
                </div>

                {/* Dashboard Tablet Mockup */}
                <div className="mockup-frame">
                  <div className="mockup-header">
                    <div className="mockup-logo">
                      <span className="mockup-dot">A</span>
                    </div>
                    <div className="mockup-title">Dashboard</div>
                  </div>
                  <div className="mockup-body">
                    <div className="mockup-sub-header">
                      <span>Mini Analytics</span>
                    </div>
                    
                    {/* SVG Graphic Bar Chart */}
                    <div className="mockup-chart-container">
                      <svg width="100%" height="150" viewBox="0 0 320 150" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <line x1="0" y1="30" x2="320" y2="30" stroke="#F1F5F9" strokeWidth="1"/>
                        <line x1="0" y1="70" x2="320" y2="70" stroke="#F1F5F9" strokeWidth="1"/>
                        <line x1="0" y1="110" x2="320" y2="110" stroke="#F1F5F9" strokeWidth="1"/>
                        
                        <rect x="25" y="80" width="8" height="45" rx="3" fill="#60A5FA"/>
                        <rect x="37" y="60" width="8" height="65" rx="3" fill="#2DD4BF"/>
                        
                        <rect x="70" y="45" width="8" height="80" rx="3" fill="#60A5FA"/>
                        <rect x="82" y="75" width="8" height="50" rx="3" fill="#F43F5E"/>
                        
                        <rect x="115" y="65" width="8" height="60" rx="3" fill="#38BDF8"/>
                        <rect x="127" y="40" width="8" height="85" rx="3" fill="#A855F7"/>
                        
                        <rect x="160" y="70" width="8" height="55" rx="3" fill="#34D399"/>
                        <rect x="172" y="50" width="8" height="75" rx="3" fill="#F59E0B"/>
                        
                        <rect x="205" y="35" width="8" height="90" rx="3" fill="#60A5FA"/>
                        <rect x="217" y="55" width="8" height="70" rx="3" fill="#EC4899"/>
                        
                        <rect x="250" y="40" width="8" height="85" rx="3" fill="#38BDF8"/>
                        <rect x="262" y="60" width="8" height="65" rx="3" fill="#A855F7"/>

                        <text x="31" y="140" fill="#94A3B8" fontSize="9" textAnchor="middle">Mon</text>
                        <text x="76" y="140" fill="#94A3B8" fontSize="9" textAnchor="middle">Tue</text>
                        <text x="121" y="140" fill="#94A3B8" fontSize="9" textAnchor="middle">Wed</text>
                        <text x="166" y="140" fill="#94A3B8" fontSize="9" textAnchor="middle">Thu</text>
                        <text x="211" y="140" fill="#94A3B8" fontSize="9" textAnchor="middle">Fri</text>
                        <text x="256" y="140" fill="#94A3B8" fontSize="9" textAnchor="middle">Sat</text>
                      </svg>
                    </div>
                    <div className="chart-legend">
                      <span><span className="legend-dot cyan"></span> Performance</span>
                      <span><span className="legend-dot orange"></span> Performance</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Feature Cards Grid */}
          <div className="row g-4 mt-5 hero-feature-cards">
            <div className="col-md-6 col-lg-3">
              <div className="feature-card">
                <div className="feature-icon-circle blue">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#667eea" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path>
                    <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path>
                  </svg>
                </div>
                <div className="feature-label">URL Shortening</div>
                <h3 className="feature-title">Brandable Short Links</h3>
                <p>Create custom, trusted links that boost CTR and brand recognition.</p>
              </div>
            </div>

            <div className="col-md-6 col-lg-3">
              <div className="feature-card">
                <div className="feature-icon-circle purple">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#8B5CF6" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="18" y1="20" x2="18" y2="10"></line>
                    <line x1="12" y1="20" x2="12" y2="4"></line>
                    <line x1="6" y1="20" x2="6" y2="14"></line>
                  </svg>
                </div>
                <div className="feature-label">Click Tracking</div>
                <h3 className="feature-title">Real-Time Analytics</h3>
                <p>Track every click, source, and conversion with granular data in real-time.</p>
              </div>
            </div>

            <div className="col-md-6 col-lg-3">
              <div className="feature-card">
                <div className="feature-icon-circle purple">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#8B5CF6" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"></path>
                    <line x1="7" y1="7" x2="7.01" y2="7"></line>
                  </svg>
                </div>
                <div className="feature-label">Campaign Management</div>
                <h3 className="feature-title">Organize Your Campaigns</h3>
                <p>Group links by campaign, source, or medium for effortlessly organized marketing efforts.</p>
              </div>
            </div>

            <div className="col-md-6 col-lg-3">
              <div className="feature-card">
                <div className="feature-icon-circle blue">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#667eea" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                    <circle cx="9" cy="7" r="4"></circle>
                    <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                    <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                  </svg>
                </div>
                <div className="feature-label">Team Access</div>
                <h3 className="feature-title">Collaborative Workflows</h3>
                <p>Grant secure access to your team and manage user permissions easily.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* #features Deep Dive Section */}
      <section id="features" className="section-padding">
        <div className="container">
          <div className="text-center mb-5">
            <span className="section-badge">Platform Capabilities</span>
            <h2 className="section-main-heading">Everything You Need to Scale</h2>
            <p className="section-sub-text">Built from the ground up for performance, precision, and ease of use.</p>
          </div>

          <div className="row g-4">
            <div className="col-md-4">
              <div className="feature-detail-card">
                <div className="detail-icon">⚡</div>
                <h4>Instant Redirects</h4>
                <p>Sub-10ms global edge redirects keep your visitors engaged and conversions high.</p>
              </div>
            </div>
            <div className="col-md-4">
              <div className="feature-detail-card">
                <div className="detail-icon">🔒</div>
                <h4>Fraud Detection</h4>
                <p>Automatically filter out bot traffic and fraudulent clicks to protect your conversion data.</p>
              </div>
            </div>
            <div className="col-md-4">
              <div className="feature-detail-card">
                <div className="detail-icon">📈</div>
                <h4>Granular Insights</h4>
                <p>View detailed breakdowns by country, device, browser, referrer, and campaign tags.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* #pricing Section */}
      <section id="pricing" className="section-padding dark-section-bg">
        <div className="container">
          <div className="text-center mb-5">
            <span className="section-badge">Pricing Plans</span>
            <h2 className="section-main-heading">Simple, Transparent Pricing</h2>
            <p className="section-sub-text">Choose the plan that fits your growth. Upgrade or downgrade anytime.</p>
          </div>

          <div className="row g-4 align-items-center justify-content-center">
            {/* Starter Plan */}
            <div className="col-lg-4 col-md-6">
              <div className="pricing-card">
                <div className="pricing-header">
                  <h3 className="plan-title">Starter</h3>
                  <p className="plan-desc">For creators & individual affiliate marketers.</p>
                  <div className="plan-price">$0 <span className="period">/ month</span></div>
                </div>
                <ul className="plan-features">
                  <li>✔ Up to 100 Short Links</li>
                  <li>✔ 10 Monthly Credits</li>
                  <li>✔ Basic Click Tracking</li>
                  <li>✔ Standard Support</li>
                </ul>
                <Link to="/register" className="btn pricing-btn outline">Get Started Free</Link>
              </div>
            </div>

            {/* Pro Plan */}
            <div className="col-lg-4 col-md-6">
              <div className="pricing-card featured">
                <div className="popular-tag">Most Popular</div>
                <div className="pricing-header">
                  <h3 className="plan-title">Pro Marketer</h3>
                  <p className="plan-desc">For serious marketers looking to scale revenue.</p>
                  <div className="plan-price">$19 <span className="period">/ month</span></div>
                </div>
                <ul className="plan-features">
                  <li>✔ Unlimited Short Links</li>
                  <li>✔ 1,000 Monthly Credits</li>
                  <li>✔ Real-Time Analytics & Geo Data</li>
                  <li>✔ Custom Slugs & Branding</li>
                  <li>✔ Priority Email Support</li>
                </ul>
                <Link to="/register" className="btn pricing-btn gradient">Start Free Trial</Link>
              </div>
            </div>

            {/* Enterprise Plan */}
            <div className="col-lg-4 col-md-6">
              <div className="pricing-card">
                <div className="pricing-header">
                  <h3 className="plan-title">Enterprise</h3>
                  <p className="plan-desc">For agencies, networks, and large teams.</p>
                  <div className="plan-price">$49 <span className="period">/ month</span></div>
                </div>
                <ul className="plan-features">
                  <li>✔ Unlimited Links & Clicks</li>
                  <li>✔ Dedicated Account Manager</li>
                  <li>✔ Custom Domain Integration</li>
                  <li>✔ Role-Based Team Permissions</li>
                  <li>✔ 99.9% Uptime SLA Guarantee</li>
                </ul>
                <a href="#enterprise" className="btn pricing-btn outline">Explore Enterprise</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* #resources FAQ Section */}
      <section id="resources" className="section-padding">
        <div className="container">
          <div className="text-center mb-5">
            <span className="section-badge">Help & FAQ</span>
            <h2 className="section-main-heading">Resources & FAQ</h2>
            <p className="section-sub-text">Everything you need to know about getting started with Affiliate++.</p>
          </div>

          <div className="row justify-content-center">
            <div className="col-lg-8">
              <div className="faq-accordion">
                {faqs.map((faq, index) => (
                  <div key={index} className={`faq-item ${activeFaq === index ? 'active' : ''}`} onClick={() => toggleFaq(index)}>
                    <div className="faq-question">
                      <h5>{faq.q}</h5>
                      <span className="faq-toggle-icon">{activeFaq === index ? '−' : '+'}</span>
                    </div>
                    {activeFaq === index && (
                      <div className="faq-answer">
                        <p>{faq.a}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* #enterprise Section */}
      <section id="enterprise" className="section-padding dark-section-bg border-top-glass">
        <div className="container text-center">
          <div className="enterprise-banner">
            <span className="section-badge">Enterprise Ready</span>
            <h2 className="enterprise-title">Scalable Infrastructure for Large Affiliate Networks</h2>
            <p className="enterprise-text">
              Handling millions of link clicks per day? Our enterprise infrastructure provides dedicated server capacity, custom domain routing, and SOC-2 compliance.
            </p>
            <Link to="/register" className="hero-cta-btn mt-3">
              Request Enterprise Demo
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}

export default Home;