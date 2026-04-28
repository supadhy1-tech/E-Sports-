import express from 'express';
import {
  Player, Team, TeamMember, Tournament,
  Registration, Match, MatchResult, TeamStatistics
} from '../models/models.js';

const router = express.Router();

router.get('/players', async (req, res) => res.json(await Player.find().sort({ player_id: 1 })));
router.get('/teams', async (req, res) => res.json(await Team.find().sort({ team_id: 1 })));
router.get('/team-members', async (req, res) => res.json(await TeamMember.find().sort({ team_id: 1 })));
router.get('/tournaments', async (req, res) => res.json(await Tournament.find().sort({ tournament_id: 1 })));
router.get('/registrations', async (req, res) => res.json(await Registration.find().sort({ registration_id: 1 })));
router.get('/matches', async (req, res) => res.json(await Match.find().sort({ match_id: 1 })));
router.get('/match-results', async (req, res) => res.json(await MatchResult.find().sort({ result_id: 1 })));
router.get('/team-statistics', async (req, res) => res.json(await TeamStatistics.find().sort({ stat_id: 1 })));

router.get('/dashboard', async (req, res) => {
  const [players, teams, tournaments, matches, completedMatches, stats] = await Promise.all([
    Player.countDocuments(),
    Team.countDocuments(),
    Tournament.countDocuments(),
    Match.countDocuments(),
    Match.countDocuments({ match_status: 'Completed' }),
    TeamStatistics.find().sort({ wins: -1, total_points: -1 }).limit(5)
  ]);
  res.json({ players, teams, tournaments, matches, completedMatches, topTeams: stats });
});

router.get('/analysis/teams-with-captains', async (req, res) => {
  const data = await Team.aggregate([
    { $lookup: { from: 'Player', localField: 'captain_id', foreignField: 'player_id', as: 'captain' } },
    { $unwind: '$captain' },
    { $project: { _id: 0, team_id: 1, team_name: 1, captain_name: '$captain.username' } }
  ]);
  res.json(data);
});

router.get('/analysis/matches-full', async (req, res) => {
  const data = await Match.aggregate([
    { $lookup: { from: 'Tournament', localField: 'tournament_id', foreignField: 'tournament_id', as: 'tournament' } },
    { $unwind: '$tournament' },
    { $lookup: { from: 'Team', localField: 'team1_id', foreignField: 'team_id', as: 'team1' } },
    { $unwind: '$team1' },
    { $lookup: { from: 'Team', localField: 'team2_id', foreignField: 'team_id', as: 'team2' } },
    { $unwind: '$team2' },
    { $project: { _id: 0, match_id: 1, tournament: '$tournament.name', team1: '$team1.team_name', team2: '$team2.team_name', match_status: 1, venue: 1, schedule: 1 } }
  ]);
  res.json(data);
});

router.get('/analysis/winners', async (req, res) => {
  const data = await MatchResult.aggregate([
    { $lookup: { from: 'Team', localField: 'winner_id', foreignField: 'team_id', as: 'winner' } },
    { $unwind: '$winner' },
    { $project: { _id: 0, match_id: 1, winner: '$winner.team_name', score_team1: 1, score_team2: 1, result_date: 1 } }
  ]);
  res.json(data);
});

export default router;
