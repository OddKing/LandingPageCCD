let listaSubcritos=[];

const objSubcriptor={
    id:'',
    nombre:'',
    apellido:'',
    celular:'',
    correo:''
}

let editando=false;

const formulario=document.querySelector("#formulario");
const nombreInput=document.querySelector("#nombre");
const apellidoInput=document.querySelector("#apellido");
const correoInput=document.querySelector("#correo");
const celularInput=document.querySelector('#celular');
const btnAction=document.querySelector("#boton");

formulario.addEventListener('submit',validarFormulario);

function validarFormulario(e){
    e.preventDefault();

    if(nombreInput.value==='' || apellidoInput === '' || correoInput === '' || celularInput ==='' ){
        alert('Todos los cambos deben ser llenados');
        return;
    }

    if(editando){
        editarSubcriptor()
        editando=false;
    }else{
        objSubcriptor.id=Date.now();
        objSubcriptor.nombre=nombreInput.value;
        objSubcriptor.apellido=apellidoInput.value;
        objSubcriptor.correo=correoInput.value;
        objSubcriptor.celular=celularInput.value;
        
        agregarSubcriptor()
    }
}


function mostrarSubcriptor(){
    const divSubriptores= document.querySelector('#mostrarSubcriptores');

    limpiarHTML();

    listaSubcritos.forEach(subcriptor => {
        const {id, nombre, apellido,correo}= subcriptor;

        const parrafo= document.createElement('p');
        parrafo.textContent=`${id} - ${nombre} - ${apellido} - ${correo}`;
        parrafo.dataset.id = id;

        const editarBoton= document.createElement('button');
        editarBoton.onclick= () => cargarSubcriptor(subcriptor);
        editarBoton.classList.add('btn','btn-editar');
        parrafo.append(editarBoton);

        const eliminarBoton = document.createElement('button');
        eliminarBoton.onclick= () => eliminarSubcriptor(id);
        eliminarBoton.textContent='Eliminar';
        eliminarBoton.classList.add('btn','btn-eliminar');
        parrafo.append(eliminarBoton);

        const hr = document.createElement('hr');

        divSubriptores.appendChild(parrafo);
        divSubriptores.appendChild(hr);
    });
}


function limpiarHTML(){
    const divSubriptores= document.querySelector('#mostrarSubcriptores');

    while(divSubriptores.firstChild){
        divSubriptores.removeChild(divSubriptores.firstChild);
    }
}

function agregarSubcriptor(){
    listaSubcritos.push({...objSubcriptor});
    mostrarSubcriptor();

    formulario.reset();
    limpiarObjeto();
}

function limpiarObjeto(){
    objSubcriptor.id='';
    objSubcriptor.nombre='';
    objSubcriptor.apellido='';
    objSubcriptor.celular='';
    objSubcriptor.correo='';
}

function editarSubcriptor(){
    objSubcriptor.nombre = nombreInput.value;
    objSubcriptor.apellido = apellidoInput.value;
    objSubcriptor.celular=celularInput.value;
    objSubcriptor.correo=correoInput.value;

    listaSubcritos.map(sub => {
        if(sub.id===objSubcriptorl.id){
            sub.id= objSubcriptor.id;
            sub.nombre=objSubcriptor.nombre;
            sub.apellido=objSubcriptor.apellido;
            sub.correo=objSubcriptor.correo;
            sub.celular=objSubcriptor.celular;
        }
    });

    limpiarHTML();
    mostrarSubcriptor();
    formulario.reset();

    formulario.querySelector('button[type="submit"]').textContent='Agregar';

    editando = false;
}

function eliminarSubcriptor(id){
    listaSubcritos= listaSubcritos.filter(sub => sub.id !== id);

    limpiarHTML();
    mostrarSubcriptor();
}