import express from "express";
import path from "path";
import mysql from "mysql2" //libreria para conectar a base de datos, tiene algunos protocolos de seguridad
import dotenv from "dotenv";

const app = express();
const puerto = 1984;

dotenv.config();

//BASE DE DATOS AIVEN MYSQL, primero se crea la base --> los datos para conectarla estan ahi
const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

//verificar que la base de datos si fue conectada
connection.connect(error=>{
    if(error) throw error;
    console.log("Conectada"); 
});

//crear tabla de las ofertas de kueski --> SOLO SE TIENE QUE HACER UNA VEZ
// const crearTablaSQL = `
//   CREATE TABLE ofertas (
//     id INT PRIMARY KEY AUTO_INCREMENT,
//     comercio VARCHAR(255),
//     descuento INT
//   );
// `;

//insertar datos a la base de datos --> TAMBIEN SOLO UNA VEZ
// const insertarOfertaSQL = `
//   INSERT INTO ofertas (comercio, descuento)
//   VALUES ('Amazon', 10);
// `;

// crear tabla
// connection.query(crearTablaSQL, (error) => {
//     //if (error) throw error;
//     //console.log("Tabla creada");

//     // insertar oferta
//     //connection.query(insertarOfertaSQL, (error) => {
//         //if (error) throw error;
//         //console.log("Oferta insertada");

//         // consultar tabla
//         connection.query(consultaSQL, (error, resultados) => {
//             if (error) throw error;
//             console.log(resultados);
//             connection.end();
//         });
//         });
//     });

//consulta que quiero hacer a la base de datos en una variable
const consultaSQL = `
  SELECT * FROM ofertas;
`;


// Express me parece más fácil que http porque no tengo que hacer tantos if/else.
// Con express puedo escribir directamente app.get('/ruta', ...).

// Permite que Express lea JSON si después usamos POST, PUT, etc.
app.use(express.json());

// Carpeta pública para imágenes, CSS o JS.
// Todo lo que esté en public se puede usar en HTML.
app.use(express.static("public"));

const usuarios = [
  { nombre: "Mike", saldo: 60 },
  { nombre: "Valeria", saldo: 30 }
];

const movimientos = [
  { id: 1, tipo: "gasto", monto: 500, fecha: "16/04/2026" },
  { id: 2, tipo: "ingreso", monto: 1400, fecha: "20/04/2026" },
  { id: 3, tipo: "gasto", monto: 200, fecha: "21/04/2026" }
];

const limites = [
  { nombre: "Valeria", limite_total: 30000, limite_usado: 3000, limite_disponible: 27000 },
  { nombre: "Mike", limite_total: 10000, limite_usado: 9000, limite_disponible: 1000 },
  { nombre: "Alvaro", limite_total: 90000, limite_usado: 120, limite_disponible: 89880 }
];

const pagos = [
  { id: "pago_001", usuario: "Valeria", monto: 200, fecha: "2026/04/20", status: "completado" },
  { id: "pago_002", usuario: "Alvaro", monto: 300, fecha: "2026/04/20", status: "completado" },
  { id: "pago_003", usuario: "Mike", monto: 500, fecha: "2026/04/20", status: "completado" }
];

const prestamos = [
  { usuario: "Valeria", monto: 5000, plazo: 12, semanas_pagadas: 4, status: "aprobado" },
  { usuario: "Alvaro", monto: 3000, plazo: 8, semanas_pagadas: 8, status: "pendiente" }
];

const estadoPrestamos = [
  { loan_id: "loan_001", usuario: "Valeria", monto: 5000, plazo: 12, semanas_pagadas: 4, semanas_restantes: 8, status: "activo" },
  { loan_id: "loan_002", usuario: "Alvaro", monto: 3000, plazo: 8, semanas_pagadas: 8, semanas_restantes: 0, status: "pagado" }
];

const compras = [
  { id: "compra_001", usuario: "Valeria", comercio: "Amazon", monto: 1500, cuotas: 3, fecha: "2026-04-15" },
  { id: "compra_002", usuario: "Alvaro", comercio: "Liverpool", monto: 5000, cuotas: 6, fecha: "2026-04-10" },
  { id: "compra_003", usuario: "Mike", comercio: "Rappi", monto: 350, cuotas: 1, fecha: "2026-04-21" }
];

const scores = [
  { usuario: "Valeria", score: 720, nivel: "bueno", ultima_actualizacion: "2026-04-01" },
  { usuario: "Alvaro", score: 580, nivel: "regular", ultima_actualizacion: "2026-04-01" }
];

// Rutas HTML
app.get("/", (req, res) => {
  res.sendFile(path.resolve("bienvenida.html"));
});

app.get("/perfil", (req, res) => {
  res.sendFile(path.resolve("perfil.html"));
});

app.get("/movimientos", (req, res) => {
  res.sendFile(path.resolve("movimientos.html"));
});

app.get("/equipo", (req, res) => {
  res.sendFile(path.resolve("equipo.html"));
});

app.get("/opinion", (req, res) => {
  res.sendFile(path.resolve("opinion.html"));
});

app.get("/solicitarPrestamo", (req, res) => {
  res.sendFile(path.resolve("prestamo.html"));
});

app.get("/mostrarEstadoPrestamo", (req, res) => {
  res.sendFile(path.resolve("estado_prestamo.html"));
});

app.get("/limite_credito", (req, res) => {
  res.sendFile(path.resolve("limite-credito.html"));
});

app.get("/pagos", (req, res) => {
  res.sendFile(path.resolve("pagos.html"));
});

app.get("/compras", (req, res) => {
  res.sendFile(path.resolve("compras.html"));
});

app.get("/score-credito", (req, res) => {
  res.sendFile(path.resolve("score-credito.html"));
});

// Nueva ruta para el árbol de la universidad
app.get("/arbol", (req, res) => {
  res.sendFile(path.resolve("arbol.html"));
});

// Rutas API
app.get("/api/usuarios", (req, res) => {
  res.status(200).json(usuarios);
});

app.get("/api/movimientos", (req, res) => {
  res.status(200).json(movimientos);
});

app.get("/api/limite_credito", (req, res) => {
  res.status(200).json(limites);
});

app.get("/api/pagos", (req, res) => {
  res.status(200).json(pagos);
});

app.get("/api/prestamo", (req, res) => {
  res.status(200).json(prestamos);
});

app.get("/api/estadoPrestamo", (req, res) => {
  res.status(200).json(estadoPrestamos);
});

app.get("/api/compras", (req, res) => {
  res.status(200).json(compras);
});

app.get("/api/score-credito", (req, res) => {
  res.status(200).json(scores);
});

app.get("/documentacionCreateServer", (req, res) => {
  res.send("https://nodejs.org/api/http.html#httpcreateserveroptions-requestlistener");
});
//get para que el usuario pueda ver la
app.get("/api/ofertas", (req, res) => {
  const consultaSQL = `
    SELECT * FROM ofertas;
  `;

  connection.query(consultaSQL, (error, resultados) => {
    if (error) {
      res.status(500).json({
        mensaje: "Error al consultar ofertas"
      });
      return;
    }

    res.status(200).json(resultados);
  });
});
// 404
app.use((req, res) => {
  res.status(404).send("ESTO NO SIRVE, VETE!!!");
});

app.listen(puerto, () => {
  console.log(`Servidor Express escuchando en http://localhost:${puerto}`);
});