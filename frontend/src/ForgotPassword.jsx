import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from './AuthContext';
import './index.css';

function ForgotPassword() {
    const [step, setStep] = useState(1); // 1: Email, 2: OTP, 3: New Password
    const [email, setEmail] = useState('');
    const [otp, setOtp] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const { checkEmail, resetPassword } = useAuth();
    const navigate = useNavigate();

    const validateEmail = (email) => {
        const re = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
        return re.test(String(email).toLowerCase());
    };

    const handleEmailSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setMessage('');

        if (!validateEmail(email)) {
            setError('Please enter a valid Gmail address (e.g., user@gmail.com)');
            return;
        }

        // Check if user exists in local storage first
        if (!checkEmail(email)) {
            setError('Email not found. Please register.');
            return;
        }

        setLoading(true);
        try {
            const response = await fetch('http://localhost:5000/api/send-otp', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email })
            });
            const data = await response.json();

            if (data.success) {
                setStep(2);
                setMessage('OTP sent to your email. Please check your inbox.');
            } else {
                setError(data.message || 'Failed to send OTP');
            }
        } catch (err) {
            setError('Server error. Ensure backend is running.');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleOtpSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setMessage('');
        setLoading(true);

        try {
            const response = await fetch('http://localhost:5000/api/verify-otp', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, otp })
            });
            const data = await response.json();

            if (data.success) {
                setStep(3);
                setMessage('OTP Verified. Please set a new password.');
            } else {
                setError(data.message || 'Invalid OTP');
            }
        } catch (err) {
            setError('Verification failed. Try again.');
        } finally {
            setLoading(false);
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

        if (newPassword !== confirmPassword) {
            setError('Passwords do not match');
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
                    <p>{step === 1 ? 'Find your email' : step === 2 ? 'Enter OTP' : 'Reset Password'}</p>
                </div>

                {step === 1 && (
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
                            <Link to="/login" className="create-account">Back to Login</Link>
                            <button type="submit" className="next-btn" disabled={loading}>
                                {loading ? 'Sending...' : 'Next'}
                            </button>
                        </div>
                    </form>
                )}

                {step === 2 && (
                    <form onSubmit={handleOtpSubmit} className="login-form">
                        {message && <div style={{ color: 'green', marginBottom: '10px' }}>{message}</div>}
                        {error && <div className="error-message" style={{ color: 'red', marginBottom: '10px' }}>{error}</div>}
                        <div className="input-group">
                            <input
                                type="text"
                                required
                                value={otp}
                                onChange={(e) => setOtp(e.target.value)}
                                placeholder=" "
                                maxLength="6"
                            />
                            <label>Enter 6-digit OTP</label>
                        </div>
                        <div className="footer-actions">
                            <button type="button" onClick={() => setStep(1)} className="create-account" style={{ border: 'none', background: 'none', cursor: 'pointer' }}>
                                Back
                            </button>
                            <button type="submit" className="next-btn" disabled={loading}>
                                {loading ? 'Verifying...' : 'Verify OTP'}
                            </button>
                        </div>
                    </form>
                )}

                {step === 3 && (
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
                        <div className="input-group">
                            <input
                                type="password"
                                required
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                placeholder=" "
                            />
                            <label>Confirm Password</label>
                        </div>
                        <div className="footer-actions">
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
