var listaObjetos = ['llave', 'papiro', 'sarcofago', 'nada', 'nada',
    'nada', 'nada', 'nada', 'nada', 'nada', 'nada', 'nada', 'nada',
    'nada', 'nada', 'nada', 'nada', 'nada', 'nada', 'nada'];
var vidas = 5;
var listaDivsConObjeto = new Array();
var objetosConsegidos = new Array();
var salida = false;
var intervalMomia;

window.onload = function () {
    crearMapa(23, 16);
};

function crearMapa(ancho, alto) {
    intervalMomia = setInterval('movimientoMomia()', 500);

    var contador = 0;

    var contenedorTotal = document.getElementById("contenedorTotal");

    for (let i = 0; i < alto; i++) {
        for (let j = 0; j < ancho; j++) {
            var divCuadricula = document.createElement("div");
            divCuadricula.dataset.indice = contador;

            if (i == 0 || i == 1 || i == (alto - 1) || j == 0 || j == (ancho - 1)) {
                if (i == 1 && j == 5) {
                    divCuadricula.classList.add("salida");
                    divCuadricula.classList.add("personaje");
                } else {
                    divCuadricula.classList.add("cuadriculaExterior");
                }

            } else if (i == 1 || i == (alto - 1) || j == 1 || j == (ancho - 2)) {
                divCuadricula.classList.add("pasadizo");
            } else if (i == 14 && j == 19) {
                divCuadricula.classList.add("momia");// MOMIA
            } else if ((i + 1) % 3 == 0 || (j - 1) % 4 == 0) {
                divCuadricula.classList.add("pasadizo");
            } else {
                divCuadricula.classList.add("bloque");
                divCuadricula.classList.add("columna");
                //}
            }

            //divCuadricula.innerHTML = i + " - " + j;
            contenedorTotal.appendChild(divCuadricula);
            contador++;
        }
    }

    shuffleArray(listaObjetos);
    let aux = 71;

    for (let j = 1; j <= 20; j++) {
        listaDivsConObjeto.push(aux);
        if ((j % 5) == 0) {
            aux += 53;
        } else {
            aux += 4;
        }
    }
    //console.log(listaDivsConObjeto);
}

function moverPersonaje(posicionNuevoDiv) {
    let personaje = detectarPosicionPersonaje();
    let posicionPersonaje = personaje.getAttribute("data-indice");
    let suma = parseInt(posicionPersonaje) + parseInt(posicionNuevoDiv);
    let divNuevo = document.querySelector("[data-indice = '" + suma + "']");
    let divNuevoClass = divNuevo.getAttribute("class");

    if (divNuevoClass == "pasadizo") {
        personaje.classList.replace("personaje", "huellas");
        divNuevo.classList.replace("pasadizo", "personaje");

    } else if (divNuevoClass == "huellas") {
        personaje.classList.replace("personaje", "huellas");
        divNuevo.classList.replace("huellas", "personaje");
    } else if (divNuevoClass == "momia") {
        quitarVidaPersonaje();
    }

    if ((divNuevoClass == "salida huellas") && (salida == true)) {
        personaje.classList.replace("personaje", "huellas");
        divNuevo.classList.replace("huellas", "personaje");
        clearInterval(intervalMomia);
        abrirPopUp();
    }

    comprobarColumnaCubierta();
}

document.addEventListener('keydown', function (event) {

    // Cogemos el valor de la tecla pulsada
    let teclaPulsada = event.key;
    let posicionNuevoDiv = 0;

    switch (teclaPulsada) {
        case "ArrowDown":
            posicionNuevoDiv = 23;
            break;
        case "ArrowUp":
            posicionNuevoDiv = -23;
            break;
        case "ArrowLeft":
            posicionNuevoDiv = -1;
            break;
        case "ArrowRight":
            posicionNuevoDiv = 1;
            break;
    }

    moverPersonaje(posicionNuevoDiv);
});

