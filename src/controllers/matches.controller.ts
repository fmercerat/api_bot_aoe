import { Hono } from "hono";
import { Matches } from "../models/matches.model";

const appMatches = new Hono();

appMatches
.get("/", async (c) => {
    try {
        const matches = await Matches.find({});
        return c.json(matches);
    } catch (error) {
        return c.json({ error: "Error al obtener los partidos" }, 500);
    }
})

export { appMatches };