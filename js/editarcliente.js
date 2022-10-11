(function(){

  let DB;
  let idCliente;

  const nombreInput = document.querySelector('#nombre');
  const emailInput = document.querySelector('#email');
  const telefonoInput = document.querySelector('#telefono');
  const empresaInput = document.querySelector('#empresa');

  const formulario = document.querySelector('#formulario');
  
  document.addEventListener('DOMContentLoaded', () => {

    //atualizar cliente
    formulario.addEventListener('submit', atualizarCliente)

    conetarDB();

    //comprovar o id da url
    const parametrosURL = new URLSearchParams(window.location.search);
    idCliente = parametrosURL.get('id');
    
    if (idCliente) {
      setTimeout(() => {
        obtenerCliente(idCliente);
      }, 100);
    }
  });

  //atualizar cliente
  function atualizarCliente(e){
    e.preventDefault();
    if( nombreInput.value === "" || emailInput.value === "" || telefonoInput.value === "" || empresaInput.value === "") {
      imprimirAlerta("Nenhum campo pode estar vazio", "error");
      return;
    };

    const clienteAtualizado = {
      nombre: nombreInput.value,
      email: emailInput.value,
      telefone: telefonoInput.value,
      empresa: empresaInput.value,
      id: Number(idCliente)
    }
    
    const transaction = DB.transaction(['crm'], 'readwrite');
    const objectStore = transaction.objectStore('crm');

    objectStore.put(clienteAtualizado);

    transaction.oncomplete = function(){
      imprimirAlerta("Cliente atualizado corretamente");

      setTimeout(() => {
        window.location.href = "index.html";
      }, 3000);
    }

    transaction.onerror = function(){
      imprimirAlerta("Ocorreu um erro")
    }
    
  }

  //obtener da base de dados o cliente que vamos atualizar
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

  //preecher o formulario com os dados do cliente que vamos atualizar
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