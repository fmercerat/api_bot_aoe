# AOE Bot API

API para el bot de Age of Empires que proporciona información sobre mapas, jugadores y partidas.

## Endpoints Disponibles

### GET /maps
Obtiene información sobre los mapas disponibles en Age of Empires.

### GET /maps/:name
Obtiene información sobre un mapa específico por su nombre. El nombre puede contener espacios y la búsqueda no distingue entre mayúsculas y minúsculas.

### GET /players
Obtiene información sobre todos los jugadores registrados.

### GET /players/:userId
Obtiene información detallada de un jugador específico, incluyendo sus estadísticas de partidas, victorias, derrotas, winrate y mapas más jugados.

### GET /matches
Obtiene información sobre todas las partidas completadas con un ganador.

### GET /matches/ongoings
Obtiene información sobre las partidas que están actualmente en curso.

### GET /matches/:number
Obtiene información sobre una partida específica por su número de juego.

## Variables de Entorno

El proyecto requiere las siguientes variables de entorno:

```env
MONGOUSR=tu_usuario_mongodb
MONGOPSW=tu_contraseña_mongodb
MONGOHOST=tu_host_mongodb
PORT=puerto_del_servidor
```

## Instalación

```bash
bun install
```

## Ejecución

```bash
bun run dev
```
