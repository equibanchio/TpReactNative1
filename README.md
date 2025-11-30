# MiniBlog

Requisitos Previos

- Node.js (v14 o superior)
- npm (incluido con Node.js)
- Expo CLI opcional (puedes usar `npx expo` si no está instalado globalmente)

Instalación

1. Abrir una terminal y situarse en el directorio del proyecto:

2. Instalar dependencias:

npm install

npm install @reduxjs/toolkit react-redux


Ejecución

npx expo start -c

o

npm start

Descripción breve:

`MiniBlog` es una app Expo (ejemplo) que lista publicaciones desde JSONPlaceholder y permite crear nuevas publicaciones de prueba.

Funcionalidades principales

- Listar publicaciones (GET `https://jsonplaceholder.typicode.com/posts?_limit=10`).
- Crear publicaciones (POST `https://jsonplaceholder.typicode.com/posts`).
- Muestra estados de carga y error.
- El botón de publicar se desactiva mientras se envía y muestra 'Enviando...'.
- Los posts nuevos aparecen al inicio de la lista.

Archivos clave:

- `src/features/posts/postsSlice.js` — thunks `fetchPosts` y `addPost`, estado `items`, `fetchStatus`, `fetchError`, `addStatus`, `addError`.
- `src/screens/HomeScreen.js` — pantalla principal con la lista y el formulario.
- `src/store/store.js` — configuración de Redux.
