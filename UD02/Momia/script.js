window.onload = function() {
    crearMapa(21, 13);
};

function crearMapa(ancho, alto) {
    var listaObjetos = ['llave', 'pergamino', 'momia', 'nada', 'urna'];

    var mapa = new Map(listaObjetos);

    for (let i = 1; i <= ancho; i++) {
        for (let j = 0; j <= alto; j++) {
            var divCuadricula = document.createElement("div");
            
            divCuadricula.classList.add("cuadricula");

            document.getElementById("contenedorTotal").appendChild(divCuadricula);
        }
    }
}