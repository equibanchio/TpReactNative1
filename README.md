# MiniBlog

Requisitos Previos

- Node.js (v14 o superior)
- npm (incluido con Node.js) o yarn
- Expo CLI (opcional, se puede usar `npx expo` si no está instalado globalmente)

Instalación

1. Abrir una terminal y dirigirse al directorio del proyecto:

2. Instalar dependencias:

npm install

Ejecución

- Iniciar el servidor de desarrollo (recomendado):

npx expo start -c
# o

npm start

- Recomendación: usar Expo Go en tu dispositivo móvil para probar la app rápidamente.

Descripción breve de la app

MiniBlog es una pequeña app de ejemplo que muestra una lista de publicaciones, permite crear nuevas publicaciones y muestra mensajes de estado.

Funcionalidades principales

- Listar publicaciones (se cargan desde una API pública). Se muestra "Cargando publicaciones..." mientras carga.
- Crear una nueva publicación: el botón "Publicar" se deshabilita mientras se envía y muestra "Enviando...".
- Manejo de errores con mensajes claros: "Error al obtener publicaciones" y "Error al crear publicación".
- Los posts nuevos aparecen primero en la lista.

