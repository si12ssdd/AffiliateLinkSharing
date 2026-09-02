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
                    <ul className="navbar-nav ms-auto mb-2 mb-lg-0 align-items-center">
                        <li className="nav-item me-3">
                            <span className="credit-badge">
                                <span className="credit-icon">🪙</span>
                                <span className="credit-count">{userDetails?.credits ?? 0} Credits</span>
                            </span>
                        </li>
                        <li className="nav-item dropdown">
                            <a
                                className="nav-link dropdown-toggle dash-user-dropdown"
                                href="#!"
                                role="button"
                                data-bs-toggle="dropdown"
                                aria-expanded="false"
                            >
                                <span className="user-avatar">
                                    {userDetails?.name ? userDetails.name.charAt(0).toUpperCase() : 'U'}
                                </span>
                                <span className="user-name">
                                    {userDetails ? userDetails.name : 'Account'}
                                </span>
                            </a>
                            <ul className="dropdown-menu dropdown-menu-end dash-dropdown-menu">
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