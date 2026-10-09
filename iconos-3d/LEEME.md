# Sistema de iconos 3D · EONLINK

Esta colección contiene 20 PNG de alta resolución con fondo transparente. Está pensada para tarjetas y botones grandes del prototipo EONLINK de octubre de 2026.

## Lenguaje visual

- Objetos reconocibles y colores naturales: carpeta amarilla, dinero verde, señales azules, aprobaciones verdes.
- Volumen amable, bordes redondeados, materiales satinados, vista isométrica elevada e iluminación suave.
- Cada icono representa **una acción o destino**. El texto del botón siempre acompaña al icono; la imagen no sustituye la etiqueta.
- Los elementos financieros y documentos comparten las mismas formas básicas para crear continuidad entre pantallas.

## Uso por pantalla

| Área | Iconos sugeridos |
| --- | --- |
| Navegación principal | `resumen`, `obras`, `archivos`, `cotizaciones`, `asistente`, `movimientos`, `caja-chica`, `gastos` |
| Resumen de obras | `obras`, `avance-obra`, `pendientes`, `archivos`, `cotizaciones` |
| Acciones de obras | `nueva-obra`, `crear-cotizacion`, `autorizar-cotizacion`, `comprobantes` |
| Resumen financiero | `cuentas`, `movimientos`, `gastos`, `dinero-asignado`, `caja-chica` |
| Acciones financieras | `registrar-gasto`, `revisar-movimiento`, `comprobantes` |
| Asistente y precios | `asistente`, `precios`, `asistente-precios` |

## Tamaños recomendados

En tarjetas grandes: 72–112 px CSS, con un área despejada. En accesos secundarios amplios: 56–72 px. Mantener `object-fit: contain` y la relación de aspecto original; algunos PNG no son cuadrados. Evitar usarlos en controles pequeños de 16–24 px, donde conviene conservar los iconos lineales existentes.

El fondo transparente permite colocarlos directamente sobre las superficies oscuras del prototipo. Cada archivo tiene más de 1.100 px en su lado corto, suficiente para pantallas de alta densidad.

## Cobertura

El conjunto cubre los destinos y acciones grandes visibles en el HTML entregado. Algunos flujos del prototipo son demostrativos; los nombres de los iconos describen la intención visual y no implican que exista una integración activa.
