function pedirArray() {
    var arrayLength = prompt("Dime el tamaño del aray");

    var array = new Array;


    for (let i = 0; i < array.length; i++) {
        array.push(prompt("Dime el valor de la posición " + i));

    }

    alert(Math.max(null, array));
}