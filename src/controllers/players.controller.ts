import { Hono } from "hono";
import { Players } from "../models/players.model";
import { Matches } from "../models/matches.model";

interface PlayerWithStats {
    userId: string;
    playerName: string;
    displayName: string;
    elo: number;
    stats?: {
        total: number;
        wins: number;
        losses: number;
        winrate: number;
        mostPlayed: string;
        mapsPlayed: Record<string, { games: number; wins: number }>;
    };
}

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

appPlayers.get("/:userId", async (c) => {
    const { userId } = c.req.param();
    try {
        const player = await Players.findOne({ userId: userId });

        if (!player) {
            return c.json({ error: "Jugador no encontrado" }, 404);
        }

        const matches = await Matches.find({
            "$and": [
              { "status": "completed" },
              { "winner": { "$ne": 0 } },
              {
                "$or": [
                  { "team1.id": userId },
                  { "team2.id": userId }
                ]
              }
            ]
        });

        const stats = {
            total: 0,
            wins: 0,
            losses: 0,
            mapsPlayed: new Map<string, { games: number; wins: number }>()
        };

        for (const match of matches) {
            const team1 = match.team1.map((p: any) => p.id);
            const team2 = match.team2.map((p: any) => p.id);
            const playerTeam = team1.includes(userId) ? 1 : team2.includes(userId) ? 2 : null;

            if (!playerTeam) continue;

            const won = match.winner === playerTeam;
            if (won) {
                stats.wins++;
            } else {
                stats.losses++;
            }

            stats.total++;
            const mapName = match.map;
            const mapStats = stats.mapsPlayed.get(mapName) || { games: 0, wins: 0 };
            mapStats.games++;
            if (won) {
                mapStats.wins++;
            }
            stats.mapsPlayed.set(mapName, mapStats);
        }

        if (stats.total === 0) {
            return c.json({ error: `${player.displayName} no tiene partidas completadas con resultado válido.` }, 404);
        }

        const mostPlayed = Array.from(stats.mapsPlayed.entries())
            .reduce((a, b) => a[1].games > b[1].games ? a : b)[0];
        const winrate = Math.round((stats.wins / stats.total) * 1000) / 10;

        const playerWithStats: PlayerWithStats = {
            ...player.toObject(),
            stats: {
                total: stats.total,
                wins: stats.wins,
                losses: stats.losses,
                winrate,
                mostPlayed,
                mapsPlayed: Object.fromEntries(stats.mapsPlayed)
            }
        };

        // console.log(JSON.stringify(playerWithStats))

        return c.json(playerWithStats);
    } catch (error) {
        return c.json({ error: "Error al obtener el jugador" }, 500);
    }
});

export { appPlayers };