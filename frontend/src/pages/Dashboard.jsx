import { useAuth } from '../context/AuthContext';
import useTheme from '../hooks/useTheme';

export default function Dashboard() {
  useTheme('navy');

  const { user } = useAuth();

  return (
    <div
      style={{
        padding: '2rem',
        minHeight: '100vh',
        background: 'var(--bg-primary)',
        color: 'var(--text-primary)',
      }}
    >
      <h1>Welcome, {user?.name}</h1>
      <p>Student dashboard: levels, XP, certificates ఇక్కడ వస్తాయి.</p>
    </div>
  );
}