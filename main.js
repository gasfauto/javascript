const formularioCliente = document.getElementById('customerForm');
const botonMostrar = document.getElementById('showInfo');
const botonBorrar = document.getElementById('deleteInfo');
const infoContainer = document.getElementById('infoContainer');

const guardarInfo = (e) => {
  e.preventDefault();
  const nombre = document.getElementById('name').value;
  const apellido = document.getElementById('lastName').value;
  const rfc = document.getElementById('rfc').value;

  const customerInfo = {
    nombre: nombre,
    apellido: apellido,
    rfc: rfc,
  };
  const listaClientes = localStorage.getItem('customerList');
  const listaClientesParseada = JSON.parse(listaClientes) || [];
  listaClientesParseada.push(customerInfo);
  localStorage.setItem('customerList', JSON.stringify(listaClientesParseada));

  formularioCliente.reset();
  mostrarInfo();
};

const mostrarInfo = () => {
  infoContainer.innerHTML = '';
  const infoDesdeStorage = localStorage.getItem('customerList');

  if (infoDesdeStorage) {
    const infoParseada = JSON.parse(infoDesdeStorage);
    infoParseada.forEach((customer, indexDelCustomer)=>{
      const nuevaCard = document.createElement('div');
      nuevaCard.className = "card";
      nuevaCard.innerHTML = `
      <h5>${customer.nombre}</h5>
      <h6>${customer.apellido}</h6>
      <p>${customer.rfc}</p>
      <button type="button" onclick="borrarItemEspecifico(${indexDelCustomer})">Borrar Item</button>
      `
      infoContainer.append(nuevaCard)
    })
  } else {
    infoContainer.innerHTML = '<h2>No hay info para mostrar</h2>'
  }
}

const borrarListaStorage = () => {
  localStorage.removeItem('customerList');
  mostrarInfo();
}

const borrarItemEspecifico = (indiceDelCliente)=> {
  const infoDesdeStorage = localStorage.getItem('customerList');
  const infoParseada = JSON.parse(infoDesdeStorage);
  if(infoParseada.length ===1) {
    borrarListaStorage();
  } else {
    infoParseada.splice(indiceDelCliente, 1);
    localStorage.setItem('customerList', JSON.stringify(infoParseada))
  }
}

formularioCliente.onsubmit = (e) =>guardarInfo(e);
botonMostrar.onclick = () => mostrarInfo();
botonBorrar.onclick = () => borrarListaStorage();