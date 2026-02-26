import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from './AuthContext';
import './index.css';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { login } = useAuth();
    const navigate = useNavigate();

    const validateEmail = (email) => {
        const re = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
        return re.test(String(email).toLowerCase());
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if (!validateEmail(email)) {
            setError('Please enter a valid Gmail address (e.g., user@gmail.com)');
            return;
        }

        const result = await login(email, password);
        if (result.success) {
            if (result.role === 'admin') {
                navigate('/admin-dashboard');
            } else {
                navigate('/dashboard');
            }
        } else {
            setError(result.message);
        }
    };

    return (
        <div className="login-container">
            <div className="login-box">
                <div className="logo-section">
                    <h1 className="brand-logo">Health & Wellness</h1>
                    <h2>Welcome Back</h2>
                    <p>Login to your account</p>
                </div>

                <form onSubmit={handleSubmit} className="login-form">
                    {error && <div className="error-message" style={{ color: 'red', marginBottom: '10px' }}>{error}</div>}
                    <div className="input-group">
                        <input
                            type="text"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder=" "
                        />
                        <label>Email (Gmail only)</label>
                    </div>

                    <div className="input-group">
                        <input
                            type="password"
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder=" "
                        />
                        <label>Password</label>
                    </div>

                    <div className="actions">
                        <Link to="/forgot-password" className="forgot-email">
                            Forgot password?
                        </Link>
                    </div>

                    <div className="footer-actions">
                        <Link to="/register" className="create-account">
                            Create account
                        </Link>

                        <button type="submit" className="next-btn">
                            Next
                        </button>
                    </div>

                </form>
            </div>
        </div>
    );
}

export default Login;
