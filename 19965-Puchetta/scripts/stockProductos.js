class Producto {
    constructor(codigoProducto, nombreProducto, tipoProducto, importado, precioCompra, precioVenta, stock) {
        this.codigoProducto = codigoProducto
        this.nombreProducto = nombreProducto
        this.tipoProducto = tipoProducto
        this.importado = importado
        this.precioCompra = precioCompra
        this.precioVenta = totalPrecioConImpuesto(precioCompra, importado) + precioCompra

        this.stock = stock + 1
    }
}

const arrayProductos = []
//SE CARGAN LOS DATOS AQUÍ PARA QUE NO SE AGREGUEN SIEMPRE QUE SALTA EL MENÚ
//OBJETO PRODUCTO
agregarProducto(new Producto(1001, "Kingston", "Memoria flash 8gb", "S", 120, totalPrecioConImpuesto(120, "S"), 1))
agregarProducto(new Producto(1002, "Kingston", "Camara web", "S", 140, totalPrecioConImpuesto(140, "S"), 1))
agregarProducto(new Producto(1003, "Lenovo", "Laptop refubrished core i5, 8gb de ram", "N", 240, totalPrecioConImpuesto(240, "S"), 1))

function agregarProducto(producto) {
    arrayProductos.push(producto)
   
}

function gananciaEmpresa(monto) {
    let ganancia = monto * .40
    return ganancia
}
//CALCULO DE PRECIO FINAL DE UN PRODUCTO, CON LA CONDICION SI SE HACE BOLETA O NO Y SI ES IMPORTADO O NO


function esImportado(monto, importado) {
    let impuesto = 0
    if (importado === "S" || importado === "s") {
        impuesto = monto * .06
        return impuesto
    } else if (importado === "N" || importado === "n") {
        return 0
    } else {
        error()

    }
}

function calculoImpuesto(monto, boleta) {
    if (boleta === "S" || boleta === "s") {
        let impuesto = monto * .21
        return impuesto
    } else if (boleta === "N" || boleta === "n") {
        return 0
    } else {

        error()
    }
}

function totalPrecioConImpuesto(monto, importado) {
    let precioFinal = gananciaEmpresa(monto) + esImportado(monto, importado) + monto
    return precioFinal
}

