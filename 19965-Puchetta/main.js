class Persona {
    constructor(nombre, apellido, documento, edad, direccion, telefono, categoria) {
        this.nombre = nombre
        this.apellido = apellido
        this.documento = documento
        this.edad = edad
        this.direccion = direccion
        this.telefono = telefono
        this.categoria = categoria
    }
}

const arrayTrabajadores = []

function agregarTrabajador(trabajador) {
    arrayTrabajadores.push(trabajador)
}


//METODOS DE CLASE PERSONA
//CALCULO DE SUELDO DE TRABAJADOR, SEGUN CATEGOR�A Y ESCALAF�N IMPOSITIVO
function impuestoJubilatorio(sueldo) {
    let aporte = sueldo * .07
    return aporte
}

function impuestoPersonasFisicas(sueldo) {
    let aporte = 0
    if (sueldo < 25000) {
        return aporte
    } else if ((sueldo >= 25000) && (sueldo <= 34999)) {
        aporte = sueldo * .05
        return aporte

    } else if ((sueldo >= 35000) && (sueldo <= 44999)) {
        aporte = sueldo * .08
        return aporte

    } else if ((sueldo >= 45000) && (sueldo <= 59999)) {
        aporte = sueldo * .12
        return aporte

    } else if ((sueldo >= 60000) && (sueldo <= 80000)) {
        aporte = sueldo * .15
        return aporte

    } else {
        aporte = sueldo * .20
        return aporte
    }
}

function categoriaTrabajador(categoria) {
    let sueldo = 0
    switch (parseInt(categoria)) {
        case 1:
            sueldo = 24000
            break
        case 2:
            sueldo = 30000
            break
        case 3:
            sueldo = 42000
            break
        case 4:
            sueldo = 55000
            break
        case 5:
            sueldo = 68000
            break
        case 6:
            sueldo = 86000
            break
        default:
            console.log("La categor�a no existe")
            break
    }
    return sueldo
}

function calculoSueldo(categoria, aporte) {
    let sueldoLiquido = categoriaTrabajador(categoria) - aporte
    return sueldoLiquido
}


class Producto {
    constructor(codigoProducto, nombreProducto, tipoProducto, importado, precioCompra, precioVenta, stock) {
        this.codigoProducto = codigoProducto
        this.nombreProducto = nombreProducto
        this.tipoProducto = tipoProducto
        this.importado = importado
        this.precioCompra = precioCompra
        this.precioVenta = precioVenta
        this.stock = stock
    }
}
//MÉTODOS CLASE PRODUCTO

const arrayProductos = []

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

function toString(trabajador) {

    return "Nombre: " + trabajador.nombre + "\n" + "Apellido: " + trabajador.apellido + "\n" + "Documento: " + trabajador.documento + "\n" + "Categoría: " + trabajador.categoria + "\n" + "Telefono: " + trabajador.telefono + "\n\n"
}

function toString(producto) {

    return "Codigo: " + producto.codigoProducto + "\n" + "Nombre: " + producto.nombreProducto + "\n" + "Tipo: " + producto.tipoProducto + "\n" + "Importado: " + producto.importado + "\n" + "Precio costo: " + producto.precioCompra + "\n" + "Precio venta: " + producto.precioVenta + "\n" + "Stock: " + producto.stock + "\n\n"
}

function error() {
    alert("Algo salió mal, reintente")
}

//SE CARGAN LOS DATOS AQUÍ PARA QUE NO SE AGREGUEN SIEMPRE QUE SALTA EL MENÚ
//OBJETO PRODUCTO
agregarProducto(new Producto(1001, "Kingston", "Memoria flash 8gb", "S", 120, 175, +1))




//OBJETO TRABAJADOR

agregarTrabajador(new Persona("Bruno", "Puchetta", 43589726, 33, "JJ Severino 1414", 091689780, 4))
agregarTrabajador(new Persona("Carolina", "Rodríguez", 47693464, 26, "Andromeda 10345", 092444556, 5))
agregarTrabajador(new Persona("María", "Paz", 36365034, 58, "Jose Livi 8919", 092667890, 3))




