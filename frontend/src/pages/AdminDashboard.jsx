
import useTheme from '../hooks/useTheme';


export default function AdminDashboard() {

  useTheme('navy');
  
  return (
    <div style={{ padding: '2rem' }}>
      <h1>Admin Dashboard</h1>
      <p>Users, categories, questions, games ఇక్కడ manage చేయవచ్చు.</p>
    </div>
  );
}
