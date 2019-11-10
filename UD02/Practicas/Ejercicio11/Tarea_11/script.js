function ponerClasesALasBestias() {
    cajas = document.getElementsByClassName('caja');

    for (let i = 0; i < cajas.length; i++) {
        cajas[i].classList.toggle("nuevaPosicion");
    }

}

function init() {
    let button = document.querySelector('button');
    button.addEventListener('click', ponerClasesALasBestias);
}

window.onload = init;