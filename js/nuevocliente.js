(function(){

  let DB;
  const formulario = document.querySelector('#formulario')

  document.addEventListener('DOMContentLoaded', () => {

    conetarDB();

    formulario.addEventListener('submit', validarCliente)
  });

  

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

})()