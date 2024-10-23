'use strict'

const inputArchivo = document.getElementById('archivo');
const btnEjecutar = document.getElementById('btn-ejecutar');
const txtContent = document.getElementById('txt-content');
const txtTitle = document.getElementById('txttitle'); 
const tbodyA = document.getElementById('tbodyA');
const vectorQ = document.getElementById('vectorQ');
const vectorA = document.getElementById('vectorA');
const vectorE = document.getElementById('vectorE');
const txt = document.getElementById('txt');
const btnReset = document.getElementById('reset');
const matrizTransicion = document.getElementById('matriz');
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
    // console.log(A,Q,Z);
    let tA = A.length;
    let tQ = Q.length;
    let tZ = Z.length;
    let max_vector_row = Math.max(tA,tQ,tZ);
    agregarFilasVector(A,'tbodyA',max_vector_row);
    agregarFilasVector(Q,'tbodyQ',max_vector_row);
    agregarFilasVector(Z,'tbodyZ',max_vector_row);
    agregarAlfabetoMatriz(Z,'alfabeto');
    // console.log("W:", W);
    imprimirMatriz(Q,Z,W);
    vectorA.style.display='block';
    vectorQ.style.display='block';
    vectorE.style.display='block';
    txt.style.display='block';
    btnReset.style.display='block';
    matrizTransicion.style.display='block';
  };

  lector.readAsText(archivo); 
  document.getElementById('carga-archivo-form').style.display = 'none';
});

async function LIMPIARCOMA(str){
  const contenido = str.match(/\{([^}]*)\}/)[1];
  const arrayElementos = contenido.split(',');
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


function agregarFilasVector(vector, tbodyV,tvector) {
  let rows = tvector;
  const tbody = document.getElementById(tbodyV);
  for (let i = 0; i < vector.length; i++) {
    let tr1 = document.createElement('tr');
    let th1 = document.createElement('th');
    th1.setAttribute('scope', 'row');
    th1.textContent = vector[i];
    tr1.appendChild(th1);
    tbody.appendChild(tr1);
    rows--;
  }
  if(rows>0){
    for (let i = 0; i < rows; i++) {
      let tr1 = document.createElement('tr');
      let th1 = document.createElement('th');
      th1.setAttribute('scope', 'row');
      th1.textContent = '\u00A0';
      tr1.appendChild(th1);
      tbody.appendChild(tr1);
    }
  }
}

function agregarAlfabetoMatriz(alfabeto, trA) {
  const tr = document.getElementById(trA);
  for (let i = 0; i < alfabeto.length; i++) {
    let th1 = document.createElement('th');
    th1.setAttribute('scope', 'row');
    th1.setAttribute('class','table-active')
    th1.textContent = alfabeto[i];
    tr.appendChild(th1);
  }

}


function imprimirMatriz(estados,alfabeto,transiciones){
  const tbody = document.getElementById('matrix');
  for(let i = 0; i<estados.length;i++) {
    let tr = document.createElement('tr');
    tr.id = `row-${i}`;
    let th1 = document.createElement('th');
    th1.setAttribute('scope', 'row');
    th1.textContent = estados[i];
    tr.appendChild(th1);
    //console.log(estados[i]);
    for (let j = 0; j < alfabeto.length; j++) {
      //console.log(alfabeto[j]);
      let transition ='';
      transiciones.forEach(e => {
        let [current_status, element, next_status] = e.replace(/[()]/g, '').split(',');              
        //console.log(current_status,element,next_status);
        if(current_status == estados[i]){
          if(alfabeto[j] == element){
            transition+=next_status;
          }
        }
      });
      if(transition != ''){
        let jointransition = transition.split('').sort().join(',');
        //console.log("Transición"+estados[i]+", "+alfabeto[j]+": "+jointransition);
        let th1 = document.createElement('th');
        th1.setAttribute('scope', 'row');
        th1.textContent = jointransition;
        tr.appendChild(th1);
      }else{
        //console.log("Transición"+estados[i]+", "+alfabeto[j]+": Espacio vacío");        
        let th1 = document.createElement('th');
        th1.setAttribute('scope', 'row');
        th1.textContent = '\u00A0';
        tr.appendChild(th1);
      }
    }
    tbody.appendChild(tr);
  }
}