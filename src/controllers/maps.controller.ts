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

.get("/:name", async (c) => {
    const { name } = c.req.param();
    try {
        // Convertir el nombre de búsqueda en un patrón regex que ignore espacios
        const searchPattern = name.split('').join('\\s*');
        const map = await Maps.find({ 
            name: { 
                $regex: new RegExp(searchPattern, 'i')
            } 
        });
        return c.json(map);
    } catch (error) {
        return c.json({ error: "Error al obtener el mapa" }, 500);
    }
});

export { appMaps };