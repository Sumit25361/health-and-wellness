import { useAuth } from './AuthContext';
import './index.css';

function Dashboard() {
    const { user, logout } = useAuth();

    return (
        <div className="login-container">
            <div className="login-box">
                <div className="logo-section">
                    <h1 className="brand-logo">Health & Wellness</h1>
                    <h2>Welcome, {user?.name || 'User'}!</h2>
                    <p>You have successfully logged in.</p>
                </div>

                <div className="footer-actions" style={{ marginTop: '20px' }}>
                    <button onClick={logout} className="next-btn">
                        Logout
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Dashboard;
