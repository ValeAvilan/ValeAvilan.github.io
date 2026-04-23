//http sirve para levantar un servidor(lcoalHost), recibir solicitudes del navegador y enviar respuestas. Sin http no podria hacer el servidor
import http from 'http';
//fs sirve para leer y guardar archivos (.html, ,.txt, .json) y modificar contenido
import fs from 'fs'; //leer un archivo html y que lo puedas mostrar en servidor


    //Esta función deberá mostrar deberá mostrar una página HTML 
    //con la bienvenida a tu proyecto
    function darBienvenida(req, res) {
       //Agrega lo mínimo necesario en bienvenida.html
      fs.readFile('bienvenida.html', 'utf8', (error, data) => {
        if (error) {
           //500 significa error interno del servidor (no encontró el archivo, fallo en el code, problema en lectura)
          res.writeHead(500, { 'Content-Type': 'text/plain' });
          res.end('Oh no!!!!');
          return;
        }
        //200 significa que todo salió bien (encontró el archivo, lo pudo leer y lo mandó al navegador)
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(data);
    });
    }

    //Esta función deberá enviar un json con los datos de los usuarios
    function getUsuarios(req, res) {
        //Agregar otro usuario, haciendo un arreglo de usuarios y agregando otro
        //Esto representa un objeto JSON de un usuario
        const usuarios = [{ 
            "nombre": "Mike",
            "saldo": "60",
          },
          {
             "nombre": "Valeria",
            "saldo": "30",
          }
        ];  
      res.writeHead(200, { 'Content-Type': 'application/json' });
      
    // JSON.stringify convierte un objeto de JavaScript en texto (formato JSON)
    // Es necesario porque res.end solo puede enviar texto, no objetos directamente
      res.end(JSON.stringify(usuarios)); //aqui enviamos para mostrar usuarios
    }

 
  
    function mostrarPerfil(req, res) {
        fs.readFile('perfil.html', 'utf8', (error, data) => { //busca el archivo perfil.html
            if (error) {
              res.writeHead(500, { 'Content-Type': 'text/plain' }); //si no lo encuentra manda 500 y oh no
              res.end('Oh no!!!!');
              return;
            }
            res.writeHead(200, { 'Content-Type': 'text/html' }); //si sale bien, manda el html
            res.end(data);
        });
      }

      function mostrarMovimientos(req, res) {
        //Construye una página básica movimientos.html
        fs.readFile('movimientos.html', 'utf8', (error, data) => { //lee el html
            if (error) {
              res.writeHead(500, { 'Content-Type': 'text/plain' });
              res.end('Oh no!!!!');
              return;
            }
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.end(data);
        });
      }

    //Esta función deberá enviar un json con los datos de las movimientos
    function getMovimientos(req, res) {
      //crear un arreglo de los movimientos
      const movimientos=[
        { "id": 1,
          "tipo":"gasto",
          "monto":500,
          "fecha":"16/04/2026"
        },

        {"id": 1,
          "tipo":"ingreso",
          "monto":1400,
          "fecha":"20/04/2026"
        },

        { "id": 1,
          "tipo":"gasto",
          "monto":200,
          "fecha":"21/04/2026"
        },
      ]
    //lo que va en el content es el json
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(movimientos)); //aqui se convierte a texto y se manda el arreglo movimientos
    }

    function documCreateServer(req,res){
        res.writeHead(200,{'Const-Type':'text/plain'});
        res.end('// https://nodejs.org/api/http.html#httpcreateserveroptions-requestlistener');
    }

    function equipo(req,res){
      fs.readFile('equipo.html', 'utf8', (error, data) => { //busca el archivo equipo.html
            if (error) {
              res.writeHead(500, { 'Content-Type': 'text/plain' }); //si no lo encuentra manda 500 y oh no
              res.end('Oh no!!!!');
              return;
            }
            res.writeHead(200, { 'Content-Type': 'text/html' }); //si sale bien, manda el html
            res.end(data);
        });
    }
    function Alvarito(req,res){ //con esto equipo puede hacer otra solicitud al servidor, que es /Alvarito
      fs.readFile('alvarito.jpeg', (error, data) => { //lee y llama a la foto alvarito
      if (error) {
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        res.end('Error al cargar imagen');
        return;
      }

      res.writeHead(200, { 'Content-Type': 'image/jpeg' });
      res.end(data);
      });
    }
    function opinion(req,res){
      fs.readFile('opinion.html', 'utf8', (error, data) => { //busca el archivo equipo.html
            if (error) {
              res.writeHead(500, { 'Content-Type': 'text/plain' }); //si no lo encuentra manda 500 y oh no
              res.end('Página no encontrada!');
              return;
            }
            res.writeHead(200, { 'Content-Type': 'text/html' }); //si sale bien, manda el html
            res.end(data);
        });
    }
    function limite_credito(req,res){
      const limites=[
        {
          "nombre": "Valeria",
          "limite_total": 30000,
          "limite_usado": 3000, 
          "limite_disponible": 27000 
        },
        {
          "nombre": "Mike",
          "limite_total": 10000,
          "limite_usado": 9000, 
          "limite_disponible": 1000
        },
        {
          "nombre": "Alvaro",
          "limite_total": 90000,
          "limite_usado": 120, 
          "limite_disponible": 89880
        }]
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(limites)); 
    }

    function get_pagos(req,res){
      const pagos = [{ 
        "id": "pago_001", 
        "usuario": "Valeria", 
        "monto": 200, 
        "fecha": "2026/04/20", 
        "status": "completado" },

        {"id": "pago_002", 
        "usuario": "Alvaro", 
        "monto": 300, 
        "fecha": "2026/04/20", 
        "status": "completado" },

        {"id": "pago_003", 
        "usuario": "Mike", 
        "monto": 500, 
        "fecha": "2026/04/20", 
        "status": "completado" }
    ];
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(pagos));
    }

    function manejarRuta404(req, res) {
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      //mensaje "divertido"
      res.end('ESTO NO SIRVE, VETE!!!');
    }

    function getPrestamos(req, res) {
            const prestamos = [
            {
                usuario: "Valeria",
                monto: 5000,
                plazo: 12,
                semanas_pagadas: 4,
                status: "aprobado"
            },
            {
                usuario: "Alvaro",
                monto: 3000,
                plazo: 8,
                semanas_pagadas: 8,
                status: "pendiente"
            }
            ];

        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(prestamos));
    }

    function solicitarPrestamo(req, res) {
        fs.readFile('prestamo.html', 'utf8', (error, data) => {

        if (error) {
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        res.end('Error al cargar la solicitud de préstamo');
        return;
        }

        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(data);
    });
    }

    function getEstadoPrestamo(req, res) {
        const prestamos = [
            {
            loan_id: "loan_001",
            usuario: "Valeria",
            monto: 5000,
            plazo: 12,
            semanas_pagadas: 4,
            semanas_restantes: 8,
            status: "activo"
            },
            {
            loan_id: "loan_002",
            usuario: "Alvaro",
            monto: 3000,
            plazo: 8,
            semanas_pagadas: 8,
            semanas_restantes: 0,
            status: "pagado"
            }
        ];
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(prestamos));
    }

    function mostrarEstadoPrestamo(req, res) {
        fs.readFile('estado_prestamo.html', 'utf8', (error, data) => {
            if (error) {
            res.writeHead(500, { 'Content-Type': 'text/plain' });
            res.end('Error al cargar el estado del préstamo');
            return;
            }
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.end(data);
        });
    }

    function mostrarLimiteCredito(req, res) {
        fs.readFile('limite-credito.html', 'utf8', (error, data) => {
            if (error) {
            res.writeHead(500, { 'Content-Type': 'text/plain' });
            res.end('Error al cargar el estado del préstamo');
            return;
            }
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.end(data);
        });
    }

    // api/compras
    function getCompras(req, res) {
        const compras = [
            { id: "compra_001", usuario: "Valeria", comercio: "Amazon", monto: 1500, cuotas: 3, fecha: "2026-04-15" },
            { id: "compra_002", usuario: "Alvaro", comercio: "Liverpool", monto: 5000, cuotas: 6, fecha: "2026-04-10" },
            { id: "compra_003", usuario: "Mike", comercio: "Rappi", monto: 350, cuotas: 1, fecha: "2026-04-21" }
        ];
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(compras));
    }

    function mostrarCompras(req, res) {
        fs.readFile('compras.html', 'utf8', (error, data) => {
            if (error) {
            res.writeHead(500, { 'Content-Type': 'text/plain' });
            res.end('Error al cargar el estado del préstamo');
            return;
            }
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.end(data);
        });
    }
    function mostrarPagos(req, res) {
      fs.readFile('pagos.html', 'utf8', (error, data) => {
        if (error) {
          res.writeHead(500, { 'Content-Type': 'text/plain' });
          res.end('Error al cargar pagos.html');
          return;
        }

        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(data);
      });
    }
    // api/score-credito
    function getScoreCredito(req, res) {
        const scores = [
            { usuario: "Valeria", score: 720, nivel: "bueno", ultima_actualizacion: "2026-04-01" },
            { usuario: "Alvaro", score: 580, nivel: "regular", ultima_actualizacion: "2026-04-01" }
        ];
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(scores));
    }
    function mostrarScoreCredito(req, res) {
        fs.readFile('score-credito.html', 'utf8', (error, data) => {
            if (error) {
            res.writeHead(500, { 'Content-Type': 'text/plain' });
            res.end('Error al cargar el estado del préstamo');
            return;
            }
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.end(data);
        });
    }

    //incluye el enlace a la documentación de createServer
    const servidor = http.createServer((req, res) => {
      const url = req.url;

      if (url === '/') {
        darBienvenida(req, res);
      } else if (url === '/api/usuarios') {
        getUsuarios(req, res);
      } else if (url === '/api/movimientos') {
        getMovimientos(req, res);
      }  
      else if (url === '/movimientos') {
        mostrarMovimientos(req, res);
      } 
      else if (url === '/perfil') { //con esta va a ir a mostrar perfil y va a arrojar el perfil.html
        mostrarPerfil(req, res);
      }
      else if(url==='/documentacionCreateServer'){
        documCreateServer(req,res);
        // https://nodejs.org/api/http.html#httpcreateserveroptions-requestlistener
      }
      else if(url==='/equipo'){
        equipo(req,res);
      }
      else if (url === '/Alvarito') {
        Alvarito(req,res);
    }
      else if (url === '/opinion') {
        opinion(req,res);
    }
    else if(url==='/api/limite_credito'){
      limite_credito(req,res);
    }
    else if(url==="/api/pagos"){
      get_pagos(req,res);
    }    
    else if(url==="/api/prestamo"){
      getPrestamos(req,res);
    }  
    else if(url==='/solicitarPrestamo'){
      solicitarPrestamo(req,res);
    }
    else if(url==='/api/estadoPrestamo'){
      getEstadoPrestamo(req,res);
    }
    else if(url==='/mostrarEstadoPrestamo'){
      mostrarEstadoPrestamo(req,res);
    }
      else if (url === '/limite_credito') {
        mostrarLimiteCredito(req, res);
      }
      else if (url === '/pagos') {
        mostrarPagos(req, res);
      }
      else if (url === '/api/compras') {
        getCompras(req, res);
      }
      else if (url === '/compras') {
        mostrarCompras(req, res);
      }
      else if (url === '/api/score-credito') {
        getScoreCredito(req, res);
      }
      else if (url === '/score-credito') {
        mostrarScoreCredito(req, res);
      }
    else {
        manejarRuta404(req, res);
    }});

    const puerto = 1984;
    servidor.listen(puerto, () => {
      console.log(`Servidor escuchando en el puerto ${puerto}`);
    });

    //Importante
    //En esta actividad deberás agregar en miarchivo.html un enlace a servidor.js y al resto de los html