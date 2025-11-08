# QloudSound Site

Landing estática + microsite **QloudSound Create** construidos en Next.js 14 (pages router).

## Requisitos

- Node.js 18+ (recomendado 20)
- npm

## Ejecutar en local

```bash
npm install
npm run dev
```

Visita `http://localhost:3000` para el sitio principal. Los nuevos recursos del microsite están disponibles en:

- `/admin/requests`: listado de pedidos recibidos (con enlace a detalle).
- La home (`/en` y `/es`) incorpora el hero + formulario del servicio Create, reutilizando el endpoint para mostrar el conteo de pedidos activos directamente en la página principal.

> Nota: aún no hay autenticación en `/admin/requests`. **TODO** añadir auth básica antes de desplegar a producción.

## Endpoint `/api/request`

- Recibe el formulario principal de la home (sección Create) mediante `multipart/form-data` (incluye archivo opcional).
- Valida campos obligatorios y honeypot `website`.
- Persiste cada registro en `data/requests.json` y guarda los adjuntos en `data/uploads/`.
- Responde `{ ok: true }` o `{ error: string }`.
- Incluye comentarios `// TODO` donde se conectarán las APIs de generación (Udio/Mubert) y distribución (DistroKid) en el futuro.

La misma API se consulta desde la home para mostrar el número de pedidos activos. Los pedidos se almacenan localmente y deben revisarse manualmente antes de publicar o integrar con APIs externas.

## Datos locales

- `data/requests.json`: base de datos plana con los pedidos.
- `data/uploads/`: carpeta para adjuntos de referencia.

Ambos se crean automáticamente si no existen al recibir el primer formulario.
