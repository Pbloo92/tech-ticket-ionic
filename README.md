# TechTicket FP

Aplicación Ionic + Angular Standalone para gestionar visualmente incidencias (tickets) mediante una API REST.

## Requisitos
- Node.js LTS y npm
- Ionic CLI (`npm install -g @ionic/cli`)
- Para Android: Android Studio y Android SDK

## Instalación y ejecución web
```bash
npm install
ionic serve
```

La aplicación consulta `https://jsonplaceholder.typicode.com/todos?_limit=15`.

## Arquitectura
- `src/app/core/services/ticket.service.ts`: Store centralizado. Mantiene el estado privado con Angular Signals y expone `computed` de solo lectura.
- `src/app/features/ticket-dashboard/`: vista standalone, filtro local reactivo y presentación de estados asíncronos.
- `src/app/app.routes.ts`: ruta principal.

## Android con Capacitor
Después de instalar dependencias:
```bash
ionic build
npx cap add android
npx cap sync android
npx cap open android
```
Para ejecutar en un emulador o dispositivo conectado:
```bash
npx cap run android
```
La carpeta `android/` se genera con `npx cap add android`; no se incluye en este ZIP porque depende del entorno Android instalado.

## Decisiones de diseño
- **Store / variante MVVM:** el servicio es la fuente única de verdad; la vista consume señales de solo lectura.
- **SRP:** el servicio gestiona datos y estado; el componente presenta información y captura eventos.
- **OCP:** la vista deriva datos mediante `computed`, sin mutar el estado interno del servicio.
- **DIP:** `HttpClient` se obtiene mediante `inject()` y el servicio se inyecta en el componente.
