/*

This Script is licensed under GPL v3 or higher

Author: Angel Berlanas Vicente y Brian, que no se os olvide Brian
email : <berlanas_ang@gva.es>

*/

/*

FUNCIONES PERDIDAS
^(;,;)^

*/

// Creamos un contador para saber que hijo vamos a transicionar
var contador = 0;

// Creamos un array con los todos los hijos de "steps", siendo estos los
// "steplabel", "progress" y los "finalmsg"
var hijosSteps;

// Funcion que se llama al iniciar el programa desde el init y se llama "recursivamente", supongo que se puede
// considerar recursividad a esto, que añade un "eventListener" a cada elemento con un "transitionend" que
// anyade la clase "estabaEscodido", mostrando el elemento, y al acabar la trasicion, se llama a si mismo
// dejando paso a que haga lo mismo el siguiente elemento
function startMigration() {

    document.querySelector("button").removeEventListener("click", startMigration);


    // Cogemos el hijo que queramos modificar y lo instanciamos
    let pasoATransicionar = hijosSteps[contador];

    // Le anyadimos la clase "estabaEscondido" para mostrarlo
    pasoATransicionar.classList.add("estabaEscondido");

    // Las barras de progreso funcionan de manera diferente, pues le anyadimos otra clase aparte
    if (pasoATransicionar.tagName == "PROGRESS") {
        pasoATransicionar.classList.add("progress_transitioned");
    }

    if (pasoATransicionar.tagName == "FINALMSG") {
        pasoATransicionar.addEventListener("transitionend", function () {
            pasoATransicionar.classList.add("finalmsg_transitioned");
        });

    }
    // Agregamos un evento que al terminar su transicion, vuelva a llamar a esta funcion hasta un maximo
    // de 18 veces, para que no hayan errores, recordamos que se empieza desde el 0
    pasoATransicionar.addEventListener("transitionend", function () {
        contador++;
        if (contador < 18) {
            startMigration();
        }
    });
}

function siguienteTransicion() {
    // Gracias por la ayuda Ángel, pero tiene pinta de que esta funcion no me es necesaria UwU
}

function init() {
    console.info(" * Init envirnoment ");

    // Set click function on button
    document.querySelector("button").addEventListener("click", startMigration);

    // Instancia de la variable "hijosSteps", que almacena todos los hijos del elemento "steps" del DOM
    hijosSteps = document.querySelector("steps").children;
}

// Init the environment when all is ready
window.onload = init;