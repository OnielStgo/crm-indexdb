(function(){

  let DB;

  document.addEventListener('DOMContentLoaded', () => {
    criarDB();
  });

  //criar a base de dados em indexDB
  function criarDB(){
    const criarDB = window.indexedDB.open('crm', 2);

    criarDB.onerror = function(){
      console.log('Ocorreu um erro');
    };
  
    criarDB.onsuccess = function(){
      DB = criarDB.result;
    };
  
    criarDB.onupgradeneeded = function(e){
      const db = e.target.result;
      
      const objectStore = db.createObjectStore('crm', {keyPath: 'id', autoIncrement: true});
  
      objectStore.createIndex('nombre', 'nombre', {unique: false});
      objectStore.createIndex('email', 'email', {unique: true});
      objectStore.createIndex('telefono', 'telefono', {unique: false});
      objectStore.createIndex('empresa', 'empresa', {unique: false});
      objectStore.createIndex('id', 'id', {unique: true});
  
      console.log('DB pronta e criada');
      
    }
  }
})()