//COMIENZA LA PARTE INTERACTIVA CON EL USUARIO

let opcion = 1
while (opcion != 0) {

    opcion = prompt("1- Realizar venta\n" +
        "2- Ingresar producto\n" +
        "3- Lista de productos\n" +
        "4- Liquidar sueldo\n" +
        "5- Ingresar persona\n" +
        "6- Buscar persona\n" +
        "0- Salir\n")
    switch (parseInt(opcion)) {
        case 1:

            let cadena = prompt("Ingrese palabra clave")
            let precioVenta = 0
            for (const producto of arrayProductos) {
                if (producto.nombreProducto.includes(cadena)) {
                    console.log(toString(producto))
                    precioVenta = producto.precioVenta

                }
            }
            let boleta = prompt("Hacer factura?")
            precioVentaFinal = calculoImpuesto(precioVenta, boleta) + precioVenta

            console.log("Precio venta al público: " + precioVentaFinal)

            //FALTA DESCONTAR DEL STOCK


            break

        case 2:


            let flag2 = 1

            let codigo = 0
            codigo = prompt("Ingrese codigo producto")
            while (flag2 != 0) {
                for (let producto of arrayProductos) {
                    if (producto.codigoProducto == parseInt(codigo)) {
                        alert("Ya existe el código para este artículo: " + toString(producto))

                        let op = prompt("Desea sumarlo al stock?")
                        if (op === "S" || op === "s") {
                            producto.stock += 1
                            flag2 = 0
                            break

                        } else {
                            flag2 = 0
                            break
                        }
                    } else {
                        let monto = prompt("Ingrese el precio de compra del producto")
                        let importado = prompt("Es un producto importado?")
                        let marca = prompt("Ingrese la marca")
                        let tipo = prompt("Ingrese el tipo de producto")
                        let stock = +1
                        agregarProducto(new Producto(parseInt(codigo), marca, tipo, importado, parseInt(monto), totalPrecioConImpuesto(parseInt(monto), importado), stock))
                        flag2 = 0
                        break

                    }
                }
            }






        case 3:

            let result = ""
            for (const producto of arrayProductos) {
                result += toString(producto)
            }
            console.log(result)
            break


        case 4:


            let documentoId = prompt("Ingrese documento de identidad del trabajador")


            for (const trabajador of arrayTrabajadores) {

                if (trabajador.documento === parseInt(documentoId)) {
                    categoria = trabajador.categoria
                    let aportePersonasFisicas = impuestoPersonasFisicas(categoriaTrabajador(categoria))
                    let aporteJubilatorio = impuestoJubilatorio(categoriaTrabajador(categoria))
                    let aporteTotal = aporteJubilatorio + aportePersonasFisicas

                    alert("A " + trabajador.nombre + " le corresponde cobrar " + calculoSueldo(categoria, aporteTotal))
                }
            }

        case 5:


            let nombre = prompt("Ingrese nombre")
            let apellido = prompt("Ingrse apellido")
            let documento = prompt("Ingrese documento")
            let edad = prompt("Ingrese edad")
            let direccion = prompt("Ingrese dirección")
            let telefono = prompt("Ingrese número de teléfono")
            let categoria = prompt("Ingrese categoría del trabajador")
            while (categoria < 1 || categoria > 6) {
                categoria = prompt("Ingrese categoría del trabajador")
            }



            agregarTrabajador(new Persona(nombre, apellido, parseInt(documento), edad, direccion, telefono, categoria))

            break

        case 6:
            let opcion = 1
            while (opcion != 0) {
                opcion = prompt("1- Lista general\n" +
                    "2- Búsqueda por documento\n" +
                    "0- Atrás")
                switch (opcion) {

                    case "1":
                        let result = ""
                        for (const trabajador of arrayTrabajadores) {
                            result += toString(trabajador)
                        }
                        console.log(result)
                        break


                    case "2":

                        let doc = prompt("Ingrese documento para buscar")

                        let resultado = arrayTrabajadores.find(item => item.documento === parseInt(doc))
                        if (resultado != undefined) {
                            console.log(toString(resultado))
                        } else {
                            error()
                        }
                        break



                    case 0:


                }
            }
    }
}