export const kpiCards = [
  { id: 'revenue',  label: 'Total Revenue', value: '$45,231', rawValue: 45231, change: '↑ 20.1% from last month', trend: 'up' },
  { id: 'users',    label: 'Active Users',  value: '2,350',   rawValue: 2350,  change: '↑ 15.3% from last month', trend: 'up' },
  { id: 'projects', label: 'New Projects',  value: '12',      rawValue: 12,    change: '↓ 4.6% from last month',  trend: 'down' },
  { id: 'tickets',  label: 'Open Tickets',  value: '7',       rawValue: 7,     change: '↑ 2 since yesterday',     trend: 'neutral' },
];

export const activityFeed = [
  { id: '1', actor: 'Jane Doe',   action: 'created project', target: 'Alpha Release', timestamp: '2026-03-20T09:12:00Z', avatarInitials: 'JD', avatarColor: 'bg-indigo-100' },
  { id: '2', actor: 'Mark Lee',   action: 'closed ticket',   target: '#1042',         timestamp: '2026-03-20T08:45:00Z', avatarInitials: 'ML', avatarColor: 'bg-emerald-100' },
  { id: '3', actor: 'Sara Kim',   action: 'commented on',    target: 'Q2 Roadmap',    timestamp: '2026-03-20T08:10:00Z', avatarInitials: 'SK', avatarColor: 'bg-rose-100' },
  { id: '4', actor: 'Tom Nguyen', action: 'merged PR',       target: '#289 fix: nav', timestamp: '2026-03-19T17:55:00Z', avatarInitials: 'TN', avatarColor: 'bg-amber-100' },
  { id: '5', actor: 'Jane Doe',   action: 'invited',         target: 'Alex Patel',    timestamp: '2026-03-19T16:30:00Z', avatarInitials: 'JD', avatarColor: 'bg-indigo-100' },
];

export const goals = [
  { id: 'mrr',   label: 'Monthly Recurring Revenue', current: 45231, target: 60000, unit: '$',     color: 'bg-indigo-500' },
  { id: 'users', label: 'Active User Target',        current: 2350,  target: 3000,  unit: 'users', color: 'bg-emerald-500' },
  { id: 'nps',   label: 'NPS Score',                 current: 68,    target: 80,    unit: 'pts',   color: 'bg-amber-500' },
];

export const analyticsData = {
  pageViews: 124500,
  bounceRate: '42%',
  avgSessionDuration: '2m 14s',
  topPages: [
    { path: '/home', views: 45000 },
    { path: '/pricing', views: 22000 },
    { path: '/blog', views: 18000 },
  ]
};

export const projectsList = [
  { id: 'p1', name: 'Website Redesign', status: 'In Progress', progress: 65, dueDate: '2026-04-15' },
  { id: 'p2', name: 'Mobile App Launch', status: 'Planning', progress: 15, dueDate: '2026-06-01' },
  { id: 'p3', name: 'Database Migration', status: 'Completed', progress: 100, dueDate: '2026-02-28' },
  { id: 'p4', name: 'Marketing Campaign Q3', status: 'In Progress', progress: 40, dueDate: '2026-05-10' },
];

export const teamMembers = [
  { id: 't1', name: 'Jane Doe', role: 'Product Manager', email: 'jane@example.com', initials: 'JD', color: 'bg-indigo-100 text-indigo-700' },
  { id: 't2', name: 'Mark Lee', role: 'Lead Developer', email: 'mark@example.com', initials: 'ML', color: 'bg-emerald-100 text-emerald-700' },
  { id: 't3', name: 'Sara Kim', role: 'UX Designer', email: 'sara@example.com', initials: 'SK', color: 'bg-rose-100 text-rose-700' },
  { id: 't4', name: 'Tom Nguyen', role: 'Marketing Specialist', email: 'tom@example.com', initials: 'TN', color: 'bg-amber-100 text-amber-700' },
];

export const settingsConfig = {
  notifications: true,
  theme: 'Light',
  language: 'English',
  timezone: 'UTC+7'
};
