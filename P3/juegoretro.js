console.log("Ejecutando JS...");

const canvas = document.getElementById("canvas");
canvas.width = 800;
canvas.height = 500;

const ctx = canvas.getContext("2d");

/*variables de la pelota*/
var radiopelota = 8;
var x = canvas.width/2;
var y = canvas.height - 20;
var velx = 1;
var vely = 2;
var movPelota = false;

/*funcion de la pelota*/
function dibujopelota() {
    ctx.beginPath();    
    ctx.arc(x, y, radiopelota, 0, 2 * Math.PI);
    ctx.fillStyle = 'black';
    ctx.fill()
    ctx.closePath();
}
    
/*que se comience a mover la pelota al dar al espacio*/
window.onkeydown = (e) => {
    if (e.key == ' ') {
        movPelota = true;
    }
}

/*variables de la raqueta*/
var pulsarDerecha = false;
var pulsarIzquierda = false;
var alturaRaqueta = 10;
var anchoRaqueta = 75;
var posicionRaqueta = (canvas.width - anchoRaqueta)/2;

/*funcion de la raqueta*/
function dibujoraqueta () {
    ctx.beginPath();
    ctx.rect(posicionRaqueta, canvas.height-alturaRaqueta, anchoRaqueta, alturaRaqueta);
    ctx.fillStyle = "red";
    ctx.fill();
    ctx.closePath();
}

/*movimiento de la raqueta*/
document.addEventListener("keydown", Pulsar, false);
document.addEventListener("keyup", Soltar, false);

function Pulsar (e) { 
    if (e.keyCode == 39) {
        pulsarDerecha = true;
    }
    else if (e.keyCode == 37) {
        pulsarIzquierda = true;
    }
}
function Soltar (e) { 
    if (e.keyCode == 39) {
        pulsarDerecha = false;
    }
    else if (e.keyCode == 37) {
        pulsarIzquierda = false;
    }
}


/*tengo que continuar con los ladrillos:
   -def variables
   -dibujar ladrillos
   -funcion colision pelota ladrillo   */
