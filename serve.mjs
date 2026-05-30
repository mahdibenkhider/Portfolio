import { createServer } from 'http';
import { readFileSync, existsSync, createReadStream } from 'fs';
import { join, extname } from 'path';

const dist = new URL('./dist', import.meta.url).pathname;
const port = parseInt(process.argv[2] || '5173');
const mime = {
  html: 'text/html; charset=utf-8',
  css: 'text/css',
  js: 'application/javascript',
  png: 'image/png',
  jpg: 'image/jpeg',
  jpeg: 'image/jpeg',
  svg: 'image/svg+xml',
  pdf: 'application/pdf',
  ico: 'image/x-icon',
  webp: 'image/webp',
  avif: 'image/avif',
};

createServer((req, res) => {
  let url = req.url === '/' ? '/index.html' : req.url.split('?')[0];
  let file = join(dist, url);
  if (!existsSync(file)) { res.writeHead(404); res.end('404'); return; }
  const ext = extname(file).slice(1);
  res.writeHead(200, { 'Content-Type': mime[ext] || 'application/octet-stream' });
  createReadStream(file).pipe(res);
}).listen(port, '0.0.0.0', () => {
  console.log(`\n  ✅ Serveur lancé !`);
  console.log(`  ➜  Local:   http://localhost:${port}/`);
  console.log(`  ➜  Réseau:  http://192.168.1.14:${port}/\n`);
});

// Keep alive
process.stdin.resume();
