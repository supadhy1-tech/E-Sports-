import mongoose from 'mongoose';

const playerSchema = new mongoose.Schema({
  player_id: Number,
  username: String,
  email: String,
  rank: String,
  region: String
}, { collection: 'Player' });

const teamSchema = new mongoose.Schema({
  team_id: Number,
  team_name: String,
  captain_id: Number
}, { collection: 'Team' });

const teamMemberSchema = new mongoose.Schema({
  team_id: Number,
  player_id: Number,
  join_date: String,
  role: String
}, { collection: 'TeamMember' });

const tournamentSchema = new mongoose.Schema({
  tournament_id: Number,
  name: String,
  gametype: String,
  format: String,
  start_date: String,
  end_date: String,
  rules: String,
  max_teams: Number
}, { collection: 'Tournament' });

const registrationSchema = new mongoose.Schema({
  registration_id: Number,
  tournament_id: Number,
  team_id: Number,
  registration_date: String,
  status: String
}, { collection: 'Registration' });

const matchSchema = new mongoose.Schema({
  match_id: Number,
  tournament_id: Number,
  team1_id: Number,
  team2_id: Number,
  round_num: Number,
  match_status: String,
  venue: String,
  schedule: String
}, { collection: 'Match' });

const matchResultSchema = new mongoose.Schema({
  result_id: Number,
  match_id: Number,
  winner_id: Number,
  loser_id: Number,
  score_team1: Number,
  score_team2: Number,
  result_date: String
}, { collection: 'MatchResult' });

const teamStatisticsSchema = new mongoose.Schema({
  stat_id: Number,
  team_id: Number,
  tournament_id: Number,
  matches_played: Number,
  wins: Number,
  losses: Number,
  total_points: Number
}, { collection: 'TeamStatistics' });

export const Player = mongoose.model('Player', playerSchema);
export const Team = mongoose.model('Team', teamSchema);
export const TeamMember = mongoose.model('TeamMember', teamMemberSchema);
export const Tournament = mongoose.model('Tournament', tournamentSchema);
export const Registration = mongoose.model('Registration', registrationSchema);
export const Match = mongoose.model('Match', matchSchema);
export const MatchResult = mongoose.model('MatchResult', matchResultSchema);
export const TeamStatistics = mongoose.model('TeamStatistics', teamStatisticsSchema);
