import express from 'express';
import cors from 'cors';
import { kpiCards, activityFeed, goals, analyticsData, projectsList, teamMembers, settingsConfig } from './data.js';

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

// API endpoints to serve data to the Vue frontend
app.get('/api/dashboard', (req, res) => {
  res.json({ kpiCards, activityFeed, goals });
});

app.get('/api/analytics', (req, res) => { res.json(analyticsData); });
app.get('/api/projects', (req, res) => { res.json(projectsList); });
app.get('/api/team', (req, res) => { res.json(teamMembers); });
app.get('/api/settings', (req, res) => { res.json(settingsConfig); });

app.listen(PORT, () => {
  console.log(`Backend server running on http://localhost:${PORT}`);
});
