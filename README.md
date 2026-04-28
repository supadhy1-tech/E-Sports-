# Esports Tournament MongoDB Website Application

This is a simple full-stack website application for the esports tournament database project.

## Technologies

- Frontend: React + Vite
- Backend: Node.js + Express
- Database: MongoDB
- ODM: Mongoose

## Database Schema Covered

The app covers these MongoDB collections:

1. Player
2. Team
3. TeamMember
4. Tournament
5. Registration
6. Match
7. MatchResult
8. TeamStatistics

## How to Run

### 1. Start MongoDB

Make sure MongoDB is running locally. The default connection is:

```bash
mongodb://127.0.0.1:27017/esports_db
```

### 2. Run Backend

```bash
cd backend
npm install
cp .env.example .env
npm run seed
npm run dev
```

Backend runs on:

```bash
http://localhost:5000
```

### 3. Run Frontend

Open another terminal:

```bash
cd frontend
npm install
npm run dev
```

Frontend runs on:

```bash
http://localhost:5173
```

## Main Features

- Dashboard summary cards
- View all players
- View all teams
- View all tournaments
- View all registrations
- View all matches
- View all match results
- View team members
- View team statistics
- Data analysis page with MongoDB aggregation results

## API Routes

- GET /api/dashboard
- GET /api/players
- GET /api/teams
- GET /api/team-members
- GET /api/tournaments
- GET /api/registrations
- GET /api/matches
- GET /api/match-results
- GET /api/team-statistics
- GET /api/analysis/teams-with-captains
- GET /api/analysis/matches-full
- GET /api/analysis/winners
