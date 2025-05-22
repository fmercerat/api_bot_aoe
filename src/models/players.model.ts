import mongoose from 'mongoose';

/* {
    "_id": {
      "$oid": "682a047764c3e5177b91ceb4"
    },
    "userId": "bot_1",
    "playerName": "Bot_1",
    "displayName": "Bot_1",
    "elo": 1955
} */

const playerSchema = new mongoose.Schema({
    userId: { type: String, required: true },
    playerName: { type: String, required: true },
    displayName: { type: String, required: true },
    elo: { type: Number, required: true },
});

export const Players = mongoose.model('Players', playerSchema); 

