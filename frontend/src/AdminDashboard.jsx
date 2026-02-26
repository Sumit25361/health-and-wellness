import { useAuth } from './AuthContext';
import './index.css';

function AdminDashboard() {
    const { user, logout } = useAuth();

    const stats = [
        { label: 'Total Users', value: '120', icon: '👥' },
        { label: 'Active Sessions', value: '34', icon: '🟢' },
        { label: 'Reports Today', value: '8', icon: '📊' },
        { label: 'System Health', value: '99%', icon: '❤️' },
    ];

    return (
        <div style={styles.container}>
            <div style={styles.sidebar}>
                <div style={styles.sidebarHeader}>
                    <h2 style={styles.brandLogo}>Health &amp; Wellness</h2>
                    <p style={styles.adminLabel}>Admin Panel</p>
                </div>
                <nav style={styles.nav}>
                    <a href="#" style={styles.navItem}>📋 Overview</a>
                    <a href="#" style={styles.navItem}>👥 Users</a>
                    <a href="#" style={styles.navItem}>📊 Reports</a>
                    <a href="#" style={styles.navItem}>⚙️ Settings</a>
                </nav>

            </div>

            <div style={styles.main}>
                <div style={styles.topBar}>
                    <div>
                        <h1 style={styles.title}>Admin Dashboard</h1>
                        <p style={styles.subtitle}>Welcome back, {user?.name || 'Admin'}!</p>
                    </div>
                    <div style={styles.adminBadge}>
                        <span style={styles.adminBadgeText}>🛡️ Admin</span>
                    </div>
                </div>

                <div style={styles.statsGrid}>
                    {stats.map((stat) => (
                        <div key={stat.label} style={styles.statCard}>
                            <div style={styles.statIcon}>{stat.icon}</div>
                            <div style={styles.statValue}>{stat.value}</div>
                            <div style={styles.statLabel}>{stat.label}</div>
                        </div>
                    ))}
                </div>

                <div style={styles.card}>
                    <h3 style={styles.cardTitle}>System Information</h3>
                    <table style={styles.table}>
                        <thead>
                            <tr>
                                <th style={styles.th}>Property</th>
                                <th style={styles.th}>Value</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr><td style={styles.td}>Admin Email</td><td style={styles.td}>{user?.email}</td></tr>
                            <tr><td style={styles.td}>Role</td><td style={styles.td}>Administrator</td></tr>
                            <tr><td style={styles.td}>Server</td><td style={styles.td}>localhost:5000</td></tr>
                            <tr><td style={styles.td}>Status</td><td style={styles.td}>🟢 Online</td></tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

const styles = {
    container: { display: 'flex', minHeight: '100vh', fontFamily: 'Segoe UI, sans-serif', background: '#0f172a' },
    sidebar: { width: '240px', background: 'linear-gradient(180deg, #1e293b 0%, #0f172a 100%)', display: 'flex', flexDirection: 'column', padding: '0', borderRight: '1px solid #334155' },
    sidebarHeader: { padding: '28px 20px 20px', borderBottom: '1px solid #334155' },
    brandLogo: { color: '#38bdf8', fontSize: '18px', margin: 0 },
    adminLabel: { color: '#94a3b8', fontSize: '12px', margin: '4px 0 0' },
    nav: { flex: 1, padding: '16px 0' },
    navItem: { display: 'block', color: '#cbd5e1', textDecoration: 'none', padding: '12px 20px', fontSize: '14px', transition: 'background 0.2s', borderLeft: '3px solid transparent', marginBottom: '2px' },
    logoutBtn: { margin: '20px', padding: '10px 16px', background: '#ef4444', color: '#fff', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: '600', fontSize: '14px' },
    main: { flex: 1, padding: '32px' },
    topBar: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '32px' },
    title: { color: '#f1f5f9', fontSize: '28px', margin: 0, fontWeight: '700' },
    subtitle: { color: '#94a3b8', margin: '4px 0 0', fontSize: '14px' },
    adminBadge: { background: '#1e293b', border: '1px solid #38bdf8', borderRadius: '20px', padding: '6px 16px' },
    adminBadgeText: { color: '#38bdf8', fontSize: '14px', fontWeight: '600' },
    statsGrid: { display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px', marginBottom: '28px' },
    statCard: { background: '#1e293b', borderRadius: '12px', padding: '20px', textAlign: 'center', border: '1px solid #334155' },
    statIcon: { fontSize: '28px', marginBottom: '8px' },
    statValue: { color: '#f1f5f9', fontSize: '28px', fontWeight: '700', marginBottom: '4px' },
    statLabel: { color: '#94a3b8', fontSize: '13px' },
    card: { background: '#1e293b', borderRadius: '12px', padding: '24px', border: '1px solid #334155' },
    cardTitle: { color: '#f1f5f9', fontSize: '18px', fontWeight: '600', margin: '0 0 16px' },
    table: { width: '100%', borderCollapse: 'collapse' },
    th: { color: '#94a3b8', textAlign: 'left', padding: '10px 12px', fontSize: '13px', borderBottom: '1px solid #334155', fontWeight: '600' },
    td: { color: '#cbd5e1', padding: '12px', fontSize: '14px', borderBottom: '1px solid #1e293b' },
};

export default AdminDashboard;
