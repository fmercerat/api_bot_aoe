import mongoose from 'mongoose';

// interface TeamMember {
//   id: string;
//   name: string;
// }

// interface Civilization {
//   main: string;
//   main_score: number;
//   alt: string;
//   alt_score: number;
// }

// interface TeamCivs {
//   [key: string]: Civilization;
// }

// export interface Match {
//   _id: {
//     $oid: string;
//   };
//   game_number: number;
//   thread_id: {
//     $numberLong: string;
//   };
//   map: string;
//   team1: TeamMember[];
//   team2: TeamMember[];
//   team1_civs: TeamCivs;
//   team2_civs: TeamCivs;
//   status: 'completed' | 'in_progress' | 'cancelled';
//   winner: 1 | 2 | null;
// }

// const TeamMemberSchema = new mongoose.Schema({
//   id: { type: String, required: true },
//   name: { type: String, required: true }
// });

// const CivilizationSchema = new mongoose.Schema({
//   main: { type: String, required: true },
//   main_score: { type: Number, required: true },
//   alt: { type: String, required: true },
//   alt_score: { type: Number, required: true }
// });

// const TeamCivsSchema = new mongoose.Schema({
//   type: Map,
//   of: CivilizationSchema
// });

// const matchSchema = new mongoose.Schema({
//     game_number: { type: Number, required: true },
//     thread_id: { type: String, required: true },
//     map: { type: String, required: true },
//     team1: { type: [TeamMemberSchema], required: true },
//     team2: { type: [TeamMemberSchema], required: true },
//     team1_civs: { type: TeamCivsSchema, required: true },
//     team2_civs: { type: TeamCivsSchema, required: true },
//     status: { type: String, required: true },
//     winner: { type: Number, required: true },
// });

const matchSchema = new mongoose.Schema({
    game_number: { type: Number, required: true },
    thread_id: { type: String, required: true },
    map: { type: String, required: true },
    team1: { type: [Object], required: true },
    team2: { type: [Object], required: true },
    team1_civs: { type: Object, required: true },
    team2_civs: { type: Object, required: true },
    status: { type: String, required: true },
    winner: { type: Number, required: true },
});

export const Matches = mongoose.model('Matches', matchSchema); 
