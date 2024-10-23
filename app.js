'use strict'

const inputArchivo = document.getElementById('archivo');
const btnEjecutar = document.getElementById('btn-ejecutar');
const txtContent = document.getElementById('txt-content');
const txtTitle = document.getElementById('txttitle'); 
const tbodyA = document.getElementById('tbodyA');
let title = '';

// Detecta si se selecciona un archivo
inputArchivo.addEventListener('change', function() {
  const archivo = inputArchivo.files[0]; 

  if (archivo) {
    const extension = archivo.name.split('.').pop().toLowerCase();
    title = 'Contenido de archivo ' + archivo.name;


    if (extension === 'txt') {
      btnEjecutar.disabled = false;
    } else {
      alert('El formato del archivo no es compatible con esta función. Solo se aceptan archivos .txt.');
      window.location.reload(); 
    }
  }
});


btnEjecutar.addEventListener('click', function () {
  event.preventDefault();
  const archivo = inputArchivo.files[0];
  const lector = new FileReader();
  txtTitle.textContent = title;

  lector.onload = async function (event) {
    txtContent.value = event.target.result; 
    const lines = txtContent.value.split('\n').map(line => line.trim());
    const QLINE = lines[0];
    const ZLINE = lines[1];
    const iLINE = lines[2];
    const ALINE = lines[3];
    const WLINE = lines[4];

    const Q = await LIMPIARCOMA(QLINE);
    const Z = await LIMPIARCOMA(ZLINE);
    const arri = iLINE.split('=');
    const i = arri[1].trim();
    const A = await LIMPIARCOMA(ALINE);
    const W = await LIMPIARW(WLINE);
    console.log(A,Q,Z);
    //max_vector_row = Math.max(Q.length(),Z.length(),*/A.length);
    console.log("Q:", Q);
    console.log("Z:", Z);
    console.log("i:", i);
    agregarFilasVector(A,'tbodyA');
    agregarFilasVector(Q,'tbodyQ');
    agregarFilasVector(Z,'tbodyZ');
    agregarAlfabeto(Z,'alfabeto');
    console.log("W:", W);

  };

  lector.readAsText(archivo); 
  document.getElementById('carga-archivo-form').style.display = 'none';
});

async function LIMPIARCOMA(str){
  const contenido = str.match(/\{([^}]*)\}/)[1];
  const arrayElementos = contenido.split(',');

  // Mostrar el resultado
  return arrayElementos;

}

async function LIMPIARW(str) {
  const match = str.match(/\{([^}]*)\}/);

  if (match && match[1].trim() !== "") {
    const contenido = match[1].trim(); 
    const arrayElementos = contenido.split(';').map(e => e.trim());

    return arrayElementos;
  } else {
    return [];
  }
}


function agregarFilasVector(vector, tbodyV) {
  // Obtener referencia al tbody
  //console.log("A: "+A);
  const tbody = document.getElementById(tbodyV);
  for (let i = 0; i < vector.length; i++) {
    let tr1 = document.createElement('tr');
    let th1 = document.createElement('th');
    th1.setAttribute('scope', 'row');
    th1.textContent = vector[i];
    tr1.appendChild(th1);
    tbody.appendChild(tr1);
  }
}

function agregarAlfabeto(alfabeto, trA) {
  // Obtener referencia al tbody
  //console.log("A: "+A);
  const tr = document.getElementById(trA);
  for (let i = 0; i < alfabeto.length; i++) {
    let th1 = document.createElement('th');
    th1.setAttribute('scope', 'row');
    th1.setAttribute('class','table-active')
    th1.textContent = alfabeto[i];
    tr.appendChild(th1);
    // tr.appendChild(tr1);
  }

}