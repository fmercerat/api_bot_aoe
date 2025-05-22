import { Hono } from 'hono';
import { cache } from 'hono/cache';
import './db';
import { appMaps } from './controllers/maps.controller';
import { appMatches } from './controllers/matches.controller';
import { appPlayers } from './controllers/players.controller';

const app = new Hono()

// Add caching middleware
app.use('*', cache({
  cacheName: 'api-cache',
  cacheControl: 'max-age=60', 
  wait: false,
  keyGenerator: (c) => c.req.url,
}))

app.route('/maps', appMaps);
app.route('/matches', appMatches);
app.route('/players', appPlayers);

export default { 
  port: Bun.env.PORT || 3000, 
  fetch: app.fetch, 
} 

