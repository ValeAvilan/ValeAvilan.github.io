import http from 'http';
import url from 'url';

const servidor = http.createServer((req, res) => {
  console.log('Alguien me mandó una solicitud');
  
  //console.log(req); //para que salgan los datos en la terminal. MANDA UNA SERIE DE DATOS QUE SON LOS QUE TIENE MI SOLICITUD
  const urlProcesada = url.parse(req.url, true); //console.log(urlProcesada);
  const queryParams = urlProcesada.query; 
  console.log(queryParams.x); //este es un parametro que recibe del request. ESE PUEDE SER EL PRODUCTO QUE SE QUIERE COMPRAR
  console.log(queryParams.y); //nueva variable que recibe un parámetro

  res.writeHead(200, { 'Content-Type': 'text/plain' });
  if(queryParams.x==1){
    res.end('x es igual a uno');
  }
  if(queryParams.x==2){
    res.end('x es igual a 2 dos');
  }
  res.end('Quiero la libertad de esculpir y cincelar mi propio rostro, de detener la hemorragia con cenizas, de crear mis propios dioses a partir de mis entrañas...\n');
});

const puerto = 1984;

servidor.listen(puerto, () => {
  console.log(`Servidor escuchando en el puerto ${puerto}`);
});
