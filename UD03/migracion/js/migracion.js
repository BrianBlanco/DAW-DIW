/*

This Script is licensed under GPL v3 or higher

Author: Angel Berlanas Vicente
email : <berlanas_ang@gva.es>

*/

/*

FUNCIONES PERDIDAS
^(;,;)^

*/

var contador = 0;
var hijosSteps;

function startMigration() {
    let pasoATransicionar = hijosSteps[contador];
    pasoATransicionar.classList.add("estabaEscondido");

    if (pasoATransicionar.tagName == "PROGRESS") {
        pasoATransicionar.classList.add("barraProgreso");
    }

    pasoATransicionar.addEventListener("transitionend", function () {
        contador++;
        if (contador < 18) {
            startMigration();
        }
    });

}

function siguienteTransicion() {


}

function init() {
    console.info(" * Init envirnoment ");

    // Set click function on button
    document.querySelector("button").addEventListener("click", startMigration);
    hijosSteps = document.querySelector("steps").children;
}

// Init the environment when all is ready
window.onload = init;