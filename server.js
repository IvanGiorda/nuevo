const http = require('http');
const url = require('url');
const fs = require('fs');
const path = require('path');

// Cargar base de datos desde JSON
const autosDB = JSON.parse(
  fs.readFileSync(path.join(__dirname, 'autos.json'), 'utf8')
);

const server = http.createServer((req, res) => {
  // Headers CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Content-Type', 'application/json');

  if (req.method === 'OPTIONS') {
    res.writeHead(200);
    res.end();
    return;
  }

  const parsedUrl = url.parse(req.url, true);
  const path = parsedUrl.pathname;

  // GET /api/marcas - Obtener todas las marcas
  if (path === '/api/marcas' && req.method === 'GET') {
    const marcas = Object.keys(autosDB);
    res.writeHead(200);
    res.end(JSON.stringify({ marcas }));
    return;
  }

  // GET /api/modelos?marca=toyota - Obtener modelos de una marca
  if (path === '/api/modelos' && req.method === 'GET') {
    const marca = parsedUrl.query.marca?.toLowerCase();
    
    if (!marca) {
      res.writeHead(400);
      res.end(JSON.stringify({ error: 'Parámetro "marca" requerido' }));
      return;
    }

    if (!autosDB[marca]) {
      res.writeHead(404);
      res.end(JSON.stringify({ error: 'Marca no encontrada' }));
      return;
    }

    const modelos = Object.keys(autosDB[marca].modelos);
    res.writeHead(200);
    res.end(JSON.stringify({ 
      marca: marca,
      modelos: modelos 
    }));
    return;
  }

  // GET /api/versiones?marca=peugeot&modelo=405 - Obtener versiones de un modelo
  if (path === '/api/versiones' && req.method === 'GET') {
    const marca = parsedUrl.query.marca?.toLowerCase();
    const modelo = parsedUrl.query.modelo;

    if (!marca || !modelo) {
      res.writeHead(400);
      res.end(JSON.stringify({ error: 'Parámetros "marca" y "modelo" requeridos' }));
      return;
    }

    if (!autosDB[marca]) {
      res.writeHead(404);
      res.end(JSON.stringify({ error: 'Marca no encontrada' }));
      return;
    }

    if (!autosDB[marca].modelos[modelo]) {
      res.writeHead(404);
      res.end(JSON.stringify({ error: 'Modelo no encontrado' }));
      return;
    }

    res.writeHead(200);
    res.end(JSON.stringify({
      marca: marca,
      modelo: modelo,
      versiones: autosDB[marca].modelos[modelo].versiones
    }));
    return;
  }

  // GET /api/especificaciones?marca=peugeot&modelo=405&version=SRI
  if (path === '/api/especificaciones' && req.method === 'GET') {
    const marca = parsedUrl.query.marca?.toLowerCase();
    const modelo = parsedUrl.query.modelo;
    const version = parsedUrl.query.version;

    if (!marca || !modelo || !version) {
      res.writeHead(400);
      res.end(JSON.stringify({ error: 'Parámetros "marca", "modelo" y "version" requeridos' }));
      return;
    }

    if (!autosDB[marca]) {
      res.writeHead(404);
      res.end(JSON.stringify({ error: 'Marca no encontrada' }));
      return;
    }

    if (!autosDB[marca].modelos[modelo]) {
      res.writeHead(404);
      res.end(JSON.stringify({ error: 'Modelo no encontrado' }));
      return;
    }

    if (!autosDB[marca].modelos[modelo].especificaciones[version]) {
      res.writeHead(404);
      res.end(JSON.stringify({ error: 'Versión no encontrada' }));
      return;
    }

    res.writeHead(200);
    res.end(JSON.stringify({
      marca: marca,
      modelo: modelo,
      version: version,
      especificaciones: autosDB[marca].modelos[modelo].especificaciones[version]
    }));
    return;
  }

  // Ruta no encontrada
  res.writeHead(404);
  res.end(JSON.stringify({ error: 'Ruta no encontrada' }));
});

const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
  console.log('\nEndpoints disponibles:');
  console.log('- GET /api/marcas');
  console.log('- GET /api/modelos?marca=toyota');
  console.log('- GET /api/versiones?marca=peugeot&modelo=405');
  console.log('- GET /api/especificaciones?marca=peugeot&modelo=405&version=SRI');
});