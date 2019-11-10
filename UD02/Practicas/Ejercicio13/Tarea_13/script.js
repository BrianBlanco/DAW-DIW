var jeroPulsado;
function init() {
    let botonCrearCaja = document.querySelector("button");
    botonCrearCaja.addEventListener("click", crearCaja);
    let header = document.querySelector("header");

    let numeroDeJero;
    let jero;

    for (let i = 1; i <= 2; i++) {
        numeroDeJero = "jero" + i;
        jero = document.createElement("div");
        jero.classList.add(numeroDeJero);
        jero.addEventListener("click", cambiarAnimacion);
        header.appendChild(jero);
    }
}

function cambiarAnimacion() {
    jeroPulsado = this.getAttribute('class') == "jero1" ? "girar" : "rebotar";
}

function elegirPoder() {
    this.classList.remove("ultimateHover");
    if (jeroPulsado == "girar") {
        this.classList.add("girar");
    } else {
        this.classList.add("rebotar");
    }
}

function crearCaja() {
    let contenedor = document.querySelector("container");
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
    this.classList.add("ultimateHover", "ultimate");
    this.addEventListener("click", elegirPoder);
}

window.onload = init;