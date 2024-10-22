const inputArchivo = document.getElementById('archivo');
const btnEjecutar = document.getElementById('btn-ejecutar');
const txtContent = document.getElementById('txt-content');
const txtTitle = document.getElementById('txttitle'); 
let title = '';

// Detecta si se selecciona un archivo
inputArchivo.addEventListener('change', function() {
  const archivo = inputArchivo.files[0]; // Obtiene el archivo seleccionado

  if (archivo) {
    const extension = archivo.name.split('.').pop().toLowerCase(); // Extrae la extensión
    title = 'Contenido de archivo ' + archivo.name;


    if (extension === 'txt') {
      btnEjecutar.disabled = false; // Habilita el botón si es un .txt
    } else {
      alert('El formato del archivo no es compatible con esta función. Solo se aceptan archivos .txt.');
      window.location.reload(); // Recarga la página
    }
  }
});


// Lee el contenido del archivo al hacer clic en "Ejecutar"
btnEjecutar.addEventListener('click', function () {
  event.preventDefault();
  const archivo = inputArchivo.files[0];
  const lector = new FileReader();
  txtTitle.textContent = title;

  lector.onload = function (event) {
    txtContent.value = event.target.result; // Muestra el contenido en el textarea
    console.log(txtContent.value);
  };

  lector.readAsText(archivo); // Lee el archivo como texto
  document.getElementById('carga-archivo-form').style.display = 'none';
});