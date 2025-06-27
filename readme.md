# Backend II - Proyecto Ecommerce (Coderhouse)

## ¿Qué incluye?
- CRUD de usuarios (alta, baja, edición, consulta)
- Contraseñas hasheadas con bcrypt
- Login con JWT y rutas protegidas usando Passport

## Instalación
1. Clonar el repo

2. Instalar dependencias:  
   `npm install`

3. Crear un archivo `.env` con:
    PORT=8080
    MONGODB_URI=mongodb://127.0.0.1:27017/class-zero
    JWT_SECRET=miclavesecretajwt

4. Levantar el servidor:
    `npm run dev`

## Uso rápido
- Crear usuario: `POST /api/users`
- Login: `POST /api/sessions/login`
- Ruta protegida: `GET /api/sessions/current` (requiere JWT en Authorization)

## Notas
- La base y las colecciones se crean automáticamente.


