(function(){

  let DB;
  const formulario = document.querySelector('#formulario')

  document.addEventListener('DOMContentLoaded', () => {

    conetarDB();

    formulario.addEventListener('submit', validarCliente)
  });

  //conetar à base de dados
  function conetarDB(){

    const abrirConexao = window.indexedDB.open('crm', 2);

    abrirConexao.onerror = function(){
      console.log('Ocorreu um erro')
    };

    abrirConexao.onsuccess = function(){
      DB = abrirConexao.result;
    }
  }

  function validarCliente(e){
    e.preventDefault();
    
    //ler os dados do formulario
    const nombre = document.querySelector('#nombre').value;
    const email = document.querySelector('#email').value;
    const telefono = document.querySelector('#telefono').value;
    const empresa = document.querySelector('#empresa').value;
    
    if(nombre === "" || email === "" || telefono === "" || empresa === ""){
      imprimirAlerta('Todos os campos são obrigatórios', 'error');
      return;
    }

    //criar um objeto com a informação
    const cliente = {
      nombre,
      email,
      telefono,
      empresa,
      id: Date.now()
    }

    console.log(cliente)
    
    criarNovoCliente(cliente);
  }

  //cadastrar novo cliente na base de dados
  function criarNovoCliente(cliente){
    const transaction = DB.transaction(['crm'], 'readwrite');
    const objectStore = transaction.objectStore('crm')
    
    transaction.onerror = function(){
      
      imprimirAlerta('Ocorreu um erro', 'error')
    };

    transaction.oncomplete = function(){
      
      imprimirAlerta('Cliente adicionado corretamente!');

      setTimeout(() => {
        window.location.href = "index.html";
      }, 3000);
    }

    objectStore.add(cliente)
  }

  //imprimir mensages
  function imprimirAlerta(mensaje, tipo){

    const alerta = document.querySelector('.alerta');

    if(!alerta){
      //criar alerta
      const divMensaje = document.createElement('div');
      divMensaje.classList.add('px-4', 'py-3', 'rounded', 'max-w-lg', 'mx-auto', 'mt-6', 'text-center', 'border', 'alerta');

      if(tipo === 'error'){
        divMensaje.classList.add('bg-red-100', 'border-red-400', 'text-red-700');
      } else {
        divMensaje.classList.add('bg-green-100', 'border-grenn-400', 'text-green-400');
      }

      divMensaje.textContent = mensaje;

      formulario.appendChild(divMensaje);

      setTimeout(() => {
        divMensaje.remove();
      }, 3000);
    } 
  }

})()