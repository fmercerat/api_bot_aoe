import { Hono } from 'hono';
import './db';
import { appMaps } from './controllers/maps.controller';
import { appMatches } from './controllers/matches.controller';
import { appPlayers } from './controllers/players.controller';
const app = new Hono()


app.route('/maps', appMaps);
app.route('/matches', appMatches);
app.route('/players', appPlayers);

export default { 
  port: Bun.env.PORT || 3000, 
  fetch: app.fetch, 
} 

