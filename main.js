const formDetalle = document.getElementById("formDetalle");
const inputCantidad = document.getElementById("inputCantidad");
const selectDescripcion = document.getElementById("selectDescripcion");
const inputPUnitario = document.getElementById("inputPUnitario");
const inputPTotal = document.getElementById("inputPTotal");
const cuerpoTabla = document.getElementById("cuerpoTabla");
const btnGuardar = document.getElementById("btnGuardar");
const inputNombre = document.getElementById ("inputNombre");
const inputRfc = document.getElementById("inputRfc");
const inputFolio = document.getElementById("inputFolio");
const inputDireccion = document.getElementById("inputDireccion");
const inputFecha = document.getElementById("inputFecha");
const formCabecera = document.getElementById("formCabecera")

let facturas = [];
let arregloDetalle = [];
let arregloProductos = [
    { id: 1, nombre: "Mouse Logitech", precio: 100.00},
    { id: 2, nombre: "Pad para Mouse", precio: 25.86},
    { id: 3, nombre: "Gomas de auriculares", precio: 13.19},
    { id: 4, nombre: "Auriculares", precio: 50.00},
];

const verificarFacturasLocalStorage = () => {
    const facturasLS = JSON.parse(localStorage.getItem("facturas"));
    facturas = facturasLS || [];
}
verificarFacturasLocalStorage();

const llenarProductos = () => {
    arregloProductos.forEach ((p) => {
        const option = document.createElement("option");
        option.value = p.id;
        option.innerText = p.nombre;
        selectDescripcion.appendChild(option);
})
};

llenarProductos();

const getNombreProductoById = (id) => {
    const objProducto = arregloProductos.find((p)=>{
        if(p.id === +id) {
            return p;
        }
    });
    return objProducto.nombre;
}
const getPrecioProductoById = (id) => {
    const objProducto = arregloProductos.find((p)=>{
        if(p.id === +id) {
            return p;
        }
    });
    return objProducto.precio;
}

const redibujarTabla =()=>{
    cuerpoTabla.innerHTML = "";
   arregloDetalle.forEach((detalle)=>{
       let fila = document.createElement("tr")
       fila.innerHTML = `<td>${detalle.cant}</td>
                         <td>${getNombreProductoById(detalle.descripcion)}</td>
                         <td>${detalle.pUnit}</td>
                         <td>${detalle.pTotal}</td>`;
        let tdEliminar = document.createElement("td");

        let botonEliminar = document.createElement("button");
        botonEliminar.classList.add("btn", "btn-danger");
        botonEliminar.innerText = "Eliminar";
        botonEliminar.onclick= ()=>{
            eliminarDetalleById(detalle.descripcion);
        }
        tdEliminar.appendChild(botonEliminar);
        fila.appendChild(tdEliminar);
        cuerpoTabla.appendChild(fila)
   }) 
}

const eliminarDetalleById = (id) =>{
    arregloDetalle = arregloDetalle.filter((detalle) =>{
        if (+id !== +detalle.descripcion){
            return detalle;
            
        }
    });
    
    redibujarTabla();
    Swal.fire("Partida eliminada")
    
}

const agregarDetalle = (objDetalle) => {
    //Buscar si el objeto detalle ya existía en el arreglo detalle
    // de ser así, sumar las cantidades para que solo aparezca una sola vez en el arreglo
    const resultado = arregloDetalle.find ((detalle)=>{
        if(+objDetalle.descripcion === +detalle.descripcion)
            return detalle
    })
    
    if(resultado){
    arregloDetalle = arregloDetalle.map((detalle)=> {
        if(+detalle.descripcion == +objDetalle.descripcion){
            return {
                cant: +detalle.cant + +objDetalle.cant,
                descripcion: detalle.descripcion,
                pUnit: +detalle.pUnit,
                pTotal: (+detalle.cant + +objDetalle.cant)* +detalle.pUnit,
            }
        }
        return detalle;
    })
    } else {
    arregloDetalle.push(objDetalle);
};
}

formDetalle.onsubmit = (e) => {
    e.preventDefault();
    //Crear Objeto Detalle
    const objDetalle ={
        cant: inputCantidad.value,
        descripcion: selectDescripcion.value,
        pUnit: inputPUnitario.value,
        pTotal: inputPTotal.value,
    };
    agregarDetalle(objDetalle);
    console.log(arregloDetalle);
    redibujarTabla();
};

btnGuardar.onclick = () => {
    //crear el objeto de la cabecera de la factura
    let objFactura = {
        nombre: inputNombre.value,
        rfc: inputRfc.value,
        folio: inputFolio.value,
        direccion: inputDireccion.value,
        fecha: inputFecha.value,
        detalle: arregloDetalle,
    };
    facturas.push(objFactura);
    //limpiar campos
    formCabecera.reset();
    formDetalle.reset();
    //guardar en el localStorage
    localStorage.setItem("facturas", JSON.stringify(facturas));
    //borrar la tabla
    arregloDetalle=[];
    redibujarTabla();
};

selectDescripcion.onchange=()=>{
    if (selectDescripcion.value =="0") {
        formDetalle.reset();
        return;
    }

    // selectDescripcion.value =="0" ? formDetalle.reset():alert("no deberías ver esto");
    
    const precio = getPrecioProductoById(selectDescripcion.value);
    if (precio) {
        inputPUnitario.value=precio;
        calcularTotal();
    }
    
};

const calcularTotal = () => {
    const cantidad = +inputCantidad.value;
    const pUnit = +inputPUnitario.value;
    const total = cantidad*pUnit;
    inputPTotal.value = total.toFixed(2);
}

inputCantidad.onkeyup = () => {
    calcularTotal();
}
inputCantidad.onchange = () => {
    calcularTotal();
}
