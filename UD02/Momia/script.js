window.onload = function () {
    crearMapa(23, 16);
    setInterval('movimientoMomia()', 500);
};

function crearMapa(ancho, alto) {
    var listaObjetos = ['llave', 'pergamino', 'momia', 'nada', 'urna'];

    var contador = 0;

    var contenedorTotal = document.getElementById("contenedorTotal");

    for (let i = 0; i < alto; i++) {
        for (let j = 0; j < ancho; j++) {
            var divCuadricula = document.createElement("div");
            divCuadricula.dataset.indice = contador;

            if (i == 0 || i == 1 || i == (alto - 1) || j == 0 || j == (ancho - 1)) {
                if (i == 1 && j == 5) {
                    divCuadricula.classList.add("personaje");
                } else if (i == 14 && j == 22) {
                    divCuadricula.classList.add("salidaCerrada");
                } else {
                    divCuadricula.classList.add("cuadriculaExterior");
                }

            } else if (i == 1 || i == (alto - 1) || j == 1 || j == (ancho - 2)) {
                divCuadricula.classList.add("pasadizo");

            } else if (i == 14 && j == 19) {
                divCuadricula.classList.add("momia");
            } else if ((i + 1) % 3 == 0 || (j - 1) % 4 == 0) {

                divCuadricula.classList.add("pasadizo");
            } else {
                divCuadricula.classList.add("bloque");
            }

            //divCuadricula.innerHTML = i + " - " + j;
            contenedorTotal.appendChild(divCuadricula);
            contador++;
        }
    }
}

function moverPersonaje(posicionNuevoDiv) {
    let personaje = detectarPosicionPersonaje();
    let posicionPersonaje = personaje.getAttribute("data-indice");
    let suma = parseInt(posicionPersonaje) + parseInt(posicionNuevoDiv);
    let divNuevo = document.querySelector("[data-indice = '" + suma + "']");
    let divNuevoClass = divNuevo.getAttribute("class");

    //console.log(divNuevoClass);
    if (divNuevoClass == "pasadizo") {
        personaje.classList.replace("personaje", "huellas");
        divNuevo.classList.replace("pasadizo", "personaje");

    } else if (divNuevoClass == "huellas") {
        personaje.classList.replace("personaje", "huellas");
        divNuevo.classList.replace("huellas", "personaje");
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

function comprobarColumnaCubierta() {
    let bloques = document.querySelectorAll(".bloque");
    var arrayContadorBloquesRellenados = new Array();

    let dataIndice;
    for (let i = 0; i < bloques.length; i++) {
        dataIndice = parseInt(bloques[i].getAttribute("data-indice"));
        //console.log(dataIndice);

        if (
            !contenedorTotal.childNodes[dataIndice - 23].classList.value.includes("pasadizo") &&
            !contenedorTotal.childNodes[dataIndice - 1].classList.value.includes("pasadizo") &&
            !contenedorTotal.childNodes[dataIndice + 1].classList.value.includes("pasadizo") &&
            !contenedorTotal.childNodes[dataIndice + 23].classList.value.includes("pasadizo")
        ) {

            bloques[i].classList.add(".bloqueRodeado");
            //console.log("bloque rellenado: " + bloques[i].getAttribute("data-indice"));
        }

        //console.log("bloque rellenado: " + bloques[i].getAttribute("data-indice"));
        if (dataIndice <= 294) {
            if (
                bloques[i].classList.value.includes("bloqueRodeado") &&
                bloques[i + 1].classList.value.includes("bloqueRodeado") &&
                bloques[i + 2].classList.value.includes("bloqueRodeado") &&
                bloques[i + 15].classList.value.includes("bloqueRodeado") &&
                bloques[i + 16].classList.value.includes("bloqueRodeado") &&
                bloques[i + 17].classList.value.includes("bloqueRodeado")
            ) {
                bloques[i].classList.add("bloqueAlDescubierto");
                bloques[i + 1].classList.add("bloqueAlDescubierto");
                bloques[i + 2].classList.add("bloqueAlDescubierto");
                bloques[i + 15].classList.add("bloqueAlDescubierto");
                bloques[i + 16].classList.add("bloqueAlDescubierto");
                bloques[i + 17].classList.add("bloqueAlDescubierto");
            }
        }
    }

}


function movimientoMomia() {
    let momia = document.querySelector(".momia");
    let dataIndiceMomia = parseInt(momia.getAttribute("data-indice"));
    let dataIndicePersonaje = detectarPosicionPersonaje().getAttribute("data-indice");
    let divNuevo;
    let direccionX = 0;
    let direccionY = 0;

    if (parseInt(dataIndicePersonaje % 23) == parseInt(dataIndiceMomia % 23)) {

    } else if (parseInt(dataIndicePersonaje % 23) < parseInt(dataIndiceMomia % 23)) {
        direccionX = dataIndiceMomia - 1;
    } else {
        direccionX = dataIndiceMomia + 1;
    }

    if (parseInt(dataIndicePersonaje / 23) == parseInt(dataIndiceMomia / 23)) {
        if (parseInt(dataIndicePersonaje % 23) < parseInt(dataIndiceMomia % 23)) {
                divNuevo = document.querySelector("[data-indice = '" + parseInt(dataIndiceMomia - 1 - 23) + "']");
                console.log("syso")
                if (divNuevo.classList.value.includes("pasadizo")) {
                    detectarPosicionMomia().classList.replace("momia", "pasadizo");
                    divNuevo.classList.replace("pasadizo", "momia");
                } else {
                divNuevo = document.querySelector("[data-indice = '" + parseInt(dataIndiceMomia - 1 + 23) + "']");
                    detectarPosicionMomia().classList.replace("momia", "pasadizo");
                    divNuevo.classList.replace("pasadizo", "momia");
            }

        } else {
            divNuevo = document.querySelector("[data-indice = '" + parseInt(dataIndiceMomia - 1 + 23) + "']");
            if (divNuevo.classList.value.includes("pasadizo")) {
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

    console.log();
}

function detectarPosicionPersonaje() {
    return document.querySelector(".personaje");
}

function detectarPosicionMomia() {
    return document.querySelector(".momia");
}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}