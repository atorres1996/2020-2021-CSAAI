
console.log("Ejecutando JS...");

const canvas = document.getElementById("canvas");
canvas.width = 800;
canvas.height = 500;
canvas.position = center

const ctx = canvas.getContext("2d");

//variables de la pelota
var radiopelota = 8;
var x = canvas.width/2;
var y = canvas.height - 20;
var velx = 1;
var vely = -2;
movPelota = false


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

var filasLadrillo = 6;
var columnasLadrillo = 10;
var anchoLadrillo = 70;
var alturaLadrillo = 20;
var huecoLadrillo = 5;
var marginTop = 10;
var marginLeft = 8;

var ladrillos = [];
for(c=0; c<columnasLadrillo; c++) {
    ladrillos[c] = [];
    for(f=0; f<filasLadrillo; f++) {
        ladrillos[c][f] = { x: 0, y: 0, estado: 1 };
    }
}

window.onkeydown = (e) => {
    if (e.key == ' ') {
        movBola = true;
    }
}

function dibujoladrillo() {
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
                    if(puntuacion == filasLadrillos*columnasLadrillos) {
                        alert("HAS GANADO, ENHORABUENA!");
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
function vidas(){
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
    ctx.fillText("Pulsa espacio para lanzar la bola", canvas.width/2-120, canvas.height/2);
}


function dibuja (){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    dibujopelota();
    dibujoraqueta();
    dibujoladrillo();
    puntos();
    vidas();

    if (movPelota == false){
        space();
    }
    choque();


    if (x >= (canvas.width - radiopelota) || x <= radiopelota) {
        velx = -velx;
    }
    if (y <= radio) {
         vely = -vely;
    }
    else if (y >= (canvas.height - radiopelota)){
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
                posicionRaqueta = (canvas.width-anchoBase)/2;
            }
        }
    }

    if (pulsarDerecha && posicionRaqueta < canvas.width-anchoRaqueta) {
        posicionRaqueta = posicionRaqueta + 5;
    }
    else if (pulsarIzquierda && posicionRaqueta > 0) {
        posicionRaqueta = posicionRaqueta - 5;
    }

    if (movPelota == true){
        x = x + velx;
        y = y + vely;
    }
}

setInterval(dibuja, 5)


/*ladrillos 

const ladrillo = {
    f: 6, //filas
    c: 12, //columnas
    alt: 20, //altura de ladrillo
    anch: 70, //anchura de ladrillo
    padding: 2, //espacio alrededor del ladrillo
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

var puntos = 0;

//Función para mostrar la puntuación
function puntuacion(){
    ctx.fillStyle = "white";
    ctx.fillText("Puntos:" + puntuacion, 920, 18);
    ctx.font = "20px Arial";

//Variables vidas y puntos
var numVidas = 3;

//Función para mostrar las vidas
function Vidas(){
    ctx.fillStyle = "white";
    ctx.fillText("Vidas:" +numVidas, 10, 18);
    ctx.font = "20px Arial";
}

//-- Funcion principal de animacion
function update(){
  console.log("test");
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  dibujopelota();
  dibujoraqueta();
  puntos();
  Vidas();

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
  }else if(y + vely > canvas.height - radiopelota){
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
}
/*/