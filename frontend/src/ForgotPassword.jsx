import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from './AuthContext';
import './index.css';

function ForgotPassword() {
    const [step, setStep] = useState(1); // 1: Email, 2: New Password
    const [email, setEmail] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [error, setError] = useState('');
    const [message, setMessage] = useState('');
    const { checkEmail, resetPassword } = useAuth();
    const navigate = useNavigate();

    const validateEmail = (email) => {
        const re = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
        return re.test(String(email).toLowerCase());
    };

    const handleEmailSubmit = (e) => {
        e.preventDefault();
        setError('');
        setMessage('');

        if (!validateEmail(email)) {
            setError('Please enter a valid Gmail address (e.g., user@gmail.com)');
            return;
        }

        if (checkEmail(email)) {
            setStep(2);
            setMessage('Email verified. Please enter a new password.');
        } else {
            setError('Email not found. Please register.');
        }
    };

    const handlePasswordSubmit = (e) => {
        e.preventDefault();
        setError('');
        setMessage('');

        if (newPassword.length < 6) {
            setError('Password must be at least 6 characters');
            return;
        }

        const result = resetPassword(email, newPassword);
        if (result.success) {
            setMessage('Password reset successfully. Redirecting to login...');
            setTimeout(() => {
                navigate('/login');
            }, 2000);
        } else {
            setError(result.message);
        }
    };

    return (
        <div className="login-container">
            <div className="login-box">
                <div className="logo-section">
                    <h1 className="brand-logo">Health & Wellness</h1>
                    <h2>Account Recovery</h2>
                    <p>{step === 1 ? 'Find your email' : 'Reset Password'}</p>
                </div>

                {step === 1 ? (
                    <form onSubmit={handleEmailSubmit} className="login-form">
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
                        <div className="footer-actions">
                            <Link to="/login" className="create-account">
                                Back to Login
                            </Link>
                            <button type="submit" className="next-btn">
                                Next
                            </button>
                        </div>
                    </form>
                ) : (
                    <form onSubmit={handlePasswordSubmit} className="login-form">
                        {message && <div style={{ color: 'green', marginBottom: '10px' }}>{message}</div>}
                        {error && <div className="error-message" style={{ color: 'red', marginBottom: '10px' }}>{error}</div>}
                        <div className="input-group">
                            <input
                                type="password"
                                required
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                                placeholder=" "
                            />
                            <label>New Password</label>
                        </div>
                        <div className="footer-actions">
                            <button type="button" onClick={() => setStep(1)} className="create-account" style={{ border: 'none', background: 'none', cursor: 'pointer' }}>
                                Back
                            </button>
                            <button type="submit" className="next-btn">
                                Reset Password
                            </button>
                        </div>
                    </form>
                )}
            </div>
        </div>
    );
}

export default ForgotPassword;
