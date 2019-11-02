document.addEventListener("keypress", botonApretado);

const key = document.querySelectorAll("div");
key.forEach(boton => { boton.addEventListener('transitionend', borrarTransicion); });

function botonApretado(e) {

    const audio = document.querySelector(`audio[data-key="${e.keyCode}"]`);
    if (!audio) {
        return;
    }

    audio.play();
    audio.currentTime = 0;

    const teclaPulsada = document.querySelector(`div[data-key="${e.keyCode}"]`);
    teclaPulsada.classList.add("sombra");


}

function borrarTransicion() {
    this.classList.remove("sombra");
}
