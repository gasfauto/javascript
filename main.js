const inputNombre = document.getElementById ("inputNombre");
const inputRfc = document.getElementById("inputRfc");
const inputFolio = document.getElementById("inputFolio");
const inputDireccion = document.getElementById("inputDireccion");
const inputFecha = document.getElementById("inputFecha");
const formCabecera = document.getElementById("formCabecera")

let facturas = [];

const verificarFacturasLocalStorage = () => {
    const facturasLS = JSON.parse(localStorage.getItem("facturas"));
    facturas = facturasLS || [];
}
verificarFacturasLocalStorage();

document.addEventListener("DOMContentLoaded", () => {
    fetchData()
})

const fetchData = async () => {
    try {
        const res = await fetch('api.json')
        const data = await res.json()
        pintarProductos(data)
        detectarBotones(data)
    } catch (error) {
        console.log(error)
    }
}

const contendorProductos = document.querySelector('#contenedor-productos')
const pintarProductos = (data) => {
    const template = document.querySelector('#template-productos').content
    const fragment = document.createDocumentFragment()
    data.forEach(producto => {
        template.querySelector('img').setAttribute('src', producto.thumbnailUrl)
        template.querySelector('h5').textContent = producto.title
        template.querySelector('p span').textContent = producto.precio
        template.querySelector('button').dataset.id = producto.id
        const clone = template.cloneNode(true)
        fragment.appendChild(clone)
    })
    contendorProductos.appendChild(fragment)
}

let carrito = {}

const detectarBotones = (data) => {
    const botones = document.querySelectorAll('.card button')

    botones.forEach(btn => {
        btn.addEventListener('click', () => {
            const producto = data.find(item => item.id === parseInt(btn.dataset.id))
            producto.cantidad = 1
            if (carrito.hasOwnProperty(producto.id)) {
                producto.cantidad = carrito[producto.id].cantidad + 1
            }
            carrito[producto.id] = { ...producto }
            pintarCarrito()
        })
    })
}

const items = document.querySelector('#items')

const pintarCarrito = () => {

    items.innerHTML = ''

    const template = document.querySelector('#template-carrito').content
    const fragment = document.createDocumentFragment()

    Object.values(carrito).forEach(producto => {

        template.querySelector('th').textContent = producto.id
        template.querySelectorAll('td')[0].textContent = producto.title
        template.querySelectorAll('td')[1].textContent = producto.cantidad
        template.querySelector('span').textContent = producto.precio * producto.cantidad
        
        //botones
        template.querySelector('.btn-info').dataset.id = producto.id
        template.querySelector('.btn-danger').dataset.id = producto.id

        const clone = template.cloneNode(true)
        fragment.appendChild(clone)
    })

    items.appendChild(fragment)

    pintarFooter()
    accionBotones()

}

const footer = document.querySelector('#footer-carrito')
const pintarFooter = () => {

    footer.innerHTML = ''

    if (Object.keys(carrito).length === 0) {
        footer.innerHTML = `
        <th scope="row" colspan="5"></th>
        `
        return
    }

    const template = document.querySelector('#template-footer').content
    const fragment = document.createDocumentFragment()

    // sumar cantidad y sumar totales
    const nCantidad = Object.values(carrito).reduce((acc, { cantidad }) => acc + cantidad, 0)
    const nPrecio = Object.values(carrito).reduce((acc, {cantidad, precio}) => acc + cantidad * precio ,0)
   

    template.querySelectorAll('td')[0].textContent = nCantidad
    template.querySelector('span').textContent = nPrecio

    const clone = template.cloneNode(true)
    fragment.appendChild(clone)

    footer.appendChild(fragment)


    const boton = document.querySelector('#vaciar-carrito')
    boton.addEventListener('click', () => {
        carrito = {}
        pintarCarrito()
        Swal.fire("Partidas eliminadas")
    })

}

const accionBotones = () => {
    const botonesAgregar = document.querySelectorAll('#items .btn-info')
    const botonesEliminar = document.querySelectorAll('#items .btn-danger')

    // console.log(botonesAgregar)

    botonesAgregar.forEach(btn => {
        btn.addEventListener('click', () => {
            // console.log(btn.dataset.id)
            const producto = carrito[btn.dataset.id]
            producto.cantidad ++
            carrito[btn.dataset.id] = { ...producto }
            pintarCarrito()
        })
    })

    botonesEliminar.forEach(btn => {
        btn.addEventListener('click', () => {
            // console.log('eliminando...')
            const producto = carrito[btn.dataset.id]
            producto.cantidad--
            if (producto.cantidad === 0) {
                delete carrito[btn.dataset.id]
            } else {
                carrito[btn.dataset.id] = { ...producto }
            }
            pintarCarrito()
        })
    })
}

btnGuardar.onclick = () => {
    //crear el objeto de la cabecera de la factura
    let objFactura = {
        nombre: inputNombre.value,
        rfc: inputRfc.value,
        folio: inputFolio.value,
        direccion: inputDireccion.value,
        fecha: inputFecha.value,
        detalle: carrito,
    };
    facturas.push(objFactura);
    //limpiar campos
    formCabecera.reset();
    carrito = {}
        pintarCarrito();
    //guardar en el localStorage
    localStorage.setItem("facturas", JSON.stringify(facturas));
};