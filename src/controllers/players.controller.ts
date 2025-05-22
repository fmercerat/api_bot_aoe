import { Hono } from "hono";
import { Players } from "../models/players.model";

const appPlayers = new Hono();

appPlayers
.get("/", async (c) => {
    try {
        const players = await Players.find({});
        return c.json(players);
    } catch (error) {
        return c.json({ error: "Error al obtener los jugadores" }, 500);
    }
});

export { appPlayers };