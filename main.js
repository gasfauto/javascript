class Producto {
    constructor(idp, nombreProducto, precio, cantidad, unidad){
        this.idp = Number(idp);
        this.nombreProducto = nombreProducto.toUpperCase();
        this.precio = parseFloat(precio);
        this.cantidad = parseFloat(cantidad);
        this.unidad= (unidad)
    }
}

class Cliente {
    constructor(idc, nombreCliente, rfc, cp, regimen){
        this.idc=Number(idc);
        this.nombreCliente=nombreCliente.toUpperCase();
        this.rfc=(rfc);
        this.cp=Number(cp);
        this.regimen=(regimen)
    }
}

let opcion = prompt("Selecciona la opción deseada \n 1 - Registrar un producto \n 2 - Registrar un cliente");

while (opcion >2 || opcion <1) {
    alert('No ingreso un número válido, intente nuevamente.');
    opcion = prompt("Selecciona la opción deseada \n 1 - Registrar un producto \n 2 - Registrar un cliente")
}

switch (opcion) {
    case "1":
        const idp = prompt ('Ingrese el Id del producto');
        const nombreProducto = prompt ('Ingrese el nombre del producto');
        const precio = prompt ('Ingrese el precio del producto');
        const cantidad = prompt ('ingrese la cantidad de productos');
        const unidad = prompt ('ingrese la unidad del producto (Kg, Pieza, L, etc.)')
        
        const productoCreado = new Producto(idp, nombreProducto, precio, cantidad,unidad)

        console.log(productoCreado);
    
    case "2":
        const idc = prompt ('Ingrese el Id del cliente');
        const nombreCliente = prompt ('Ingrese el nombre del cliente');
        const rfc = prompt ('Ingrese el rfc del cliente');
        const cp = prompt ('ingrese el código postal del cliente');
        const regimen = prompt ('ingrese el régimen fiscal del cliente')
        
        const clienteCreado = new Cliente(idc, nombreCliente, rfc, cp,regimen)

        console.log(clienteCreado);
        
}