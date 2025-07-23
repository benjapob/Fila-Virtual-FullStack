# 🧾 Fila Virtual Full Stack / Virtual Queue Full Stack

Proyecto full stack que simula una fila virtual en tiempo real con un CRUD de turnos.  
Full stack project that simulates a real-time virtual queue with a CRUD for appointments.

Este proyecto usa el stack [MEAN](https://en.wikipedia.org/wiki/MEAN_(software_bundle)):  
This project uses the [MEAN](https://en.wikipedia.org/wiki/MEAN_(software_bundle)) stack:

- [**M**ongoose.js](http://www.mongoosejs.com) ([MongoDB](https://www.mongodb.com)) – base de datos / database
- [**E**xpress.js](http://expressjs.com) – backend
- [**A**ngular 2+](https://angular.io) – frontend
- [**N**ode.js](https://nodejs.org) – runtime

### 🛠️ Tecnologías adicionales / Additional tools
- [Angular CLI](https://cli.angular.io) – frontend tooling
- [Bootstrap](http://www.getbootstrap.com) – estilos / styling
- [Socket.io](https://socket.io) – comunicación en tiempo real / real-time communication
- [SweetAlert2](https://sweetalert2.github.io) – alertas / alert dialogs

---

## 📚 Tabla de Contenidos / Table of Contents
- [📦 Prerrequisitos / Prerequisites](#prerrequisitos--prerequisites)
- [🔧 Instalación / Installation](#instalación--installation)
- [🚀 Ejecutar la Aplicación / Run the App](#ejecutar-la-aplicación--run-the-app)
- [📸 Ejemplo / Example](#ejemplo-de-la-aplicación--app-example)
- [👨‍💻 Autor / Author](#autor--author)

---

## 📦 Prerrequisitos / Prerequisites

- **Node.js**: versión 14 o superior / v14 or higher
- **Angular**: versión 16.1.0 o superior / v16.1.0 or higher
- **MongoDB**: última versión / latest version
- **npm**: versión 6 o superior / v6 or higher
- Un editor como VS Code / A code editor like VS Code

---

## 🔧 Instalación / Installation

1. **Instalar Angular CLI (opcional)**  
   *Install Angular CLI (optional)*:
   ```bash
   npm i -g @angular/cli@16.1.0
   ```

2. **Instalar dependencias / Install dependencies**: 
   *Install Angular CLI (optional)*:
   ```bash
   npm install
   ```



## 🚀 Ejecutar la Aplicación / Run the App
- **Modo desarrollo / Development mode**:
   ```bash
   npm run dev
   ```
    Esto inicia el build de Angular, compila TypeScript y lanza el servidor Express.
    Runs Angular build, compiles TypeScript, and starts the Express server.

    Accede a la app en: http://localhost:4200
    Access the app at: http://localhost:4200

- **Modo producción / Production mode**:
   ```bash
   npm run prod
   ```
    Inicia la app optimizada en el puerto: http://localhost:3000
    Starts the optimized app at: http://localhost:3000

## 📸 Ejemplo de la Aplicación / App Example

En la sección `Appointments` puedes crear, editar o borrar turnos.
In the `Appointments` section, you can create, edit, or delete appointments.

En `Real Time Appointments`, puedes ver cómo se actualiza la fila en tiempo real.
In `Real Time Appointments`, you can see the queue update in real-time.

**GIFs**:

<img client="client/assets/agregar.gif"/>

<img client="client/assets/editar.gif"/>

## 👨‍💻 Autor / Author
* [Benjamin Poblete](https://github.com/benjapob)