# TP Integrador: App de Películas 🎬

Este es el proyecto integrador desarrollado para la materia **Desarrollo de Sistemas Web (Frontend)** del **IFTS 24**. Consiste en una aplicación SPA (Single Page Application) que consume la API de **TMDB (The Movie Database)** para mostrar un catálogo de películas y sus detalles.

---

## 🚀 Tecnologías y Herramientas

- **Angular 19** (Componentes Standalone, Rutas dinámicas y HttpClient)
- **Bootstrap 5** (Diseño responsive y componentes de interfaz)
- **RxJS** (Manejo de flujos asíncronos para consumo de APIs)
- **NodeJS Scripting** (Generación segura de variables de entorno a través de `.env`)

---

## 🛠️ Configuración e Instalación

Para poder correr este proyecto de forma local, necesitás seguir estos pasos para configurar tus credenciales de la API de TMDB.

### 1. Clonar el repositorio e instalar dependencias

```bash
npm install
```

### 2. Configurar variables de entorno

Creá un archivo `.env` en la raíz del proyecto (basado en tus credenciales de TMDB) con el siguiente formato:

```env
BASE_URL=https://api.themoviedb.org/3
BASE_ID_URL=https://api.themoviedb.org/3/movie
API_KEY=tu_api_key_aqui
ACCESS_TOKEN=tu_access_token_bearer_aqui
```

### 3. Generar la configuración de environments de Angular

Dado que Angular no maneja de forma nativa variables de entorno `.env` en el cliente, el proyecto cuenta con un script que lee el archivo `.env` y genera dinámicamente los archivos de configuración en `src/environments/`.

Ejecutá el siguiente comando para generarlos:

```bash
npm run load-env
```

*Nota: Este comando creará `environment.ts` y `environment.development.ts` dentro de `src/environments/` automáticamente.*

### 4. Iniciar el servidor de desarrollo

Una vez generadas las variables de entorno, podés levantar el servidor local:

```bash
npm start
```

Abrí tu navegador en [http://localhost:4200](http://localhost:4200) para ver la aplicación en funcionamiento.

---

## 📂 Estructura Principal del Código

El proyecto está organizado de la siguiente manera:

- `src/app/pages/`: Contiene las páginas principales de la aplicación (como `detalle`, encargada de mostrar la ficha técnica de una película mediante rutas dinámicas).
- `src/app/services/`: Contiene los servicios de Angular (ej. `detalle.service.ts`) encargados de encapsular las peticiones HTTP hacia la API de TMDB.
- `src/app/model/`: Definición de interfaces TypeScript para el tipado seguro de las respuestas de la API.
- `scripts/loadEnv.js`: Script de soporte en Node.js para inyectar credenciales del `.env` al flujo de compilación de Angular.
