import React, { useEffect, useMemo, useState } from 'react';
import { createRoot } from 'react-dom/client';
import './style.css';

const API = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const sections = [
  ['Dashboard', 'dashboard'],
  ['Players', 'players'],
  ['Teams', 'teams'],
  ['Tournaments', 'tournaments'],
  ['Registrations', 'registrations'],
  ['Matches', 'matches'],
  ['Match Results', 'match-results'],
  ['Team Members', 'team-members'],
  ['Team Statistics', 'team-statistics'],
  ['Analysis', 'analysis']
];

function Table({ rows }) {
  const columns = useMemo(() => rows?.[0] ? Object.keys(rows[0]).filter(k => k !== '_id' && k !== '__v') : [], [rows]);
  if (!rows || rows.length === 0) return <p className="muted">No data found.</p>;
  return <div className="table-wrap"><table><thead><tr>{columns.map(c => <th key={c}>{c.replaceAll('_',' ')}</th>)}</tr></thead><tbody>{rows.map((r,idx)=><tr key={idx}>{columns.map(c => <td key={c}>{String(r[c] ?? '')}</td>)}</tr>)}</tbody></table></div>;
}

function App() {
  const [active, setActive] = useState('dashboard');
  const [data, setData] = useState([]);
  const [dashboard, setDashboard] = useState(null);
  const [analysis, setAnalysis] = useState({ captains: [], matches: [], winners: [] });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function load() {
      setLoading(true);
      try {
        if (active === 'analysis') {
          const [captains, matches, winners] = await Promise.all([
            fetch(`${API}/analysis/teams-with-captains`).then(r=>r.json()),
            fetch(`${API}/analysis/matches-full`).then(r=>r.json()),
            fetch(`${API}/analysis/winners`).then(r=>r.json())
          ]);
          setAnalysis({ captains, matches, winners });
        } else if (active === 'dashboard') {
          setDashboard(await fetch(`${API}/dashboard`).then(r=>r.json()));
        } else {
          setData(await fetch(`${API}/${active}`).then(r=>r.json()));
        }
      } catch (err) {
        setData([{ error: 'Could not connect to backend. Start the Node server first.' }]);
      } finally { setLoading(false); }
    }
    load();
  }, [active]);

  return <main>
    <aside>
      <h2>Esports DB</h2>
      
      {sections.map(([label,key]) => <button className={active===key?'active':''} onClick={()=>setActive(key)} key={key}>{label}</button>)}
    </aside>

    <section className="content">
      <h1>Esports Tournament Management System</h1>
      <p className="lead">A simple website application covering  full database schema: players, teams, tournaments, matches, results, registrations, and statistics.</p>

      {loading && <p className="muted">Loading...</p>}

      {!loading && active === 'dashboard' && dashboard && <div>
        <div className="cards">
          <div className="card"><b>{dashboard.players}</b><span>Players</span></div>
          <div className="card"><b>{dashboard.teams}</b><span>Teams</span></div>
          <div className="card"><b>{dashboard.tournaments}</b><span>Tournaments</span></div>
          <div className="card"><b>{dashboard.matches}</b><span>Matches</span></div>
          <div className="card"><b>{dashboard.completedMatches}</b><span>Completed</span></div>
        </div>
        <h2>Top Teams</h2><Table rows={dashboard.topTeams || []} />
      </div>}

      {!loading && active !== 'dashboard' && active !== 'analysis' && <><h2>{sections.find(s=>s[1]===active)?.[0]}</h2><Table rows={data} /></>}

      {!loading && active === 'analysis' && <div>
        <h2>Analysis 1: Teams with Captains</h2><Table rows={analysis.captains} />
        <h2>Analysis 2: Full Match Details</h2><Table rows={analysis.matches} />
        <h2>Analysis 3: Match Winners</h2><Table rows={analysis.winners} />
      </div>}
    </section>
  </main>;
}

createRoot(document.getElementById('root')).render(<App />);
