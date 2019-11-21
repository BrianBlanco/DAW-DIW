/*

This Script is licensed under GPL v3 or higher

Author: Angel Berlanas Vicente
email : <berlanas_ang@gva.es>

*/

/*

FUNCIONES PERDIDAS
^(;,;)^

*/

function startMigration() {
    let childs = document.querySelector("steps").childNodes;
    console.log(childs.length);
    for (let i = 1; i < childs.length - 2; i++) {
        childs[i].classList.add("estabaEscondido");
        childs[i].addEventListener("transitionend", siguienteTransicion);
    }
}

function siguienteTransicion() {

}

function init() {
    console.info(" * Init envirnoment ");

    // Set click function on button
    document.querySelector("button").addEventListener("click", startMigration);
}

// Init the environment when all is ready
window.onload = init;
