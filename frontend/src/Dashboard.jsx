import { useAuth } from './AuthContext';
import { useNavigate } from 'react-router-dom';
import './index.css';

const categories = [
    {
        icon: '💧',
        title: 'Hydration',
        description: 'Drinking enough water boosts energy, improves skin and aids digestion.',
        route: '/hydration',
    },
    {
        icon: '🥗',
        title: 'Healthy Food',
        description: 'Nutritious meals strengthen immunity and maintain body balance.',
        route: '/healthy-food',
    },
    {
        icon: '🌬️',
        title: 'Breathing',
        description: 'Deep breathing reduces stress and improves oxygen flow.',
        route: '/breathing',
    },
    {
        icon: '🧘',
        title: 'Yoga',
        description: 'Yoga improves flexibility, posture and mental peace.',
        route: '/yoga',
    },
    {
        icon: '🚶',
        title: 'Walking',
        description: 'Daily walking keeps your heart healthy and active.',
        route: '/walking',
    },
];

function Dashboard() {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    return (
        <div style={styles.page}>
            {/* Header */}
            <header style={styles.header}>
                <h1 style={styles.brand}>Health and Fitness</h1>
                <button onClick={logout} style={styles.logoutBtn}>Logout</button>
            </header>

            {/* Main */}
            <main style={styles.main}>
                <h2 style={styles.welcome}>Welcome, {user?.name || 'User'} 🔥</h2>

                <div style={styles.cards}>
                    {categories.map((cat) => (
                        <div key={cat.title} style={styles.card}>
                            <div style={styles.cardIcon}>{cat.icon}</div>
                            <h3 style={styles.cardTitle}>{cat.title}</h3>
                            <p style={styles.cardDesc}>{cat.description}</p>
                            <button style={styles.joinBtn} onClick={() => navigate(cat.route)}>Join Now</button>
                        </div>
                    ))}
                </div>
            </main>

            {/* Bottom badge */}
            <div style={styles.badge}>
                <span style={styles.badgeSmall}>getting</span>
                <span style={styles.badgeBig}>HEALTHIER</span>
                <span style={styles.badgeSmall}>everyday</span>
            </div>

            {/* Decorative leaves */}
            <div style={styles.leafTopLeft}>🌿</div>
            <div style={styles.leafBottomRight}>🌿</div>
        </div>
    );
}

const styles = {
    page: {
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #a8d5c2 0%, #c8e6d8 40%, #b2dfd0 100%)',
        fontFamily: "'Segoe UI', sans-serif",
        position: 'relative',
        overflow: 'hidden',
    },
    header: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '16px 32px',
        background: 'rgba(255,255,255,0.3)',
        backdropFilter: 'blur(6px)',
    },
    brand: {
        color: '#1a6b50',
        fontSize: '22px',
        fontWeight: '700',
        margin: 0,
    },
    logoutBtn: {
        background: '#e53935',
        color: '#fff',
        border: 'none',
        borderRadius: '8px',
        padding: '10px 22px',
        fontWeight: '700',
        fontSize: '14px',
        cursor: 'pointer',
        boxShadow: '0 2px 8px rgba(229,57,53,0.4)',
    },
    main: {
        padding: '40px 32px 80px',
    },
    welcome: {
        textAlign: 'center',
        fontSize: '26px',
        fontWeight: '600',
        color: '#1a3a2e',
        marginBottom: '36px',
    },
    cards: {
        display: 'flex',
        gap: '20px',
        justifyContent: 'center',
        flexWrap: 'wrap',
    },
    card: {
        background: '#fff',
        borderRadius: '16px',
        padding: '28px 20px',
        width: '170px',
        boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
        gap: '10px',
        transition: 'transform 0.2s',
    },
    cardIcon: {
        fontSize: '36px',
    },
    cardTitle: {
        color: '#1a6b50',
        fontSize: '16px',
        fontWeight: '700',
        margin: 0,
    },
    cardDesc: {
        color: '#555',
        fontSize: '13px',
        lineHeight: '1.5',
        margin: 0,
        flex: 1,
    },
    joinBtn: {
        background: '#2e7d5e',
        color: '#fff',
        border: 'none',
        borderRadius: '8px',
        padding: '8px 20px',
        fontWeight: '600',
        fontSize: '13px',
        cursor: 'pointer',
        marginTop: '4px',
        boxShadow: '0 2px 6px rgba(46,125,94,0.35)',
    },
    badge: {
        position: 'absolute',
        bottom: '28px',
        left: '32px',
        border: '3px solid #1a6b50',
        borderRadius: '50%',
        width: '110px',
        height: '110px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'rgba(255,255,255,0.5)',
    },
    badgeSmall: {
        color: '#1a6b50',
        fontSize: '11px',
        fontStyle: 'italic',
    },
    badgeBig: {
        color: '#1a3a2e',
        fontSize: '14px',
        fontWeight: '900',
        letterSpacing: '1px',
    },
    leafTopLeft: {
        position: 'fixed',
        top: '60px',
        left: '-10px',
        fontSize: '80px',
        opacity: 0.3,
        transform: 'rotate(30deg)',
        pointerEvents: 'none',
    },
    leafBottomRight: {
        position: 'fixed',
        bottom: '20px',
        right: '-10px',
        fontSize: '80px',
        opacity: 0.3,
        transform: 'rotate(-30deg) scaleX(-1)',
        pointerEvents: 'none',
    },
};

export default Dashboard;
