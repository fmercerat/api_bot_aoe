import { Hono } from "hono";
import { Matches } from "../models/matches.model";

const appMatches = new Hono();

appMatches
.get("/", async (c) => {
    try {
        const matches = await Matches.find({winner: {$ne: 0}});
        return c.json(matches);
    } catch (error) {
        return c.json({ error: "Error al obtener los partidos" }, 500);
    }
})
.get("/ongoings", async (c) => {
    try {
        const matches = await Matches.find({status: 'ongoing'});
        return c.json(matches);
    } catch (error) {
        return c.json({ error: "Error al obtener los partidos" }, 500);
    }
})
.get("/activity", async (c) => {
    try {
        const activity = await Matches.aggregate([
            {
                $group: {
                    _id: { $hour: "$createdAt" },
                    total: { $sum: 1 }
                }
            },
            {
                $project: {
                    _id: 0,
                    hour: "$_id",
                    total: 1
                }
            },
            {
                $sort: { hour: 1 }
            }
        ]);
        
        return c.json(activity);
    } catch (error) {
        return c.json({ error: "Error al obtener la actividad de partidos" }, 500);
    }
})
.get("/:number", async(c) => {
    try {
        const number = parseInt(c.req.param("number"));
        
        if (isNaN(number)) {
            return c.json({ error: "El número de partido debe ser un valor numérico" }, 400);
        }

        const match = await Matches.findOne({ game_number: number });
        
        if (!match) {
            return c.json({ error: "Partido no encontrado" }, 404);
        }

        return c.json(match);
    } catch (error) {
        return c.json({ error: "Error al obtener el partido" }, 500);
    }
})

export { appMatches };