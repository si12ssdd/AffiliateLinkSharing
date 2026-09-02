import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { serverEndpoint } from "../../config/config";
import './Login.css';

function ForgetPassword() {
    const [email, setEmail] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setSuccess("");
        setLoading(true);
        try {
            await axios.post(`${serverEndpoint}/auth/send-reset-password-token`, { email });
            setSuccess("If the email exists, a reset code has been sent.");
            setTimeout(() => navigate("/reset-password", { state: { email } }), 1500);
        } catch (err) {
            setSuccess("If the email exists, a reset code has been sent.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="auth-card-container">
            <div className="auth-card">
                <h2 className="text-center">Forgot Password</h2>
                {error && <div className="alert alert-danger">{error}</div>}
                {success && <div className="alert alert-success">{success}</div>}
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">Email Address</label>
                        <input
                            type="email"
                            className="form-control"
                            id="email"
                            placeholder="Enter your registered email"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className="d-grid">
                        <button type="submit" className="btn btn-primary" disabled={loading}>
                            {loading ? "Sending..." : "Send Reset Code"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default ForgetPassword;