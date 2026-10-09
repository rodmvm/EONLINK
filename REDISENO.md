# EONLINK · Dirección del rediseño

Referencias: Frames 406, 408, 409, 410, 411, 412 y 413 aportados por el usuario.

## Principios aplicados

- Base negra con superficies oscuras, contornos finos y reflejos discretos.
- Azul: organización, obras y archivos; menta: dinero y gastos; ámbar: cotizaciones y revisión; violeta: asistencia y operación.
- Los estados tienen texto y punto además del color.
- Iconos de línea en navegación y controles pequeños. Ilustraciones 3D en acciones y cabeceras.
- Tarjetas comparten contexto, título, dato principal y acceso circular al detalle.
- Los listados de cotizaciones, tanto generales como por obra, usan tarjetas deslizables horizontales con ajuste por tarjeta, contador y controles anterior/siguiente. No avanzan automáticamente. También admiten teclado y desplazamiento táctil.
- En móvil, paneles inferiores con fondo desenfocado y dock por área; en escritorio, panel lateral y cuadrícula.
- Cada obra tiene su propia imagen persistente y un + blanco semitransparente abajo a la izquierda.
- Reemplazar una cuenta conserva su ID funcional: operativa, reserva o tarjeta del negocio. El resumen y los movimientos consultan esa misma identidad.

## Archivos editables

`redesign.js`: componentes y persistencia local. `redesign.css`: reglas visuales comunes.
`build-redesign.mjs`: integra esos archivos con `index.original.html`, conservado como fuente base.
`index.html`: resultado servido. `server.mjs`: servidor y recursos PNG.

Ejecutar `npm run build` después de editar. `npm start` escucha en el puerto 3000.
`npm test` comprueba propagación de cuentas y persistencia.

Los recursos de `iconos-3d` son provisionales hasta recibir el sistema definitivo. No se recibieron los originales de las fotografías que aparecen en los mockups; se muestra una ilustración hasta seleccionar una imagen.

Las imágenes elegidas se comprimen y guardan en localStorage. Los documentos añadidos se guardan en IndexedDB y pueden descargarse desde su obra. No hay conexión bancaria, WhatsApp ni Drive. El área y la pantalla activa se conservan al recargar.

## Decisiones pendientes de dirección creativa

- El ambiente azul/violeta continúa animándose suavemente, con ciclos un 20% más cortos que la versión inicial (velocidad un 25% mayor), según la indicación del usuario.
- Confirmar si una nueva obra debe comenzar con imagen neutra o si elegir una foto será parte obligatoria del alta.
- Sustituir la colección provisional cuando llegue el sistema definitivo de iconos.
