/*
console.log("Ejecutando JS...");

const canvas = document.getElementById("canvas");
canvas.width = 800;
canvas.height = 500;

const ctx = canvas.getContext("2d");

variables de la pelota
var radiopelota = 8;
var x = canvas.width/2;
var y = canvas.height - 20;
var velx = 1;
var vely = -2
var movPelota = false;

funcion de la pelota
function dibujopelota() {
    ctx.beginPath();    
    ctx.arc(x, y, radiopelota, 0, 2 * Math.PI);
    ctx.fillStyle = 'black';
    ctx.fill()
    ctx.closePath();
}

variables de la raqueta
var pulsarDerecha = false;
var pulsarIzquierda = false;

var alturaRaqueta = 10;
var anchoRaqueta = 75;
var posicionRaqueta = (canvas.width - anchoRaqueta)/2;


funcion de la raqueta
function dibujoraqueta () {
    ctx.beginPath();
    ctx.rect(posicionRaqueta, canvas.height-alturaRaqueta, anchoRaqueta, alturaRaqueta);
    ctx.fillStyle = "red";
    ctx.fill();
    ctx.closePath();
}

movimiento de la raqueta
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


tengo que continuar con los ladrillos:
   -def variables
   -dibujar ladrillos
   -funcion colision pelota ladrillo   



   const ladrillo = {
    f: 8, //filas
    c: 13, //columnas
    alt: 20, //altura de ladrillo
    anch: 70, //anchura de ladrillo
    padding: 1, //espacio alrededor del ladrillo
    visible: true //estado del ladrillo: activo o no
}

//Estructura de los ladrillos, inicialmente está vacío
const ladrillos = [];


//Recorrer todas las filas
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

//Variables para las vidas y la puntuación
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

//-- ¡Que empiece la función!
update();
*/


console.log("Ejecutando JS...");

const canvas = document.getElementById("canvas");
//-- Definir el tamaño del canvas
canvas.width = 1000;
canvas.height = 450;

//-- Obtener el contexto del canvas
const ctx = canvas.getContext("2d");

//Variables que influyen en la colisión
var radiobola = 10;//radio de la pelota
var x = canvas.width/2;//Punto de inicio de la bola (coordenada x)
var y = canvas.height - 10;//Punto de inicio de la bola (coordenada y)
//velocidades
var velx = 0;
var vely = 0;
var aleat = (Math.random() * 4) + 4;//Variable de velocidad aleatoria

//Sonidos mp3
const You_Win = new Audio('youwin.mp3');//Cuando se gana la partida
const Game_Over = new Audio('game_over.mp3');//Cuando se pierde la partida
const Clash = new Audio('clash.mp3');//Cuando se rompe el ladrillo
const Rebound = new Audio('rebound.mp3');//Cuando rebota contra la raqueta
const Lose_Life = new Audio('lose_life.mp3');//Cuando se pierde una vida

//Dibujamos la bola
function dibujobola(){
    ctx.beginPath();
    ctx.arc(x, y, radiobola, 0, Math.PI*2);
    ctx.fillStyle = "#FFFB74";
    ctx.fill();
    ctx.closePath();
}

//Definimos el movimiento de la raqueta. Lo haremos con los botones de flechas del teclado
var rightPressed = false;
var leftPressed = false;
document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);



//Definimos las variables de la raqueta
var raquetaHeight = 10;//Largo
var raquetaWidth = 75;//Ancho
var raquetaX = (canvas.width - raquetaWidth)/2;//Posición inicial de la raqueta

//Función que dibuja la raqueta
function dibujoraqueta(){
    ctx.beginPath();
    ctx.rect(raquetaX, canvas.height-raquetaHeight, raquetaWidth, raquetaHeight);
    ctx.fillStyle = "#B802AF";
    ctx.fill();
    ctx.closePath();
}


//Función para cuando se mantiene pulsado el botón,(botones de flecha, izquierda y derecha)
function keyDownHandler(e) {
    if(e.keyCode == 39) {
        rightPressed = true;
    }else if(e.keyCode == 37){
        leftPressed = true;
    }
}
//Función para cuando se levanta el dedo del botón,(botones de flecha, izquierda y derecha)
function keyUpHandler(e) {
    if(e.keyCode == 39){
        rightPressed = false;
    }else if(e.keyCode == 37){
        leftPressed = false;
    }
}

