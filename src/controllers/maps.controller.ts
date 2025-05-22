import { Hono } from "hono";
import { Maps } from "../models/maps.model";

const appMaps = new Hono();

appMaps
.get("/", async (c) => {
    try {
        const maps = await Maps.find({});
        return c.json(maps);
    } catch (error) {
        return c.json({ error: "Error al obtener los mapas" }, 500);
    }
})

export { appMaps };