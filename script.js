const select = document.querySelector('#input-tipo');
const cabecera_campo = document.querySelector('#input-cabecera');
const tamanio = document.getElementById('input-tamanio');
const add = document.querySelector('.add-tipo');
const tipos = document.querySelector('.lista_campos');
const submit = document.querySelector('.calcular');
const registros = document.querySelector('#input-registros');
const bloque = document.querySelector('#input-bloque');
const cabecera_fila = document.querySelector('#input-cabecera-fila');
const cabecera_bloque = document.querySelector('#input-cabecera-bloque')
const output = document.querySelector('output');

let campos = [];

select.addEventListener('change', function() {
    tamanio.setAttribute('value', parseInt(this.options[this.options.selectedIndex].ariaValueNow));
    tamanio.setAttribute('min', parseInt(this.options[this.options.selectedIndex].ariaValueMin));
    tamanio.setAttribute('max', parseInt(this.options[this.options.selectedIndex].ariaValueMax));
});

add.addEventListener('click', e => {
    e.preventDefault();
    const tipo = document.querySelector('#input-tipo');
    let tipo_value = tipo.value;
    let tamanio_value = parseInt(tamanio.value);
    let cabecera_value = parseInt(cabecera_campo.value);
    campos.push(parseInt(tamanio.value) + parseInt(cabecera_campo.value));
    tipos.innerHTML += `
    <p> ${tipo_value} </p>
    <p> ${tamanio_value} </p>
    <p> ${cabecera_value} </p>`
});

submit.addEventListener('click', e => {
    e.preventDefault();
    /*
     * Calcular longitud de fila
     */
    let campos_values = campos.reduce(
        (previousValue, currentValue) => previousValue + currentValue,
        0
      );
    let tamanio_filas = campos_values + parseInt(cabecera_fila.value);
    console.log("Tamaño de filas: " + tamanio_filas);
    /**
     * Calcular tamaño disponible de bloque
     */
    let tamanio_base_bloque = bloque.value * 1024;
    let tamanio_final_bloque = tamanio_base_bloque - cabecera_bloque.value;
    console.log("Tamaño disponible p/bloque: " + tamanio_final_bloque);
    /**
     * Filas por bloque
     */
    let filas_p_bloque = Math.floor(tamanio_final_bloque / tamanio_filas);
    console.log("Filas p/bloque: " + filas_p_bloque);
    /**
     * Bloques necesarios para las registros
     */
    let bloques_necesarios = Math.ceil(parseInt(registros.value) / filas_p_bloque);
    console.log("Bloques necesarios: " + bloques_necesarios);

    output.textContent = `${bloques_necesarios} bloques de ${bloque.value}k = ${bloques_necesarios * bloque.value}k`
})