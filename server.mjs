import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';

const page = fileURLToPath(new URL('./index.html', import.meta.url));
const host = '0.0.0.0';
const port = 3000;

createServer(async (request, response) => {
  const pathname = new URL(request.url, 'http://localhost').pathname;
  const asset = /^\/iconos-3d\/[a-z0-9-]+\.png$/.test(pathname);
  if (pathname !== '/' && pathname !== '/index.html' && !asset) {
    response.writeHead(404).end('No encontrado');
    return;
  }

  try {
    const html = await readFile(asset ? new URL(`.${pathname}`, import.meta.url) : page);
    response.writeHead(200, {
      'Content-Type': asset ? 'image/png' : 'text/html; charset=utf-8',
      'Content-Length': html.length,
      'Cache-Control': 'no-store',
    });
    response.end(html);
  } catch (error) {
    response.writeHead(error.code === 'ENOENT' ? 404 : 500).end('No se pudo cargar EONLINK');
    console.error(error);
  }
}).listen(port, host, () => {
  console.log(`EONLINK disponible en http://localhost:${port}`);
});
