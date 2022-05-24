let header = document.getElementById("menuNav")
let navbar = document.createElement("nav")
navbar.classList.add("navbar", "navbar-expand-lg", "navbar-light", "bg-light")
navbar.innerHTML=` <div class="container-fluid">
<a class="navbar-brand" href="#">Simulador</a>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
    <ul class="navbar-nav me-auto mb-2 mb-lg-0">
      <li class="nav-item">
        <a class="nav-link active" aria-current="page" href="#">Ingresa un producto</a>
      </li>
      <li class="nav-item">
        <a class="nav-link" href="#">Ingresa un cliente</a>
      </li>
    </ul>
</div>
</div>
`
header.appendChild(navbar)






class Producto {
    constructor (nombre, precio) {
        this.nombre = nombre.toUpperCase();
        this.precio = parseFloat(precio);
        this.existencias = [];
    }
    agregarExistencia(existencia) {
        this.existencia.push(existencia);
    }
    sumaIva() {
        this.precio = this.precio*1.16;
    }
}

class Existencia {
    constructor(cantidad, unidad) {
        this.cantidad = Number(cantidad);
        this.unidad = unidad.toUpperCase();
    }
}

const productos = [];

productos.push (new Producto ("Desarmador", 25.86));
productos.push (new Producto ("Tubo PVC 4", 70));
productos.push (new Producto ("Taladro B&D", 250));

const existencias = [];

existencias.push(new Existencia("2", "Pieza"));
existencias.push(new Existencia ("3", "Tubo 6m"));
existencias.push(new Existencia ("1", "Pieza"));

for (const Producto of productos)
for (const Existencia of existencias)
    Producto.sumaIva();
console.log(productos)
console.log(existencias)