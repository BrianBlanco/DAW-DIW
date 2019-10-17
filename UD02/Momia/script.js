window.onload = function() {
    crearMapa(23, 16);
};

function crearMapa(ancho, alto) {
    var listaObjetos = ['llave', 'pergamino', 'momia', 'nada', 'urna'];

    var contador = 0;

    for (let i = 0; i < alto; i++) {
        for (let j = 0; j < ancho; j++) {
            var divCuadricula = document.createElement("div");
            divCuadricula.dataset.indice = contador;

            if (i == 0 || i == 1 || i == (alto - 1) || j == 0 || j == (ancho - 1)) {
                if (i == 1 && j == 5) {
                    divCuadricula.classList.add("personaje");
                } else{
                    divCuadricula.classList.add("cuadriculaExterior");
                }
            } else if (i == 1 || i == (alto - 1)|| j == 1 || j == (ancho - 2)) {
                divCuadricula.classList.add("pasadizo");

            } else if ((i + 1) % 3 == 0 || (j - 1) % 4 == 0) {

                divCuadricula.classList.add("pasadizo");
            } else {
                divCuadricula.classList.add("bloque");
            }

            divCuadricula.innerHTML = i + " - " + j;
            document.getElementById("contenedorTotal").appendChild(divCuadricula);
            contador++;
        }
    }
}

function moverPersonaje(direccion) {
    document.querySelector("[data-indice = '5']");
}

document.addEventListener('keydown', function(event) {

    // Cogemos el valor de la tecla pulsada
    let teclaPulsada = event.key;
    let direccion;

    switch (teclaPulsada) {
        case "arrowDown":
            direccion = "abajo";
            break;
        case "arrowUp":
            direccion = "arriba";
            break;
        case "arrowLeft":
            direccion = "izquierda";
            break;
        case "arrowRight":
            direccion = "derecha";
            break;
    }
/*
    if (comprobarDivAdyacente(direccion)) {
        moverPersonaje(direccion);
    } 
  */  
});

function detectarPosicionPersonaje() {
    return document.querySelector(".personaje");
}