// Función para comprobar si la columna ha sido completamente cubierta
function comprobarColumnaCubierta() {
    var bloques = document.querySelectorAll(".bloque");
    let bloqueADescubrir;
    let dataIndice;
    for (let i = 0; i < bloques.length; i++) {
        dataIndice = parseInt(bloques[i].getAttribute("data-indice"));

        if (
            !listaObjetos.includes(bloques[i].classList.values)
        ) {
            if (
                !contenedorTotal.childNodes[dataIndice - 23].classList.value.includes("pasadizo") &&
                !contenedorTotal.childNodes[dataIndice - 1].classList.value.includes("pasadizo") &&
                !contenedorTotal.childNodes[dataIndice + 1].classList.value.includes("pasadizo") &&
                !contenedorTotal.childNodes[dataIndice + 23].classList.value.includes("pasadizo")
            ) {
                bloques[i].classList.add("bloqueRodeado");
            }
        }

        //console.log("bloque rellenado: " + bloques[i].getAttribute("data-indice"));
        if (parseInt(i / 15) % 2 == 0) {
            if (i % 3 == 0) {
                //console.log(bloques[i].getAttribute("data-indice"));
                if (
                    bloques[i].classList.contains("bloqueRodeado") &&
                    bloques[i + 1].classList.contains("bloqueRodeado") &&
                    bloques[i + 2].classList.contains("bloqueRodeado") &&
                    bloques[i + 15].classList.contains("bloqueRodeado") &&
                    bloques[i + 16].classList.contains("bloqueRodeado") &&
                    bloques[i + 17].classList.contains("bloqueRodeado")
                ) {
                    /* console.log(listaDivsConObjeto[0]);
                     console.log(bloques[i].getAttribute("data-indice"));
                     console.log(listaDivsConObjeto.length);
                     */
                    let posicionObjetoEnLista = parseInt(listaDivsConObjeto.indexOf(parseInt(bloques[i].getAttribute("data-indice"))));
                    if (posicionObjetoEnLista != -1) {
                        bloqueADescubrir = listaObjetos[posicionObjetoEnLista];
                        if (bloqueADescubrir != "nada") {
                            objetosConsegidos.push(bloqueADescubrir);
                        }
                    }

                    if (bloqueADescubrir == "llave") {
                        salida = true;
                    }

                    bloques[i].classList.replace("bloqueRodeado", bloqueADescubrir);
                    bloques[i + 1].classList.replace("bloqueRodeado", bloqueADescubrir);
                    bloques[i + 2].classList.replace("bloqueRodeado", bloqueADescubrir);
                    bloques[i + 15].classList.replace("bloqueRodeado", bloqueADescubrir);
                    bloques[i + 16].classList.replace("bloqueRodeado", bloqueADescubrir);
                    bloques[i + 17].classList.replace("bloqueRodeado", bloqueADescubrir);
                }
            }
        }
    }
}

// No tocar, por favor, huir de esta cosa
function movimientoMomia() {
    let momia = document.querySelectorAll(".momia");
    let dataIndiceMomia;
    for (let i = 0; i < momia.length; i++) {
        dataIndiceMomia = parseInt(momia[i].getAttribute("data-indice"));

        let dataIndicePersonaje = detectarPosicionPersonaje().getAttribute("data-indice");
        let direccionX = 0;
        let direccionY = 0;

        if (dataIndicePersonaje != 28) {
            moverMomia(dataIndicePersonaje, dataIndiceMomia, direccionX, direccionY);
        }
    }
}

// Devuelve la posición del personaje
function detectarPosicionPersonaje() {
    return document.querySelector(".personaje");
}

// Devuelve la posición de la momia
function detectarPosicionMomia() {
    return document.querySelector(".momia");
}

// Ordena aleatoriamente los elementos del array de objetos
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

