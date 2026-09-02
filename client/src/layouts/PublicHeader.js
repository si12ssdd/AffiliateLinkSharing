import { Link } from "react-router-dom";

function PublicHeader() {
    return (
        <nav className="navbar navbar-expand-lg public-navbar fixed-top">
            <div className="container">
                <Link className="navbar-brand brand-logo" to="/">
                    <span className="brand-icon">
                        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path>
                            <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path>
                        </svg>
                    </span>
                    <span className="brand-text">Affiliate++</span>
                </Link>
                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarSupportedContent"
                    aria-controls="navbarSupportedContent"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon" />
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav mx-auto mb-2 mb-lg-0 align-items-center gap-lg-3">
                        <li className="nav-item">
                            <a className="nav-link" href="#features">Features</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#pricing">Pricing</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#resources">Resources</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#enterprise">Enterprise</a>
                        </li>
                    </ul>
                    <div className="d-flex align-items-center gap-3">
                        <Link className="nav-link nav-login-link" to="/login">
                            Login
                        </Link>
                        <Link className="btn nav-cta-outline-btn" to="/register">
                            Get Started Free
                        </Link>
                    </div>
                </div>
            </div>
        </nav>
    );
}

export default PublicHeader;

