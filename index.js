let listaSubcritos = [];

const objSubcriptor = {
    id: '',
    nombre: '',
    apellido: '',
    celular: '',
    correo: '',
    genero: '',
    intereses: []
}

let editando = false;

const formulario = document.querySelector("#fomulario");
const nombreInput = document.querySelector("#nombre");
const apellidoInput = document.querySelector("#apellido");
const correoInput = document.querySelector("#correo");
const celularInput = document.querySelector('#celular');
const generoInputs = document.querySelectorAll('input[name="genero"]');
const interesesInputs = document.querySelectorAll('input[name="intereses"]');
const btnAction = document.querySelector("#boton");

formulario.addEventListener('submit', validarFormulario);

function validarFormulario(e) {
    e.preventDefault();

    // Validar campos vacíos
    if (nombreInput.value === '' || apellidoInput.value === '' || correoInput.value === '' || celularInput.value === '') {
        alert('Todos los campos deben ser llenados');
        return;
    }

    // Validar género
    let generoSeleccionado = '';
    generoInputs.forEach(input => {
        if (input.checked) {
            generoSeleccionado = input.value;
        }
    });
    if (generoSeleccionado === '') {
        alert('Debe seleccionar un género');
        return;
    }

    // Validar intereses
    let interesesSeleccionados = [];
    interesesInputs.forEach(input => {
        if (input.checked) {
            interesesSeleccionados.push(input.value);
        }
    });
    if (interesesSeleccionados.length === 0) {
        alert('Debe seleccionar al menos un interés');
        return;
    }

    if (editando) {
        editarSubcriptor();
        editando = false;
    } else {
        objSubcriptor.id = Date.now();
        objSubcriptor.nombre = nombreInput.value;
        objSubcriptor.apellido = apellidoInput.value;
        objSubcriptor.correo = correoInput.value;
        objSubcriptor.celular = celularInput.value;
        objSubcriptor.genero = generoSeleccionado;
        objSubcriptor.intereses = interesesSeleccionados;
        
        agregarSubcriptor();
    }
}

function mostrarSubcriptor() {
    const divSubriptores = document.querySelector('#mostrarSubcriptores');

    limpiarHTML();

    listaSubcritos.forEach(subcriptor => {
        const { id, nombre, apellido, correo, genero, intereses } = subcriptor;

        const parrafo = document.createElement('p');
        parrafo.textContent = `${id} - ${nombre} - ${apellido} - ${correo} - ${genero} - ${intereses.join(', ')}`;
        parrafo.dataset.id = id;

        const editarBoton = document.createElement('button');
        editarBoton.onclick = () => cargarSubcriptor(subcriptor);
        editarBoton.classList.add('btn', 'btn-warning', 'me-2');
        editarBoton.textContent = 'Editar';
        parrafo.append(editarBoton);

        const eliminarBoton = document.createElement('button');
        eliminarBoton.onclick = () => eliminarSubcriptor(id);
        eliminarBoton.textContent = 'Eliminar';
        eliminarBoton.classList.add('btn', 'btn-danger');
        parrafo.append(eliminarBoton);

        const hr = document.createElement('hr');

        divSubriptores.appendChild(parrafo);
        divSubriptores.appendChild(hr);
    });
}

function limpiarHTML() {
    const divSubriptores = document.querySelector('#mostrarSubcriptores');

    while (divSubriptores.firstChild) {
        divSubriptores.removeChild(divSubriptores.firstChild);
    }
}

function agregarSubcriptor() {
    listaSubcritos.push({ ...objSubcriptor });
    mostrarSubcriptor();

    formulario.reset();
    limpiarObjeto();
}

function limpiarObjeto() {
    objSubcriptor.id = '';
    objSubcriptor.nombre = '';
    objSubcriptor.apellido = '';
    objSubcriptor.celular = '';
    objSubcriptor.correo = '';
    objSubcriptor.genero = '';
    objSubcriptor.intereses = [];
}

function cargarSubcriptor(subcriptor) {
    const { id, nombre, apellido, correo, celular, genero, intereses } = subcriptor;

    objSubcriptor.id = id;
    nombreInput.value = nombre;
    apellidoInput.value = apellido;
    correoInput.value = correo;
    celularInput.value = celular;

    // Setear el género
    generoInputs.forEach(input => {
        if (input.value === genero) {
            input.checked = true;
        }
    });

    // Setear los intereses
    interesesInputs.forEach(input => {
        input.checked = intereses.includes(input.value);
    });

    formulario.querySelector('button[type="submit"]').textContent = 'Actualizar';
    editando = true;
}

function editarSubcriptor() {
    objSubcriptor.nombre = nombreInput.value;
    objSubcriptor.apellido = apellidoInput.value;
    objSubcriptor.celular = celularInput.value;
    objSubcriptor.correo = correoInput.value;

    objSubcriptor.genero = Array.from(generoInputs).find(input => input.checked).value;
    objSubcriptor.intereses = Array.from(interesesInputs).filter(input => input.checked).map(input => input.value);

    listaSubcritos = listaSubcritos.map(sub => {
        if (sub.id === objSubcriptor.id) {
            sub.nombre = objSubcriptor.nombre;
            sub.apellido = objSubcriptor.apellido;
            sub.correo = objSubcriptor.correo;
            sub.celular = objSubcriptor.celular;
            sub.genero = objSubcriptor.genero;
            sub.intereses = objSubcriptor.intereses;
        }
        return sub;
    });

    limpiarHTML();
    mostrarSubcriptor();
    formulario.reset();

    formulario.querySelector('button[type="submit"]').textContent = 'Agregar';

    limpiarObjeto();
    editando = false;
}

function eliminarSubcriptor(id) {
    listaSubcritos = listaSubcritos.filter(sub => sub.id !== id);

    limpiarHTML();
    mostrarSubcriptor();
}
