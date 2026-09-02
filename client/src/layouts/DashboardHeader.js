import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Can from "../rbac/Can";

function DashboardHeader() {
    const userDetails = useSelector((state) => state.userDetails);

    return (
        <nav className="navbar navbar-expand-lg dash-navbar">
            <div className="container">
                <Link className="navbar-brand dash-brand" to="/">
                    Affiliate++
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
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                    </ul>
                    <ul className="navbar-nav ms-auto mb-2 mb-lg-0 align-items-center gap-3">
                        <li className="nav-item">
                            <div className="credit-pill">
                                <span className="gold-coin">🪙</span>
                                <span className="credit-text">{userDetails?.credits ?? 10} Credits</span>
                            </div>
                        </li>
                        <li className="nav-item dropdown">
                            <a
                                className="nav-link dropdown-toggle dash-user-dropdown"
                                href="#!"
                                role="button"
                                data-bs-toggle="dropdown"
                                aria-expanded="false"
                            >
                                <span className="user-avatar-img">
                                    {userDetails?.avatar ? (
                                        <img src={userDetails.avatar} alt="avatar" />
                                    ) : (
                                        <span className="avatar-fallback">
                                            {userDetails?.name ? userDetails.name.charAt(0).toUpperCase() : 'U'}
                                        </span>
                                    )}
                                </span>
                            </a>
                            <ul className="dropdown-menu dropdown-menu-end dash-dropdown-menu">
                                <li className="dropdown-header">
                                    <strong>{userDetails?.name || 'User'}</strong>
                                    <div className="text-muted small">{userDetails?.email || ''}</div>
                                </li>
                                <li><hr className="dropdown-divider" /></li>
                                <li>
                                    <Link className="dropdown-item" to="/manage-payments">
                                        💳 Manage Payments
                                    </Link>
                                </li>
                                <Can permission='canViewUser'>
                                    <li>
                                        <Link className="dropdown-item" to="/users">
                                            👥 Manage Users
                                        </Link>
                                    </li>
                                </Can>
                                <li><hr className="dropdown-divider" /></li>
                                <li>
                                    <Link className="dropdown-item" to="/logout">
                                        🚪 Logout
                                    </Link>
                                </li>
                            </ul>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
}

export default DashboardHeader;