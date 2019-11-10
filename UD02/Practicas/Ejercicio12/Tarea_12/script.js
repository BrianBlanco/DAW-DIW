function init() {

    let botonCrearCaja = document.getElementsByTagName("button")[0];
    botonCrearCaja.addEventListener("click", crearCaja);
}


function crearCaja() {
    let contenedor = document.getElementsByTagName("container")[0];
    if (contenedor.childElementCount < 20) {
        let cuadro = document.createElement("box");
        cuadro.addEventListener("click", evoluciona);
        contenedor.appendChild(cuadro);
    }
}

function evoluciona() {
    this.classList.add("evoluciona");
    this.addEventListener("click", desevoluciona);
}

function desevoluciona() {
    this.classList.add("desevoluciona");
    this.addEventListener("click", ultimate);
}

function ultimate() {
    this.classList.add("ultimate");
}

window.onload = init;