var listaObjetos = ['llave', 'pergamino', 'nada', 'urna'];
window.onload = function () {

    crearMapa(23, 16);
    setInterval('movimientoMomia()', 400);
};

function crearMapa(ancho, alto) {


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

                // Me arrepiento de toda esta línea
                /*if (contador == 71 || contador == 72 || contador == 73 || contador == 94 || contador == 95 || contador == 96) {
                    divCuadricula.classList.add("papiro");
                } else if (contador == 225 || contador == 226 || contador == 227 || contador == 248 || contador == 249 || contador == 250) {
                    divCuadricula.classList.add("sarcofago");
                } else if (contador == 282 || contador == 283 || contador == 284 || contador == 305 || contador == 306 || contador == 307) {
                    divCuadricula.classList.add("llave");
                } else {*/
                divCuadricula.classList.add("bloque");
                divCuadricula.classList.add("columna");
                //}
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

// Función para comprobar si la columna ha sido completamente cubierta
function comprobarColumnaCubierta() {
    let bloques = document.querySelectorAll(".bloque");
    let bloqueADescubrir;
    let dataIndice;
    for (let i = 0; i < 119; i++) {
        dataIndice = parseInt(bloques[i].getAttribute("data-indice"));
        //console.log(dataIndice);


        /*
        
         for (let i = 0; i < bloques.length; i++) {
		bloques[i].classList.remove("bloqueRodeado");
    }
        */
        //console.log(listaObjetos.includes(bloques[i].classList.value));

        // Me cago en mis muertos
        //console.log("bloques: " + bloques[i].getAttribute("data-indice"));
        if (
            !listaObjetos.includes(bloques[i].classList.values)
            // !listaObjetos.includes(bloques[i + 1].classList.values) &&
            // !listaObjetos.includes(bloques[i + 2].classList.values) &&
            // !listaObjetos.includes(bloques[i + 15].classList.values) &&
            // !listaObjetos.includes(bloques[i + 16].classList.values) &&
            // !listaObjetos.includes(bloques[i + 17].classList.values)
        ) {
            if (
                !contenedorTotal.childNodes[dataIndice - 23].classList.value.includes("pasadizo") &&
                !contenedorTotal.childNodes[dataIndice - 1].classList.value.includes("pasadizo") &&
                !contenedorTotal.childNodes[dataIndice + 1].classList.value.includes("pasadizo") &&
                !contenedorTotal.childNodes[dataIndice + 23].classList.value.includes("pasadizo")
            ) {
                bloques[i].classList.add("bloqueRodeado");
                //console.log("Bloque rodeado: " + bloques[i].getAttribute("data-indice"));
                //console.log("bloque rellenado: " + bloques[i].getAttribute("data-indice"));
            }
        }

        //console.log("bloque rellenado: " + bloques[i].getAttribute("data-indice"));
        if (parseInt(i / 15) % 2 == 0) {
            if (i % 3 == 0) {
                if (
                    bloques[i].classList.contains("bloqueRodeado") &&
                    bloques[i + 1].classList.contains("bloqueRodeado") &&
                    bloques[i + 2].classList.contains("bloqueRodeado") &&
                    bloques[i + 15].classList.contains("bloqueRodeado") &&
                    bloques[i + 16].classList.contains("bloqueRodeado") &&
                    bloques[i + 17].classList.contains("bloqueRodeado")
                ) {
                    if (i == 0) {
                        bloqueADescubrir = "papiro";
                    } else if (i == 3) {
                        bloqueADescubrir = "llave";
                    } else if (i == 72) {
                        bloqueADescubrir = "sarcofago";
                    } else {
                        bloqueADescubrir = "nada";
                    }

                    //add(bloqueADescubrir);
                    // bloques[i].classList.add(bloqueADescubrir);
                    // bloques[i + 1].classList.add(bloqueADescubrir);
                    // bloques[i + 2].classList.add(bloqueADescubrir);
                    // bloques[i + 15].classList.add(bloqueADescubrir);
                    // bloques[i + 16].classList.add(bloqueADescubrir);
                    // bloques[i + 17].classList.add(bloqueADescubrir);



                    bloques[i].classList.replace("bloqueRodeado", bloqueADescubrir);
                    bloques[i + 1].classList.replace("bloqueRodeado", bloqueADescubrir);
                    bloques[i + 2].classList.replace("bloqueRodeado", bloqueADescubrir);
                    bloques[i + 15].classList.replace("bloqueRodeado", bloqueADescubrir);
                    bloques[i + 16].classList.replace("bloqueRodeado", bloqueADescubrir);
                    bloques[i + 17].classList.replace("bloqueRodeado", bloqueADescubrir);


                    //     bloques[i].classList.remove("bloqueRodeado");
                    //     bloques[i + 1].classList.remove("bloqueRodeado");
                    //     bloques[i + 2].classList.remove("bloqueRodeado");
                    //     bloques[i + 15].classList.remove("bloqueRodeado");
                    //     bloques[i + 16].classList.remove("bloqueRodeado");
                    //     bloques[i + 17].classList.remove("bloqueRodeado");
                }
            }
        }

    }

}

// No tocar, por favor, huir de esta cosa
function movimientoMomia() {
    let momia = document.querySelector(".momia");
    let dataIndiceMomia = parseInt(momia.getAttribute("data-indice"));
    let dataIndicePersonaje = detectarPosicionPersonaje().getAttribute("data-indice");
    let divNuevo;
    let direccionX = 0;
    let direccionY = 0;

    // X

    // Comprobamos que si el personaje está a la izquierda


    momiaSiguePersonaje(dataIndicePersonaje, dataIndiceMomia, direccionX, direccionY);



    // Y


}

//Esto hace cosas
function detectarPosicionPersonaje() {
    return document.querySelector(".personaje");
}

//Esto hace cosas
function detectarPosicionMomia() {
    return document.querySelector(".momia");
}

//Esto hace s
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

function momiaSiguePersonaje(dataIndicePersonaje, dataIndiceMomia, direccionX, direccionY) {
    if (parseInt(dataIndicePersonaje % 23) == parseInt(dataIndiceMomia % 23)) {

        // Comprobamos que si el personaje está arriba
        if (parseInt(dataIndicePersonaje % 23) < parseInt(dataIndiceMomia % 23)) {

            // Cogemos una posición a la izquierda de la momia
            divNuevo = document.querySelector("[data-indice = '" + parseInt(dataIndiceMomia - 1) + "']");

            // Si no es pasillo
            if (!divNuevo.getAttribute("data-indice").includes("pasillo")) {

                // Conseguimos el valor de una posición arriba izquierda para esquivar el bloque
                divNuevo = document.querySelector("[data-indice = '" + parseInt(dataIndiceMomia - 1 - 23) + "']");

                // Comprobamos si arriba a la izquierda hay bloque
                if (divNuevo.classList.value.includes("pasadizo")) {
                    detectarPosicionMomia().classList.replace("momia", "pasadizo");
                    divNuevo.classList.replace("pasadizo", "momia");

                    // De no haberlo, la momia iría abajo a la izquierda
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

}
/*
let bloques = document.querySelectorAll(".bloque");


!listaObjetos.includes(bloques[93].classList.values) &&
                !listaObjetos.includes(bloques[93 + 1].classList.values) &&
                !listaObjetos.includes(bloques[93 + 2].classList.values) &&
                !listaObjetos.includes(bloques[93 + 15].classList.values)&&
                !listaObjetos.includes(bloques[93 + 16].classList.values) &&
                !listaObjetos.includes(bloques[93 + 17].classList.values)
*/