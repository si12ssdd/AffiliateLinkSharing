import { Link } from "react-router-dom";

function NotFound() {
    return (
        <div className="container text-center py-5">
            <h1 className="display-4">404 - Something Went Wrong</h1>
            <p className="lead text-muted">The page you are looking for does not exist or an unexpected error occurred.</p>
            <Link to="/" className="btn btn-primary mt-3">Go to Dashboard / Home</Link>
        </div>
    );
}

export default NotFound;