import express from "express";

const app = express();

const compras = [
  {
    usuario: "Valeria",
    comercio: "Amazon",
    monto: 1500
  },

  {
    usuario: "Valeria",
    comercio: "Liverpool",
    monto: 3000
  },

  {
    usuario: "Mike",
    comercio: "Nike",
    monto: 1200
  }
];

// Ruta con parámetro
app.get("/api/compras/:usuario", (req, res) => {

  // Obtener el nombre del usuario desde la URL
  const usuarioBuscado = req.params.usuario;

  // Filtrar compras de ese usuario
  const comprasUsuario = compras.filter(
    compra => compra.usuario === usuarioBuscado
  );

  // Si no tiene compras
  if (comprasUsuario.length === 0) {

    res.status(404).json({
      mensaje: "Ese usuario no tiene compras"
    });

    return;
  }

  // Mostrar compras encontradas
  res.status(200).json(comprasUsuario);
});

app.listen(1984, () => {
  console.log("Servidor listo");
});