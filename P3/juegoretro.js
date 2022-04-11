
console.log("Ejecutando JS...");

const canvas = document.getElementById("canvas");
canvas.width = 800;
canvas.height = 500;

const ctx = canvas.getContext("2d");

//variables de la pelota
var radiopelota = 8;
var x = canvas.width/2;
var y = canvas.height - 20;
var velx = 1;
var vely = -2
var movPelota = false;

//funcion de la pelota
function dibujopelota() {
    ctx.beginPath();    
    ctx.arc(x, y, radiopelota, 0, 2 * Math.PI);
    ctx.fillStyle = 'black';
    ctx.fill()
    ctx.closePath();
}

//variables de la raqueta
var pulsarDerecha = false;
var pulsarIzquierda = false;

var alturaRaqueta = 10;
var anchoRaqueta = 75;
var posicionRaqueta = (canvas.width - anchoRaqueta)/2;


//funcion de la raqueta
function dibujoraqueta () {
    ctx.beginPath();
    ctx.rect(posicionRaqueta, canvas.height-alturaRaqueta, anchoRaqueta, alturaRaqueta);
    ctx.fillStyle = "red";
    ctx.fill();
    ctx.closePath();
}

//movimiento de la raqueta
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

window.onkeydown = (e) => {
    if (e.keyCode  == 32){
            document.getElementById("parrafo").style.display = "none";
            velx = 1;
            vely = -2;
  
    }
}


//ladrillos 

const ladrillo = {
    f: 8, //filas
    c: 13, //columnas
    alt: 20, //altura de ladrillo
    anch: 70, //anchura de ladrillo
    padding: 1, //espacio alrededor del ladrillo
    visible: true //estado del ladrillo: activo o no
}
const ladrillos = [];

for (let i = 0; i < ladrillo.f; i++){
    ladrillos[i] = []; //Inicializa la fila. Las filas son Arrays que inicialmente estás vacíos.
    
    for (let j = 0; j < ladrillo.c; j++){
        ladrillos[i][j] = {
            x: (ladrillo.anch + ladrillo.padding) * j,
            y:(ladrillo.alt + ladrillo.padding) * i,
            anch: ladrillo.anch,
            alt: ladrillo.alt,
            padding: ladrillo.padding,
            visible: ladrillo.visible
        };
    }
}

//Variables vidas y puntos
var numVidas = 3;
var puntuacion = 0;

//Función para mostrar las vidas
function lifes(){
    ctx.fillStyle = "white";
    ctx.fillText("Lifes:" +numVidas, 10, 18);
    ctx.font = "20px Arial";
}

//Función para mostrar la puntuación
function points(){
    ctx.fillStyle = "white";
    ctx.fillText("Score:" + puntuacion, 920, 18);
    ctx.font = "20px Arial";
    
}

//-- Funcion principal de animacion
function update(){
  console.log("test");
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  dibujoraqueta();
  dibujopelota();
  lifes();
  points();

//Bucle para pintar los ladrillos
//Recorre todas las filas y columnas
for (let i = 1; i < ladrillo.f; i++){
    for(let j = 1; j < ladrillo.c; j++){
      if (ladrillos[i][j].visible){
          ctx.beginPath();
          ctx.rect(ladrillos[i][j].x, ladrillos[i][j].y, ladrillo.anch, ladrillo.alt);
          ctx.fillStyle = "#B802AF";
          ctx.fill();
          ctx.closePath();
      }
    }
}

//Bucle para la colisión de la pelota con los ladrillos.
for (let i = 1; i < ladrillo.f; i++) {
    for (let j = 1; j < ladrillo.c; j++) {
      if (ladrillos[i][j].visible) {
        if ((y >= ladrillos[i][j].y) && (y <= (ladrillos[i][j].y + 20))){
          if ((x >= ladrillos[i][j].x) && (x <= (ladrillos[i][j].x + 70))){
            ladrillos[i][j].visible = false;
            vely = -vely;
            puntuacion += 1;
          }
        }
      }
    }
  }

  //Definimos el movimiento de la pelota y que ocurre cuando choca con la raqueta

  if(x + velx > canvas.width - radiopelota || x + velx < radiopelota){
      velx = -velx;
  }
  if(y + vely < radiopelota) {
      vely = -vely;
  }else if(y + vely > canvas.height - radiobola){
      if(x > posicionRaqueta && x <posicionRaqueta + anchoRaqueta){
          let puntoColision = x - (posicionRaqueta + anchoRaqueta/2);
          puntoColision = puntoColision / (anchoRaqueta/2);
          let angulo = puntoColision * Math.PI/3;o
          velx = 1 * Math.sin(angulo);
          vely = -2 * Math.cos(angulo);
          
      }
  }

  //Definimos lo que ocurre cuando la pelota toca el suelo (pérdida de vida)

  if (y >= canvas.height){
      //Posiciones y velocidad de la pelota y raqueta al perder vida
      velx = 0;
      vely = 0;
      x = canvas.width/2;
      y = canvas.height - 10;
      posicionRaqueta = (canvas.width - anchoRaqueta)/2;
      numVidas -= 1;

  }else if(numVidas == 0){
      //Posiciones y velocidad de la pelota y raqueta al perder la partida:
      velx = 0;
      vely = 0;
      posicionRaqueta = (canvas.width - anchoRaqueta)/2;
      document.getElementById("canvas").style.display = "none";
      document.getElementById("play_again").style.display = "";
      document.getElementById("parrafo1").style.display = "none";
     


  }
//Definimos que ocurre cuando se destruyen todos los bloques(ganamos el juego)
  if(puntuacion == 84){
    //Posiciones y velocidad de la pelota y raqueta al ganar la partida:
    velx = 0;
    vely = 0;
    posicionRaqueta = (canvas.width - alturaRaqueta)/2;
    document.getElementById("canvas").style.display = "none";
    document.getElementById("play_again").style.display = "";
    document.getElementById("parrafo1").style.display = "none";
  }

  //Definimos el movimiento y la velocidad de la raqueta
  if(pulsarDerecha && posicionRaqueta < canvas.width - anchoRaqueta){
      posicionRaqueta += 7;
  }else if(pulsarIzquierda && posicionRaqueta > 0) {
      posicionRaqueta -= 7;
  }

  //Volver a ejecutar update cuando toque
  x += velx;
  y += vely;
  requestAnimationFrame(update);
}

update();
