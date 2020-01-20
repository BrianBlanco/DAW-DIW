function buildGrafico() {
    let inicioAngulo = -Math.PI/2;
    let finAngulo = 0;

    let claves = document.querySelectorAll("input[class='left']");
    let valores = document.querySelectorAll("input[class='right']");

    const canvas = document.querySelector('canvas');
    let ctx = canvas.getContext('2d');
    ctx.fillStyle = 'purple';
  

    for (let i = 0; i < claves.length; i++) {
        ctx.beginPath();
        ctx.moveTo(200, 200);
        finAngulo = inicioAngulo + (parseInt(valores[i].value)/18)*2*Math.PI;
        console.log(valores[i]);
        ctx.arc(200, 200, 100, inicioAngulo,finAngulo);
        ctx.moveTo(200, 200);
        ctx.stroke();

         inicioAngulo = finAngulo;
    }





}

function loadListeners() {
    document.querySelector("input[name='grafiqueame']").addEventListener("click", buildGrafico);
}


function init() {
    console.log(" * Init ");
    loadListeners();

}

window.onload = init;