function moverMomia(dataIndicePersonaje, dataIndiceMomia, direccionX, direccionY) {

    // Si el personaje está más a la izquierda
    if (parseInt(dataIndicePersonaje % 23) < parseInt(dataIndiceMomia % 23)) {
        divNuevo = document.querySelector("[data-indice = '" + parseInt(dataIndiceMomia - 1) + "']");

        // Si el personaje está más a la derecha
    } else if (parseInt(dataIndicePersonaje % 23) > parseInt(dataIndiceMomia % 23)) {
        divNuevo = document.querySelector("[data-indice = '" + parseInt(dataIndiceMomia + 1) + "']");
    } else {
        if (parseInt(dataIndicePersonaje % 23) % 2 == 0) {
            divNuevo = document.querySelector("[data-indice = '" + parseInt(dataIndiceMomia - 22) + "']");
            if (divNuevo.classList.contains("bloque")) {
                divNuevo = document.querySelector("[data-indice = '" + parseInt(dataIndiceMomia - 24) + "']");
            }
        } else {
            divNuevo = document.querySelector("[data-indice = '" + parseInt(dataIndiceMomia + 1) + "']");
            // TODO corregir error momia posiciones impares
        }

    }

    if (divNuevo.classList.contains("pasadizo")) {
        detectarPosicionMomia().classList.replace("momia", "pasadizo");
        divNuevo.classList.replace("pasadizo", "momia");

    } else if (divNuevo.classList.contains("huellas")) {
        detectarPosicionMomia().classList.replace("momia", "huellas");
        divNuevo.classList.replace("huellas", "momia");
    }

    // Y
    // Si el personaje está arriba de la momia
    if (parseInt(dataIndicePersonaje / 23) < parseInt(dataIndiceMomia / 23)) {
        divNuevo = document.querySelector("[data-indice = '" + parseInt(dataIndiceMomia - 23) + "']");

    } else if (parseInt(dataIndicePersonaje / 23) > parseInt(dataIndiceMomia / 23)) {
        divNuevo = document.querySelector("[data-indice = '" + parseInt(dataIndiceMomia + 23) + "']");

    } else {
        if (parseInt(dataIndicePersonaje / 23) % 3 == 0) {
            if ((parseInt(dataIndicePersonaje % 23) < parseInt(dataIndiceMomia % 23))) {
                divNuevo = document.querySelector("[data-indice = '" + parseInt(dataIndiceMomia - 24) + "']");
            } else {
                divNuevo = document.querySelector("[data-indice = '" + parseInt(dataIndiceMomia - 22) + "']");
            }
        } else {
            if ((parseInt(dataIndicePersonaje % 23) > parseInt(dataIndiceMomia % 23))) {
                divNuevo = document.querySelector("[data-indice = '" + parseInt(dataIndiceMomia + 24) + "']");
            } else {
                divNuevo = document.querySelector("[data-indice = '" + parseInt(dataIndiceMomia + 22) + "']");
            }
        }
    }

    if (divNuevo.classList.contains("pasadizo")) {
        detectarPosicionMomia().classList.replace("momia", "pasadizo");
        divNuevo.classList.replace("pasadizo", "momia");

    } else if (divNuevo.classList.contains("huellas")) {
        detectarPosicionMomia().classList.replace("momia", "huellas");
        divNuevo.classList.replace("huellas", "momia");
    }
}
/*
function momiaSiguePersonaje(dataIndicePersonaje, dataIndiceMomia, direccionX, direccionY) {
    console.log("Peronaje: " + parseInt(dataIndicePersonaje % 23));
    console.log("Momia: " + parseInt(dataIndiceMomia % 23));

    if (parseInt(dataIndicePersonaje % 23) == parseInt(dataIndiceMomia % 23)) {

        // Cogemos una posición a la izquierda de la momia
        divNuevo = document.querySelector("[data-indice = '" + parseInt(dataIndiceMomia - 1) + "']");
        console.log(!divNuevo.getAttribute("data-indice").includes("pasadizo"));
        if (divNuevo.getAttribute("data-indice").includes("pasadizo")) {


            // Comprobamos que si el personaje está arriba
        } else if (parseInt(dataIndicePersonaje / 23) < parseInt(dataIndiceMomia / 23)) {

            // Si no es pasillo
            if (!divNuevo.getAttribute("data-indice").includes("pasadizo") && !divNuevo.getAttribute("data-indice").includes("huellas")) {

                // Conseguimos el valor de una posición arriba izquierda para esquivar el bloque
                divNuevo = document.querySelector("[data-indice = '" + parseInt(dataIndiceMomia - 1 - 23) + "']");

                // Comprobamos si arriba a la izquierda hay bloque
                if (divNuevo.classList.value.includes("pasadizo")) {
                    detectarPosicionMomia().classList.replace("momia", "pasadizo");
                    divNuevo.classList.replace("pasadizo", "momia");

                    // De no haberlo, la momia iría abajo a la izquierda
                } else if (divNuevo.classList.value.includes("pasadizo")) {
                    detectarPosicionMomia().classList.replace("momia", "huellas");
                    divNuevo.classList.replace("huellas", "momia");
                } else {
                    divNuevo = document.querySelector("[data-indice = '" + parseInt(dataIndiceMomia - 1 + 23) + "']");
                    detectarPosicionMomia().classList.replace("momia", "pasadizo");
                    divNuevo.classList.replace("pasadizo", "momia");
                }

                // Si es pasillo, anda hacia el personaje
            } else {
                direccionX = dataIndiceMomia - 1;
            }
            // De no estar arriba de la momia
        } else {

            // Cogemos la posición uno arriba uno a la izquierda
            divNuevo = document.querySelector("[data-indice = '" + parseInt(dataIndiceMomia + 1 - 23) + "']");

            // Si la posición que acabamos de buscar tiene pasadizo, va allí
            if (divNuevo.classList.value.includes("pasadizo")) {
                detectarPosicionMomia().classList.replace("momia", "pasadizo");
                divNuevo.classList.replace("pasadizo", "momia");
            } else if (divNuevo.classList.value.includes("huellas")) {
                detectarPosicionMomia().classList.replace("momia", "huellas");
                divNuevo.classList.replace("huellas", "momia");
                // Sino, va abajo a la izquierda
            } else {
                divNuevo = document.querySelector("[data-indice = '" + parseInt(dataIndiceMomia + 1 + 23) + "']");
                detectarPosicionMomia().classList.replace("momia", "pasadizo");
                divNuevo.classList.replace("pasadizo", "momia");
            }
        }

        // Si el personaje está a la derecha
    } else if (parseInt(dataIndicePersonaje % 23) < parseInt(dataIndiceMomia % 23)) {
        direccionX = dataIndiceMomia - 1;

        // Si el personaje está en la misma posición horizontal
    } else {
        direccionX = dataIndiceMomia + 1;
    }

    // Y
    if (parseInt(dataIndicePersonaje / 23) == parseInt(dataIndiceMomia / 23)) {
        if (parseInt(dataIndicePersonaje % 23) < parseInt(dataIndiceMomia % 23)) {
            divNuevo = document.querySelector("[data-indice = '" + parseInt(dataIndiceMomia - 1) + "']");
            if (!divNuevo.classList.value.includes("pasadizo")) {
                divNuevo = document.querySelector("[data-indice = '" + parseInt(dataIndiceMomia - 1 - 23) + "']");
                if (divNuevo.classList.value.includes("pasadizo")) {

                    detectarPosicionMomia().classList.replace("momia", "pasadizo");
                    divNuevo.classList.replace("pasadizo", "momia");

                } else {
                    divNuevo = document.querySelector("[data-indice = '" + parseInt(dataIndiceMomia - 1 + 23) + "']");
                    detectarPosicionMomia().classList.replace("momia", "pasadizo");
                    divNuevo.classList.replace("pasadizo", "momia");
                }
            } else {
                direccionY = dataIndiceMomia - 1;
            }
        } else {
            divNuevo = document.querySelector("[data-indice = '" + parseInt(dataIndiceMomia + 1 - 23) + "']");
            if (divNuevo.classList.value.includes("pasadizo")) {
                detectarPosicionMomia().classList.replace("momia", "pasadizo");
                divNuevo.classList.replace("pasadizo", "momia");
            } else {
                divNuevo = document.querySelector("[data-indice = '" + parseInt(dataIndiceMomia + 1 + 23) + "']");
                detectarPosicionMomia().classList.replace("momia", "pasadizo");
                divNuevo.classList.replace("pasadizo", "momia");
            }
        }
    } else if (parseInt(dataIndicePersonaje / 23) < parseInt(dataIndiceMomia / 23)) {
        direccionY = dataIndiceMomia - 23;
    } else {
        direccionY = dataIndiceMomia + 23;
    }

    divNuevo = document.querySelector("[data-indice = '" + direccionX + "']");

    for (let i = 0; i < 2; i++) {
        if (divNuevo.classList.value.includes("pasadizo")) {
            detectarPosicionMomia().classList.replace("momia", "pasadizo");
            divNuevo.classList.replace("pasadizo", "momia");
        } else if (divNuevo.classList.value.includes("huellas")) {
            detectarPosicionMomia().classList.replace("momia", "huellas");
            divNuevo.classList.replace("huellas", "momia");
        }

        divNuevo = document.querySelector("[data-indice = '" + direccionY + "']");
    }

}*/

