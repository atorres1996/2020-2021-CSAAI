
console.log("Ejecutando JS...");

const canvas = document.getElementById("canvas");
canvas.width = 800;
canvas.height = 500;

const ctx = canvas.getContext("2d");


let radio = 9;
let x = canvas.width/2;
let y = canvas.height-30;
let velx = 1;
let vely = -2;

let alturaRaqueta = 15;
let anchoRaqueta = 80;
let posicionRaqueta = (canvas.width-anchoRaqueta)/2;
var pulsarDerecha = false;
var pulsarIzquierda = false;

var movPelota = false;

var filasLadrillo = 6;
var columnasLadrillo = 10;
var anchoLadrillo = 60;
var alturaLadrillo = 20;
var huecoLadrillo = 15;
var marginTop = 10;
var marginLeft = 8;

var puntuacion = 0;
var vidas = 3;

document.addEventListener("keydown", Pulsar, false);
document.addEventListener("keyup", Soltar, false);

var ladrillos = [];
for(c=0; c<columnasLadrillo; c++) {
    ladrillos[c] = [];
    for(f=0; f<filasLadrillo; f++) {
        ladrillos[c][f] = { x: 0, y: 0, estado: 1 };
    }
}

window.onkeydown = (e) => {
    if (e.key == ' ') {
        movPelota = true;
    }
}
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

function dibujarpelota() {
    ctx.beginPath();    
    ctx.arc(x, y, radio, 0, 2 * Math.PI);
    ctx.fillStyle = 'grey';
    ctx.fill()
    ctx.closePath();
}

function dibujarraqueta () {
    ctx.beginPath();
    ctx.rect(posicionRaqueta, canvas.height-alturaRaqueta, anchoRaqueta, alturaRaqueta);
    ctx.fillStyle = "black";
    ctx.fill();
    ctx.closePath();
}
function dibujarladrillo() {
    for(c=0; c<columnasLadrillo; c++) {
        for(f=0; f<filasLadrillo; f++) {
            if(ladrillos[c][f].estado == 1) {
                var ladrilloX = (c*(anchoLadrillo+huecoLadrillo))+marginLeft;
                var ladrilloY = (f*(alturaLadrillo+huecoLadrillo))+marginTop;
                ladrillos[c][f].x = ladrilloX;
                ladrillos[c][f].y = ladrilloY + 30;
                ctx.beginPath();
                ctx.rect(ladrilloX, ladrilloY + 30, anchoLadrillo, alturaLadrillo);
                ctx.fillStyle = "blue";
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
                        alert("HAS GANADO, ENHORABUENA!");
                        document.location.reload();
                    }
                }
            }
        }
    }
}
function puntos() {
    ctx.font = "16px Arial";
    ctx.fillStyle = "black";
    ctx.fillText("Puntos: "+puntuacion, 8, 20);
}
function vida() {
    ctx.font = "16px Arial";
    ctx.fillStyle = "black";
    ctx.fillText("Vidas: "+vidas, canvas.width-65, 20);
}
function space() {
    ctx.font = "16px Arial";
    ctx.fillStyle = "black";
    ctx.fillText("Pulsa espacio para lanzar la bola", canvas.width/2-120, canvas.height/2);
}

function dibuja (){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    dibujarladrillo();
    dibujarpelota();
    dibujarraqueta();
    puntos();
    vida();
    if (movPelota == false){
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
            
            movPelota = false;
            if(!vidas) {
                alert("HAS PERDIDO");
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

    if (pulsarDerecha && posicionRaqueta < canvas.width-anchoRaqueta) {
        posicionRaqueta = posicionRaqueta + 5;
    }
    else if (pulsarIzquierda && posicionRaqueta> 0) {
        posicionRaqueta = posicionRaqueta - 5;
    }

    if (movPelota == true){
        x = x + velx;
        y = y + vely;
    }
}

setInterval(dibuja, 5)

