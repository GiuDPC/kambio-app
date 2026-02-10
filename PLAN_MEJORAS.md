# KambioApp - Guia Completa

## Estado del Proyecto

### Frontend (React Native / Expo)

- [x] Supabase Auth con Magic Link
- [x] AuthScreen pantalla de login
- [x] useAuth hook de autenticacion
- [x] Variables de entorno (.env)
- [x] App.tsx con flujo de autenticacion

### Backend (Express / TypeScript)

- [x] Migrado de JavaScript a TypeScript
- [x] Web scraping BCV con Cheerio
- [x] API Binance P2P
- [x] Historial con archivos JSON
- [x] Cache en memoria con polling cada 15 min
- [x] Archivos duplicados eliminados

---

## Estructura Final

```
KambioApp/
├── .env                         # Variables Supabase
├── App.tsx                      # Punto de entrada con auth
├── src/
│   ├── screens/
│   │   ├── AuthScreen.tsx       # Login con Magic Link
│   │   ├── DashboardScreen.tsx  # Tasas de cambio
│   │   ├── CalculatorScreen.tsx # Calculadora
│   │   ├── HistoryScreen.tsx    # Historial
│   │   └── AlertsScreen.tsx     # Alertas
│   ├── services/
│   │   ├── supabase.ts          # Cliente Supabase
│   │   └── api.ts               # API de tasas
│   ├── hooks/
│   │   ├── useAuth.ts           # Hook autenticacion
│   │   ├── useRates.ts          # Hook tasas
│   │   ├── useHistory.ts        # Hook historial
│   │   └── useClipboard.ts      # Hook clipboard
│   └── components/
│       └── ...
└── server/
    ├── src/
    │   ├── index.ts             # Servidor Express
    │   └── services/
    │       ├── bcv.ts           # Scraping BCV
    │       ├── binance.ts       # API Binance
    │       └── history.ts       # Historial JSON
    ├── tsconfig.json
    └── package.json
```

---

## Como Probar en Android Studio

### Paso 1: Abrir emulador

1. Abre **Android Studio**
2. Click en **Device Manager** (icono de telefono, barra lateral derecha)
3. Si no tienes emulador: Click **Create Device** → Pixel 6 → Next → API 33 → Finish
4. Click el boton **Play** (triangulo verde) para encender el emulador

### Paso 2: Backend (ya corriendo)

```bash
cd c:\Users\Giuseppe\Desktop\Proyectoso\KambioApp\server
npm run dev
# Debe mostrar: Servidor: http://localhost:3000
```

### Paso 3: App Expo (ya corriendo)

```bash
cd c:\Users\Giuseppe\Desktop\Proyectoso\KambioApp
npx expo start --android
```

### Paso 4: Testing

1. **SplashScreen** aparece por 2-3 segundos
2. **AuthScreen** aparece (formulario de email)
3. Escribe tu email real
4. Click "Enviar Magic Link"
5. Revisa tu correo, click en el link
6. La app muestra las **tabs normales**

### Si el Magic Link no funciona en emulador:

El emulador no puede abrir links de email directamente. Alternativas:

- Usa **Expo Go** en tu telefono fisico (escanea QR)
- O temporalmente comenta la verificacion de auth en App.tsx para probar el resto

---

## Generar APK

### Opcion 1: Con EAS Build (recomendado)

```bash
cd c:\Users\Giuseppe\Desktop\Proyectoso\KambioApp

# Login en Expo (si no lo has hecho)
npx eas login

# Generar APK
npx eas build -p android --profile preview
```

### Opcion 2: Build local

```bash
npx eas build -p android --profile preview --local
```

La APK se genera en la nube y te dan un link de descarga.

---

## Subir a GitHub

```bash
cd c:\Users\Giuseppe\Desktop\Proyectoso\KambioApp

# Si no tienes repo, crealo en github.com primero

git add .
git commit -m "feat: Supabase auth, backend TypeScript migration"
git remote add origin https://github.com/TU-USUARIO/kambio-app.git
git push -u origin main
```

## Subir a GitLab

```bash
# Agregar segundo remote
git remote add gitlab https://gitlab.com/TU-USUARIO/kambio-app.git
git push gitlab main
```

### Ver tus remotes:

```bash
git remote -v
# origin  → GitHub
# gitlab  → GitLab
```

---

## Para la Entrevista

### TypeScript

> "Migre el backend de JavaScript a TypeScript. Defini interfaces para tipar las respuestas de las APIs y los datos del historial. Esto previene errores en runtime."

### Supabase

> "Integre autenticacion con Supabase usando Magic Links. El usuario ingresa su email, recibe un link de acceso, y la sesion se persiste en AsyncStorage."

### Web Scraping

> "El backend hace scraping del BCV con Cheerio para obtener las tasas oficiales. Tambien consume la API P2P de Binance para la tasa del mercado paralelo."

### Arquitectura

> "La app usa React Native con Expo, React Query para cache de datos, y un backend Express en TypeScript desplegado en Render."