function quitarVidaPersonaje() {
    vida--;
}
// No mirar
function sleep(milliseconds) {
    var start = new Date().getTime();
    for (var i = 0; i < 1e7; i++) {
        if ((new Date().getTime() - start) > milliseconds) {
            break;
        }
    }
}


var btnAbrirPopup = document.getElementById('btn-abrir-popup'),
    overlay = document.getElementById('overlay'),
    popup = document.getElementById('popup'),
    btnCerrarPopup = document.getElementById('btn-cerrar-popup');

function abrirPopUp() {
    overlay.classList.add('active');
    popup.classList.add('active');
}

function cerrarPopUp() {
    //e.preventDefault();
    overlay.classList.remove('active');
    popup.classList.remove('active');

    let myNode = document.getElementById("contenedorTotal");

    while (myNode.firstChild) {
        myNode.removeChild(myNode.firstChild);
    }

    crearMapa(23, 16);

}

/*
let bloques = document.querySelectorAll(".bloque");

// Variables para el console.log
/*
let personaje = document.querySelector(".personaje");

let dataIndicePersonaje = personaje.getAttribute("data-indice");

((dataIndicePersonaje % 23) - 2) % 4


let momia = document.querySelector(".momia");

let dataIndiceMomia = momia.getAttribute("data-indice");

!listaObjetos.includes(bloques[93].classList.values) &&
                !listaObjetos.includes(bloques[93 + 1].classList.values) &&
                !listaObjetos.includes(bloques[93 + 2].classList.values) &&
                !listaObjetos.includes(bloques[93 + 15].classList.values)&&
                !listaObjetos.includes(bloques[93 + 16].classList.values) &&
                !listaObjetos.includes(bloques[93 + 17].classList.values)
*/