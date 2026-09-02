import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

function Home() {
  return (
    <div className="landing-page">

      {/* Hero Section */}
      <section className="hero-section">
        <div className="container">
          <h1>
            Stop Guessing,<br />
            Start <span className="hero-gradient-text">Growing.</span>
          </h1>
          <p className="lead">
            The ultimate platform to shorten, manage, and analyze your affiliate links. Turn your content into a revenue machine.
          </p>
          <Link to="/register" className="hero-cta-btn">
            Get Started Free
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <div className="container">
          <div className="text-center">
            <h2 className="section-title">Why You'll Love Affiliate++</h2>
            <p className="section-subtitle">Everything you need to manage, track, and grow your affiliate business.</p>
          </div>
          <div className="row g-4">
            <div className="col-md-6 col-lg-3">
              <div className="feature-card">
                <div className="feature-icon-wrapper">🔗</div>
                <h3 className="feature-title">URL Shortening</h3>
                <p>Create clean, short links that are easy to share on any platform.</p>
              </div>
            </div>
            <div className="col-md-6 col-lg-3">
              <div className="feature-card">
                <div className="feature-icon-wrapper">📊</div>
                <h3 className="feature-title">Click Tracking</h3>
                <p>Track every click and conversion to understand what content performs best.</p>
              </div>
            </div>
            <div className="col-md-6 col-lg-3">
              <div className="feature-card">
                <div className="feature-icon-wrapper">🏷️</div>
                <h3 className="feature-title">Campaign Management</h3>
                <p>Organize links by campaign to measure performance and optimize your strategy.</p>
              </div>
            </div>
            <div className="col-md-6 col-lg-3">
              <div className="feature-card">
                <div className="feature-icon-wrapper">👥</div>
                <h3 className="feature-title">Team Collaboration</h3>
                <p>Use role-based access to work with your team efficiently and securely.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="how-it-works-section">
        <div className="container">
          <div className="text-center">
            <h2 className="section-title">Get Started in 3 Simple Steps</h2>
            <p className="section-subtitle">From sign-up to earning — it only takes minutes.</p>
          </div>
          <div className="row g-4">
            <div className="col-md-4">
              <div className="step-card">
                <div className="step-number">1</div>
                <h4>Create & Shorten</h4>
                <p>Paste your long affiliate link and get a short, trackable link in seconds.</p>
              </div>
            </div>
            <div className="col-md-4">
              <div className="step-card">
                <div className="step-number">2</div>
                <h4>Share & Promote</h4>
                <p>Share your new link across your blog, social media, or ad campaigns.</p>
              </div>
            </div>
            <div className="col-md-4">
              <div className="step-card">
                <div className="step-number">3</div>
                <h4>Track & Earn</h4>
                <p>Analyze your link performance and watch your earnings grow with every conversion.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="cta-section">
        <div className="container">
          <h2>Ready to Monetize Your Content?</h2>
          <p className="lead">Join hundreds of content creators, marketers, and businesses who trust Affiliate++ to manage their links.</p>
          <Link to="/register" className="hero-cta-btn">
            Start Your Free Trial Today
          </Link>
        </div>
      </section>

    </div>
  );
}

export default Home;