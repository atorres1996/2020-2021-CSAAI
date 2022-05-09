console.log("Ejecutando JS....")


const canvas = document.getElementById('canvas');
const img = document.getElementById('imagesrc');
const ctx = canvas.getContext('2d');

const gris = document.getElementById('gris');
const decolor = document.getElementById('decolor');
const reset = document.getElementById('reset');


const deslizadorR = document.getElementById('deslizadorR');
const deslizadorG = document.getElementById('deslizadorG');
const deslizadorB = document.getElementById('deslizadorB');


const range_valueR = document.getElementById('range_valueR');
const range_valueG = document.getElementById('range_valueG');
const range_valueB = document.getElementById('range_valueB');


const GREY = {
    GRIS: 1,
    COLOR: 0,
}

let estado = GREY;


img.onload = function () {

  canvas.width = img.width;
  canvas.height = img.height;
  
  ctx.drawImage(img, 0,0);

  console.log("Imagen lista...");
};


function color() {
    ctx.drawImage(img, 0,0);
    let imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    let data = imgData.data


    range_valueR.innerHTML = deslizadorR.value;
    umbralR = deslizadorR.value

    range_valueG.innerHTML = deslizadorG.value;
    umbralG = deslizadorG.value

    range_valueB.innerHTML = deslizadorB.value;
    umbralB = deslizadorB.value

    for (let i = 0; i < data.length; i+=4) {
        if (data[i] > umbralR){
            data[i] = umbralR;
        }
        if (data[i+1] > umbralG){
            data[i+1] = umbralG;
        }
        if (data[i+2] > umbralB){
            data[i+2] = umbralB;
        }
    }
  ctx.putImageData(imgData, 0, 0);
}

function fotogris() {
    ctx.drawImage(img, 0,0);
    let imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    let data = imgData.data
    ctx.drawImage(img, 0,0);

    for (let i = 0; i < data.length; i+=4) {
        (3*data[i] + 4*data[i+1]+ data[i+2])/8
        data[i] = data[i+1] = data[i+2] 
      }

  ctx.putImageData(imgData, 0, 0);

  estado =  GREY;

}


deslizadorR.oninput = () => {
    if (estado == GREY){
        color();
    }
}

deslizadorG.oninput = () => {
    if (estado ==  GREY){
        color();
    }
}

deslizadorB.oninput = () => {
    if (estado == GREY){
        color();
    }
}

gris.onclick = () => {
    todogris();
}

decolor.onclick = () => {
    estado = GREY;
    color ();
}

reset.onclick = () => {
    deslizadorR.value = 255;
    deslizadorG.value = 255;
    deslizadorB.value = 255;

    range_valueR.innerHTML = deslizadorR.value;
    range_valueG.innerHTML = deslizadorG.value;
    range_valueB.innerHTML = deslizadorB.value;

    ctx.drawImage(img, 0,0);
    estado = GREY;
}

console.log("Fin...");