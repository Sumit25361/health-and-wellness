import { Link, useLocation } from 'react-router-dom';
import { useAuth } from './AuthContext';

function NavBar() {
    const { user, logout } = useAuth();
    const location = useLocation();

    const navItems = [
        { name: 'Dashboard', path: '/dashboard', icon: '🏠' },
        { name: 'Hydration', path: '/hydration', icon: '💧' },
        { name: 'Healthy Food', path: '/healthy-food', icon: '🥗' },
        { name: 'Breathing', path: '/breathing', icon: '🌬️' },
        { name: 'Yoga', path: '/yoga', icon: '🧘' },
        { name: 'Walking', path: '/walking', icon: '🚶' },
    ];

    if (!user) return null;

    return (
        <nav style={styles.navbar}>
            <div style={styles.brandContainer}>
                <span style={styles.brandIcon}>🌿</span>
                <span style={styles.brandText}>Health Hub</span>
            </div>

            <div style={styles.linksContainer}>
                {navItems.map((item) => {
                    const isActive = location.pathname === item.path;
                    return (
                        <Link
                            key={item.name}
                            to={item.path}
                            style={{
                                ...styles.link,
                                ...(isActive ? styles.activeLink : {})
                            }}
                        >
                            <span style={styles.linkIcon}>{item.icon}</span>
                            <span style={styles.linkText}>{item.name}</span>
                        </Link>
                    );
                })}
            </div>

            <div style={styles.userContainer}>
                <div style={styles.userInfo}>
                    <span style={styles.userName}>{user?.name || 'User'}</span>
                    <span style={styles.userRole}>{user?.role === 'admin' ? 'Admin' : 'Member'}</span>
                </div>
                <button onClick={logout} style={styles.logoutBtn}>Logout</button>
            </div>
        </nav>
    );
}

const styles = {
    navbar: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '12px 24px',
        background: '#ffffff',
        boxShadow: '0 2px 10px rgba(0,0,0,0.06)',
        position: 'sticky',
        top: 0,
        zIndex: 1000,
        gap: '20px',
        overflowX: 'auto',
    },
    brandContainer: {
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        minWidth: 'fit-content'
    },
    brandIcon: {
        fontSize: '24px',
    },
    brandText: {
        color: '#1a6b50',
        fontSize: '20px',
        fontWeight: '800',
        letterSpacing: '0.5px',
    },
    linksContainer: {
        display: 'flex',
        gap: '8px',
        flex: 1,
        justifyContent: 'center',
        minWidth: 'max-content'
    },
    link: {
        display: 'flex',
        alignItems: 'center',
        gap: '6px',
        textDecoration: 'none',
        color: '#555',
        padding: '8px 16px',
        borderRadius: '20px',
        fontSize: '14px',
        fontWeight: '600',
        transition: 'all 0.2s',
        background: 'transparent',
    },
    activeLink: {
        background: '#e8f5e9',
        color: '#2e7d5e',
    },
    linkIcon: {
        fontSize: '16px',
    },
    linkText: {
        whiteSpace: 'nowrap',
    },
    userContainer: {
        display: 'flex',
        alignItems: 'center',
        gap: '16px',
        minWidth: 'fit-content'
    },
    userInfo: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-end',
    },
    userName: {
        fontSize: '14px',
        fontWeight: '700',
        color: '#333',
    },
    userRole: {
        fontSize: '11px',
        color: '#888',
        textTransform: 'uppercase',
        letterSpacing: '0.5px',
    },
    logoutBtn: {
        background: '#fee2e2',
        color: '#ef4444',
        border: 'none',
        borderRadius: '8px',
        padding: '8px 16px',
        fontWeight: '700',
        fontSize: '13px',
        cursor: 'pointer',
        transition: 'background 0.2s',
    },
};

export default NavBar;
