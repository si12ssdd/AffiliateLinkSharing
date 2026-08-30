import { Link } from "react-router-dom";

function Unauthorized() {
    return (
        <div className="container text-center py-5">
            <h2 className="text-danger mb-3">Unauthorized Access</h2>
            <p className="lead text-muted">
                You do not have enough permissions to perform this action.
                Please contact your admin for more details.
            </p>
            <Link to="/" className="btn btn-outline-secondary mt-3">Back to Dashboard</Link>
        </div>
    );
}

export default Unauthorized;