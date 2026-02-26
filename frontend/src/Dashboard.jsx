import { useAuth } from './AuthContext';
import { useNavigate } from 'react-router-dom';
import './index.css';

function Dashboard() {
    const { user } = useAuth();
    const navigate = useNavigate();

    const patientStats = [
        { title: 'Hydration', value: '1.5', goal: '2.5 L', icon: '💧', color: '#0284c7', route: '/hydration' },
        { title: 'Walking', value: '6,500', goal: '10,000 steps', icon: '🚶', color: '#16a34a', route: '/walking' },
        { title: 'Yoga', value: '30', goal: '45 mins', icon: '🧘', color: '#9333ea', route: '/yoga' },
        { title: 'Breathing', value: '2', goal: '3 sessions', icon: '🌬️', color: '#0ea5e9', route: '/breathing' },
        { title: 'Healthy Food', value: '1,400', goal: '2,000 kcal', icon: '🥗', color: '#ea580c', route: '/healthy-food' },
    ];

    return (
        <div style={styles.page}>
            {/* Main */}
            <main style={styles.main}>
                <h2 style={styles.welcome}>Welcome back, {user?.name || 'User'}! 👋</h2>
                <p style={styles.subtitle}>Here is your daily health overview.</p>

                <div style={styles.statsGrid}>
                    {patientStats.map((stat) => (
                        <div key={stat.title} style={styles.statCard} onClick={() => navigate(stat.route)} role="button" tabIndex={0}>
                            <div style={{ ...styles.iconBox, color: stat.color, background: `${stat.color}15` }}>
                                {stat.icon}
                            </div>
                            <div style={styles.statInfo}>
                                <h3 style={styles.statTitle}>{stat.title}</h3>
                                <p style={styles.statValue}>
                                    <span style={styles.currentValue}>{stat.value}</span>
                                    <span style={styles.goalValue}> / {stat.goal}</span>
                                </p>
                            </div>
                            <div style={styles.arrow}>➔</div>
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
        minHeight: 'calc(100vh - 65px)', // subtract navbar height roughly
        background: 'linear-gradient(135deg, #a8d5c2 0%, #c8e6d8 40%, #b2dfd0 100%)',
        fontFamily: "'Segoe UI', sans-serif",
        position: 'relative',
        overflow: 'hidden',
    },
    main: {
        padding: '40px 32px 100px',
        maxWidth: '900px',
        margin: '0 auto',
        position: 'relative',
        zIndex: 2,
    },
    welcome: {
        textAlign: 'center',
        fontSize: '28px',
        fontWeight: '700',
        color: '#1a3a2e',
        marginBottom: '8px',
        marginTop: 0,
    },
    subtitle: {
        textAlign: 'center',
        fontSize: '16px',
        color: '#3d6b59',
        marginBottom: '40px',
    },
    statsGrid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
        gap: '20px',
    },
    statCard: {
        background: '#fff',
        borderRadius: '16px',
        padding: '20px',
        boxShadow: '0 4px 15px rgba(0,0,0,0.05)',
        display: 'flex',
        alignItems: 'center',
        gap: '16px',
        cursor: 'pointer',
        transition: 'transform 0.2s, boxShadow 0.2s',
    },
    iconBox: {
        width: '56px',
        height: '56px',
        borderRadius: '12px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '28px',
    },
    statInfo: {
        flex: 1,
    },
    statTitle: {
        margin: '0 0 4px 0',
        fontSize: '15px',
        fontWeight: '600',
        color: '#555',
    },
    statValue: {
        margin: 0,
        display: 'flex',
        alignItems: 'baseline',
        gap: '4px',
    },
    currentValue: {
        fontSize: '22px',
        fontWeight: '800',
        color: '#222',
    },
    goalValue: {
        fontSize: '13px',
        color: '#888',
        fontWeight: '500',
    },
    arrow: {
        color: '#ccc',
        fontSize: '18px',
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
        background: 'rgba(255,255,255,0.7)',
        zIndex: 1,
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
        position: 'absolute',
        top: '20px',
        left: '-10px',
        fontSize: '80px',
        opacity: 0.3,
        transform: 'rotate(30deg)',
        pointerEvents: 'none',
        zIndex: 0,
    },
    leafBottomRight: {
        position: 'absolute',
        bottom: '20px',
        right: '-10px',
        fontSize: '80px',
        opacity: 0.3,
        transform: 'rotate(-30deg) scaleX(-1)',
        pointerEvents: 'none',
        zIndex: 0,
    },
};

export default Dashboard;
