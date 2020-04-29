let http = require('http');
let fs = require('fs');
let host = '127.0.0.1';
let port = '3000';
const {parse} = require ('querystring'); 

const server = http.createServer((req, res) => {
    if (req.method === 'POST') {
        collectData(req, result => {
            console.log(result);
            /*
            let cel= result.celular.toString();
            let carCel= cel.split();
            console.log(carCel.length);
            let msg= result.mensaje.toString();
            let carMsg= msg.split();
            console.log(carMsg.length);
            if(carCel.length > 9 || carCel.length < 9 && carMsg.length < 150){
                    res.end(`<!DOCTYPE html>`);
            }else{*/

            res.end(`
            <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Edwin Corp</title>   
    <link rel="icon" type="image/png" href="https://image.flaticon.com/icons/png/512/625/625169.png"/>
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
</head>
<body>

        <div class="container my-5">
                <div class="card" style="width: 18rem;">
                        <div class="card-body">
                          <h5 class="card-title">Datos registrados</h5>
                          <p class="card-text"><b>Apellidos: </b>${result.apellido} </p>
                          <p class="card-text"><b>Nombres:</b> ${result.nombre} </p>
                          <p class="card-text"> <b>Correo Electrónico: </b> ${result.correo} </p>
                          <p class="card-text"><b>Celular: </b>${result.celular} </p>
                          <p class="card-text"><b>Fecha de nacimiento:</b> ${result.fecha}  </p>
                          <p class="card-text"><b>Mensaje:</b> ${result.mensaje} </p>
                          <div class="alert alert-success" role="alert">
                                Muy pronto nos pondremos en contacto
                              </div>
                          <a href="/bienvenida" class="btn btn-primary btn-block">Regresar</a>
                        </div>
                      </div>
                      
        </div>
</body>
</html>
        `);
            

        });
    } 
    else {
        let url = req.url;
        if(url == "/bienvenida"){
            res.writeHead(200,{'Content-Type' : 'text/html'});
    
            fs.readFile('./bienvenida.html',function(error, html){
                res.write(html);
                res.end();
            });
        }else if(url == "/nosotros"){
            res.writeHead(200,{'Content-Type' : 'text/html'});
        
                fs.readFile('./nosotros.html',function(error, html){
                    res.write(html);
                    res.end();
                });
            }else if(url == "/servicios"){
                res.writeHead(200,{'Content-Type' : 'text/html'});
    
            fs.readFile('./servicios.html',function(error, html){
                res.write(html);
                res.end();
            });
        }else if(url == "/contacto"){
            res.writeHead(200,{'Content-Type' : 'text/html'});
        
                fs.readFile('./contacto.html',function(error, html){
                    res.write(html);
                    res.end();
                });
            }else{
                res.writeHead(200,{'Content-Type' : 'text/html'});
            
                    fs.readFile('./error.html',function(error, html){
                        res.write(html);
                        res.end();
                    });
                }
    }
});
server.listen(port,host,()=>{
    console.log("Este server está corriendo en: "+host+":"+port);
});

function collectData(request, callback) {
    const FORM_URLENCODED = 'application/x-www-form-urlencoded';
    if(request.headers['content-type'] === FORM_URLENCODED) {
        let body = '';
        request.on('data', chunk => {
            body += chunk.toString();
        });
        request.on('end', () => {
            callback(parse(body));
        });
    }
    else {
        callback(null);
    }
}