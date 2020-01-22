function buildGrafico() {
    const colores = ["blue", "purple", "red", "yellow"];

    let inicioAngulo = -Math.PI / 2;
    let finAngulo = 0;

    // Los nombres de las claves
    let claves = document.querySelectorAll("input[class='left']");

    // Los valores de las claves
    let valores = document.querySelectorAll("input[class='right']");

    // Declaramos Canvas, que es donde vamos a pintar, junto con el pincel
    const canvas = document.querySelector('#canvas1');
    let ctx = canvas.getContext('2d');

    let ancho = canvas.width;
    let alto = canvas.height;
    let partes = ancho / 4;
    // Limpieza del canvas cada vez que se grafiquea
    ctx.clearRect(0, 0, ancho, alto);

    let sumaValores = 0;

    // Calcular el total de los valores sumados
    valores.forEach(element => {
        sumaValores += parseInt(element.value);
    });

    // Grafica quesito
    for (let i = 0; i < claves.length; i++) {
        ctx.fillStyle = colores[i];
        ctx.beginPath();
        ctx.moveTo(200, 200);

        finAngulo = inicioAngulo + (parseInt(valores[i].value) / sumaValores) * 2 * Math.PI;

        ctx.arc(200, 200, 100, inicioAngulo, finAngulo);
        ctx.moveTo(200, 200);
        ctx.fill();

        
        ctx.font = "20px Arial";
        ctx.fillText(claves[i].value, partes * i, alto);

        inicioAngulo = finAngulo;
    }

    // Rectangulos



    //tamaño de cada barra (anchura)
    

    const canvasRect = document.querySelector('#canvas2');
    let ctxRect = canvasRect.getContext('2d');

    ctxRect.clearRect(0, 0, ancho, alto);


    ctxRect.font = "20px Arial";

    for (let i = 0; i < valores.length; i++) {

        ctxRect.fillStyle = colores[i];
        let altura = Math.round(ancho * valores[i].value / (sumaValores));
        ctxRect.fillRect(partes * i, alto - altura, partes, altura);
        ctxRect.fillStyle = "black";
        ctxRect.fillText(claves[i].value, partes * i, alto);

    }

    // Lineal

    const canvasLineal = document.querySelector("#canvas3");
    let ctxLineal = canvasLineal.getContext("2d");
    ctxLineal.clearRect(0, 0, ancho, alto);


    let cadaAltura = alto / sumaValores;

    //la posicion de la primera linea
    let X = 0;
    let Y = alto - valores[0].value * cadaAltura;

    ctxLineal.font = "20px Arial";
    ctxLineal.lineWidth = 10;

    for (let i = 0; i < valores.length; i++) {

        ctxLineal.strokeStyle = colores[i];
        let result = alto - cadaAltura * valores[i].value;

        ctxLineal.beginPath();
        ctxLineal.moveTo(X, Y);
        ctxLineal.lineTo(X + partes, result);
        ctxLineal.stroke();

        X += partes;
        Y = result;

        ctxLineal.fillStyle = "black";
        ctxLineal.fillText(claves[i].value, partes * i, alto);
    }

}

function loadListeners() {
    document.querySelector("input[name='grafiqueame']").addEventListener("click", buildGrafico);
}


function init() {
    console.log(" * Init ");
    loadListeners();

}

window.onload = init;