import dotenv from 'dotenv';
import { connectDB } from './db.js';
import { Player, Team, TeamMember, Tournament, Registration, Match, MatchResult, TeamStatistics } from './models/models.js';

dotenv.config();
await connectDB();

const players = [
{ player_id:1, username:'AidenClark', email:'aiden.clark@gmail.com', rank:'Gold', region:'NA' },
{ player_id:2, username:'LiamWalker', email:'liam.walker@gmail.com', rank:'Silver', region:'EU' },
{ player_id:3, username:'NoahMartinez', email:'noah.m@gmail.com', rank:'Platinum', region:'ASIA' },
{ player_id:4, username:'EthanBrown', email:'ethan.brown@gmail.com', rank:'Gold', region:'NA' },
{ player_id:5, username:'LucasGarcia', email:'lucas.g@gmail.com', rank:'Diamond', region:'EU' },
{ player_id:6, username:'MasonLee', email:'mason.lee@gmail.com', rank:'Bronze', region:'ASIA' },
{ player_id:7, username:'LoganHarris', email:'logan.h@gmail.com', rank:'Silver', region:'NA' },
{ player_id:8, username:'JamesYoung', email:'james.y@gmail.com', rank:'Gold', region:'EU' },
{ player_id:9, username:'BenjaminHall', email:'ben.hall@gmail.com', rank:'Platinum', region:'ASIA' },
{ player_id:10, username:'ElijahAllen', email:'elijah.a@gmail.com', rank:'Diamond', region:'NA' }
];
const teams = [
{ team_id:1, team_name:'Shadow Wolves', captain_id:1 },
{ team_id:2, team_name:'Crimson Titans', captain_id:2 },
{ team_id:3, team_name:'Nova Legends', captain_id:3 },
{ team_id:4, team_name:'Iron Guardians', captain_id:4 },
{ team_id:5, team_name:'Phantom Reapers', captain_id:5 },
{ team_id:6, team_name:'Storm Breakers', captain_id:6 },
{ team_id:7, team_name:'Golden Eagles', captain_id:7 },
{ team_id:8, team_name:'Vortex Knights', captain_id:8 },
{ team_id:9, team_name:'Cyber Spartans', captain_id:9 },
{ team_id:10, team_name:'Inferno Dragons', captain_id:10 }
];
const teamMembers = players.map(p => ({ team_id:p.player_id, player_id:p.player_id, join_date:`2024-01-${String(p.player_id).padStart(2,'0')}`, role:'Captain' }));
const tournaments = [
{ tournament_id:1, name:'Global Esports Cup', gametype:'FPS', format:'Knockout', start_date:'2024-05-01', end_date:'2024-05-10', rules:'Standard rules', max_teams:16 },
{ tournament_id:2, name:'Legends Arena', gametype:'MOBA', format:'League', start_date:'2024-06-01', end_date:'2024-06-15', rules:'Standard rules', max_teams:20 },
{ tournament_id:3, name:'Ultimate Battle', gametype:'FPS', format:'Knockout', start_date:'2024-07-01', end_date:'2024-07-10', rules:'Standard rules', max_teams:16 },
{ tournament_id:4, name:'Champions League', gametype:'MOBA', format:'League', start_date:'2024-08-01', end_date:'2024-08-15', rules:'Standard rules', max_teams:20 },
{ tournament_id:5, name:'Pro Masters', gametype:'FPS', format:'Knockout', start_date:'2024-09-01', end_date:'2024-09-10', rules:'Standard rules', max_teams:16 },
{ tournament_id:6, name:'Elite Clash', gametype:'MOBA', format:'League', start_date:'2024-10-01', end_date:'2024-10-15', rules:'Standard rules', max_teams:20 },
{ tournament_id:7, name:'Warzone Finals', gametype:'FPS', format:'Knockout', start_date:'2024-11-01', end_date:'2024-11-10', rules:'Standard rules', max_teams:16 },
{ tournament_id:8, name:'Galaxy Tournament', gametype:'MOBA', format:'League', start_date:'2024-12-01', end_date:'2024-12-15', rules:'Standard rules', max_teams:20 },
{ tournament_id:9, name:'Winter Championship', gametype:'FPS', format:'Knockout', start_date:'2025-01-01', end_date:'2025-01-10', rules:'Standard rules', max_teams:16 },
{ tournament_id:10, name:'Spring Invitational', gametype:'MOBA', format:'League', start_date:'2025-02-01', end_date:'2025-02-15', rules:'Standard rules', max_teams:20 }
];
const registrations = tournaments.map(t => ({ registration_id:t.tournament_id, tournament_id:t.tournament_id, team_id:t.tournament_id, registration_date:`2024-04-${String(t.tournament_id).padStart(2,'0')}`, status:t.tournament_id % 3 === 0 ? 'Pending' : 'Approved' }));
const venues = ['Los Angeles Arena','London Arena','Tokyo Dome','Berlin Stadium','Paris Arena','Seoul Arena','New York Arena','Dubai Esports Hall','Sydney Arena','Toronto Arena'];
const matches = tournaments.map((t,i) => ({ match_id:t.tournament_id, tournament_id:t.tournament_id, team1_id:t.tournament_id, team2_id:t.tournament_id === 10 ? 1 : t.tournament_id + 1, round_num:1, match_status:t.tournament_id % 2 === 0 ? 'Completed' : 'Scheduled', venue:venues[i], schedule:`2024-${String(5+i).padStart(2,'0')}-02 12:00:00` }));
const results = matches.map(m => ({ result_id:m.match_id, match_id:m.match_id, winner_id:m.team1_id, loser_id:m.team2_id, score_team1:m.match_id % 2 === 0 ? 3 : 2, score_team2:m.match_id % 2 === 0 ? 1 : 0, result_date:m.schedule.slice(0,10) }));
const stats = [3,4,2,3,1,4,2,3,4,2].map((wins,i)=>({ stat_id:i+1, team_id:i+1, tournament_id:i+1, matches_played:5, wins, losses:5-wins, total_points:wins*3 }));

await Promise.all([Player.deleteMany({}), Team.deleteMany({}), TeamMember.deleteMany({}), Tournament.deleteMany({}), Registration.deleteMany({}), Match.deleteMany({}), MatchResult.deleteMany({}), TeamStatistics.deleteMany({})]);
await Player.insertMany(players); await Team.insertMany(teams); await TeamMember.insertMany(teamMembers); await Tournament.insertMany(tournaments); await Registration.insertMany(registrations); await Match.insertMany(matches); await MatchResult.insertMany(results); await TeamStatistics.insertMany(stats);
console.log('Seed complete: esports_db now has sample data.');
process.exit(0);
