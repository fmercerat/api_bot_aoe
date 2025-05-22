import mongoose from 'mongoose';

const mapSchema = new mongoose.Schema({
    civ_rating: { type: Object, required: true },
    name: { type: String, required: true },
    chance: { type: Number, required: true },
    type: { type: String, required: true }
});

export const Maps = mongoose.model('Maps', mapSchema); 