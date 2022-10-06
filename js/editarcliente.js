(function(){

  let DB;
  const nombreInput = document.querySelector('#nombre');
  const emailInput = document.querySelector('#email');
  const telefonoInput = document.querySelector('#telefono');
  const empresaInput = document.querySelector('#empresa');
  
  document.addEventListener('DOMContentLoaded', () => {

    conetarDB();

    //comprovar o id da url
    const parametrosURL = new URLSearchParams(window.location.search);
    const idCliente = parametrosURL.get('id');
    
    if (idCliente) {
      setTimeout(() => {
        obtenerCliente(idCliente);
      }, 100);
    }
  });

  function obtenerCliente(id) {
    const transaction = DB.transaction(['crm'], 'readwrite');
    const objectStore = transaction.objectStore('crm');

    const cliente = objectStore.openCursor();
    cliente.onsuccess = function(e) {
      const cursor = e.target.result;

      if(cursor) {
        if(cursor.value.id === Number(id)) {
          preencherFormulario(cursor.value);
        }

        cursor.continue();
      }
    }
  }

  function preencherFormulario(datosCliente) {
    const { nombre, email, telefono, empresa } = datosCliente;

    nombreInput.value = nombre;
    emailInput.value = email;
    telefonoInput.value = telefono;
    empresaInput.value = empresa;
  }


  function conetarDB() {

    const abrirConexao = window.indexedDB.open('crm', 2);

    abrirConexao.onerror = function(){
      console.log('Ocorreu um erro')
    };

    abrirConexao.onsuccess = function(){
      DB = abrirConexao.result;
    }
  }

})()