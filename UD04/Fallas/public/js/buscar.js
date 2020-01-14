// Simple script to use with datosAbiertos

// Author : Angel Berlanas Vicente
//         <berlanas_ang@gva.es>
// This script is licensed under GPLv3 or higher


// Algunos valores

const fuentesUrl = "http://mapas.valencia.es/lanzadera/opendata/Monumentos_falleros/JSON";
let resultadoJSON;
// Esta es la funcion de filtrado para
// obtener tan solo los elementos que cumplen
// una serie de requisitos.

function filtroLetra(elemento) {
	let letra = document.querySelector(`input[name="calle"]`).value;
	return elemento.properties.calle.startsWith(letra);
}

function rellenarSection() {
	let secciones = [];
	for (let i = 0; i < resultadoJSON.length; i++) {
		let seccion = resultadoJSON[i].properties.seccion;

		if (!secciones.includes(seccion)) {
			secciones.push(resultadoJSON[i].properties.seccion);
		}
	}
	secciones.sort();
	let sectionFallas = document.getElementById("secciones");

	for (let i = 0; i < secciones.length; i++) {
		let option = document.createElement("option");
		option.innerText = secciones[i];
		option.value = secciones[i];
		sectionFallas.appendChild(option);
	}
}

function buscar() {

	// Obtenemos el JSON que esta definido
	const fetchPromesa = fetch(fuentesUrl);

	// Cuando se resuelva la promesa
	fetchPromesa.then(response => {
		// la pasamos a JSON
		return response.json();
		// Y entonces
	}).then(respuesta => {
		// Filtramos los resultados con el filtro definido anteriormente
		resultadoJSON = respuesta.features;
		crearFallas(respuesta);
		rellenarSection();
	});
}

function crearFallas(respuesta) {

	const resultado = respuesta.features;
	const divResultados = document.querySelector(".resultados");
	// Una vez tenemos el listado filtrado pasamos a crear
	// cada uno de los <li> que representan
	// Por cada uno de ellos
	resultado.forEach(falla => {

		let divFalla = document.createElement("div");
		divFalla.classList.add("cuadroFallas");

		let imgFalla = document.createElement("img");
		imgFalla.src = falla.properties.boceto;

		let nombreFalla = document.createElement("span");
		nombreFalla.innerText = falla.properties.nombre;

		divFalla.appendChild(imgFalla);
		divFalla.appendChild(nombreFalla);
		divResultados.appendChild(divFalla);
	});

}
function init() {
	document.getElementById("secciones").addEventListener("onchange", buscar);
	buscar();
}

// The mother of the lamb.
window.onload = init;

