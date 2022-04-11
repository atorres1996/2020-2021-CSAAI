

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

var filasLadrillo = 5;
var columnasLadrillo = 10;
var anchoLadrillo = 60;
var alturaLadrillo = 20;
var huecosLadrillo = 5;
var ladrillos = [];
var marginTop = 10;
var marginLeft = 5;

for(c=0; c<columnasLadrillo; c++) {
    ladrillos[c] = [];
    for(f=0; f<filasLadrillo; f++) {
        ladrillos[c][f] = { x: 0, y: 0, estado: 1 };
    }
}

function dibujoladrillo() {
    for(c=0; c<columnasLadrillo; c++) {
        for(f=0; f<filasLadrillo; f++) {
            if(ladrillos[c][f].estado == 1) {
                var ladrilloX = (c*(anchoLadrillo+huecosLadrillo))+marginLeft;
                var ladrilloY = (f*(alturaLadrillo+huecosLadrillo))+marginTop;
                ladrillos[c][f].x = ladrilloX;
                ladrillos[c][f].y = ladrilloY + 30;
                ctx.beginPath();
                ctx.rect(ladrilloX, ladrilloY + 30, anchoLadrillo, alturaLadrillo);
                ctx.fillStyle = "orange";
                ctx.fill();
                ctx.closePath();
            }
        }
    }
}

function choque() {
    for(c=0; c<columnasLadrillo; c++) {
        for(f=0; f<filasLadrillo; f++) {
            var b = ladrillos[c][f];
            if(b.estado == 1) {
                if(x > b.x && x < b.x+anchoLadrillo && y > b.y && y < b.y+alturaLadrillo) {
                    vely = -vely;
                    b.estado = 0;
                    puntuacion++;
                    if(puntuacion == filasLadrillo*columnasLadrillo) {
                        alert("Congratulations, YOU WIN!");
                        document.location.reload();
                    }
                }
            }
        }
    }
}


var numVidas = 3;
var puntuacion = 0;

//Función para mostrar las vidas
function vida(){
    ctx.fillStyle = "white";
    ctx.fillText("Lifes:" +numVidas, 10, 18);
    ctx.font = "20px Arial";
}

//Función para mostrar la puntuación
function puntos(){
    ctx.fillStyle = "white";
    ctx.fillText("Score:" + puntuacion, 920, 18);
    ctx.font = "20px Arial"; 
}

function space() {
    ctx.font = "16px Arial";
    ctx.fillStyle = "black";
    ctx.fillText("Pulsa espacio para comenzar", canvas.width/2-120, canvas.height/2);
}

function dibuja (){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    dibujoladrillo();
    dibujopelota();
    dibujoraqueta();
    puntos();
    vida();
    if (movBola == false){
        space();
    }
    choque();


    if (x >= (canvas.width - radio) || x <= radio) {
        velx = -velx;
    }
    if (y <= radio) {
         vely = -vely;
    }
    else if (y >= (canvas.height - radio)){
        if(x > posicionRaqueta && x < posicionRaqueta + anchoRaqueta) {
            if(y= y- alturaRaqueta){
                vely = -vely;
            }
        }
        else {
            vidas--;
            
            movBola = false;
            if(!vidas) {
                alert("GAME OVER");
                document.location.reload();
            }
            else {
                x = canvas.width/2;
                y = canvas.height-30;
                velx = 1;
                vely = -2;
                posicionRaqueta = (canvas.width-anchoRaqueta)/2;
            }
        }
    }

    if (pulsarDerecha && posicionRaqueta < canvas.width-anchoBase) {
        posicionRaqueta = posicionRaqueta + 5;
    }
    else if (pulsarIzquierda && posicionRaqueta > 0) {
        posicionRaqueta = posicionRaqueta - 5;
    }

    if (movBola == true){
        x = x + velx;
        y = y + vely;
    }
}

setInterval(dibuja, 5)