//Función para empezar a jugar, al pulsar la barra espaciadora
window.onkeydown = (e) => {
    if (e.keyCode  == 32){
            document.getElementById("parrafo").style.display = "none";
            velx = aleat;
            vely = -aleat;
  
    }
}
//Variables necesarios para los ladrillos
const ladrillo = {
    f: 8, //filas
    c: 13, //columnas
    alt: 20, //altura de ladrillo
    anch: 70, //anchura de ladrillo
    padding: 1, //espacio alrededor del ladrillo
    visible: true //estado del ladrillo: activo o no
}

//Estructura de los ladrillos, inicialmente está vacío
const ladrillos = [];


//Recorrer todas las filas
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

//Variables para las vidas y la puntuación
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
  document.getElementById("gameovergif").style.display = "none";//"none para no mostrar estos gifs a lo largo de la partida"
  document.getElementById("youwingif").style.display = "none";//solo quiero que lo muestre al final
  document.getElementById("play_again").style.display = "none";
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  dibujoraqueta();
  dibujobola();
  lifes();
  points();
//Bucle para pintar los ladrillos
//Recorre todas las filas y columnas
for (let i = 1; i < ladrillo.f; i++){//Inicializo en 1 en vez de en 0 para poder despegar los ladrillos del borde
    for(let j = 1; j < ladrillo.c; j++){////Inicializo en 1 en vez de en 0 para poder despegar los ladrillos del borde
      //si el ladrillo es visible se pinta
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
for (let i = 1; i < ladrillo.f; i++) {//Inicializo en 1 porque igual lo hice en el bucle de arriba
    for (let j = 1; j < ladrillo.c; j++) {
      if (ladrillos[i][j].visible) {
        if ((y >= ladrillos[i][j].y) && (y <= (ladrillos[i][j].y + 20))){
          if ((x >= ladrillos[i][j].x) && (x <= (ladrillos[i][j].x + 70))){
            ladrillos[i][j].visible = false;
            vely = -vely;
            puntuacion += 1;//Sumo la puntuación al romper ladrill
          }
        }
      }
    }
  }

  //Definimos el movimiento de la pelota y que ocurre cuando choca con la raqueta

  if(x + velx > canvas.width - radiobola || x + velx < radiobola){
      velx = -velx;
  }
  if(y + vely < radiobola) {
      vely = -vely;
  }else if(y + vely > canvas.height - radiobola){
      if(x > raquetaX && x <raquetaX + raquetaWidth){
          let puntoColision = x - (raquetaX + raquetaWidth/2);//A partir de aquí, defino la mejora
          puntoColision = puntoColision / (raquetaWidth/2);// en la cual la bola, depende en que parte toque la
          let angulo = puntoColision * Math.PI/3;// raqueta, rebotará con un angulo distinto
          velx = aleat * Math.sin(angulo);
          vely = -aleat * Math.cos(angulo);
      }
  }

  //Definimos lo que ocurre cuando la pelota toca el suelo (pérdida de vida)

  if (y >= canvas.height){
      //Posiciones y velocidad de la pelota y raqueta al perder vida
      velx = 0;
      vely = 0;
      x = canvas.width/2;
      y = canvas.height - 10;
      raquetaX = (canvas.width - raquetaWidth)/2;
      numVidas -= 1;//Resto 1 a la variable vida
   

  }else if(numVidas == 0){
      //Posiciones y velocidad de la pelota y raqueta al perder la partida:
      velx = 0;
      vely = 0;
      raquetaX = (canvas.width - raquetaWidth)/2;
      document.getElementById("canvas").style.display = "none";//Hacemos que el canvas desaparezca para que de pie a los gifs
      document.getElementById("play_again").style.display = "";
      document.getElementById("parrafo1").style.display = "none";
      


  }
//Definimos que ocurre cuando se destruyen todos los bloques(ganamos el juego)
  if(puntuacion == 84){
    //Posiciones y velocidad de la pelota y raqueta al ganar la partida:
    velx = 0;
    vely = 0;
    raquetaX = (canvas.width - raquetaWidth)/2;
    document.getElementById("canvas").style.display = "none";//Hacemos que el canvas desaparezca para que de pie a los gifs
    document.getElementById("play_again").style.display = "";
    document.getElementById("parrafo1").style.display = "none";
   
  }

  //Definimos el movimiento y la velocidad de la raqueta
  if(rightPressed && raquetaX < canvas.width - raquetaWidth){
      raquetaX += 7;
  }else if(leftPressed && raquetaX > 0) {
      raquetaX -= 7;
  }

  //Volver a ejecutar update cuando toque
  x += velx;
  y += vely;
  requestAnimationFrame(update);
}

//-- ¡Que empiece la función!
update();