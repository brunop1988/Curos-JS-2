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
//MÉTODOS CLASE PRODUCTO

const arrayProductos = []


function agregarProducto(producto) {
    arrayProductos.push(producto)
    segunUsuario(producto)



}

function segunUsuario() {
    if (localStorage.getItem("TipoUsuario") === "Comun") {
        listaParaVentas()
    } else {
        if (localStorage.getItem("TipoUsuario") === "Admin") {
            generarLista()
            venderProducto()

        }

    }
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
    }
}

function calculoImpuesto(monto, boleta) {
    if (boleta === "S" || boleta === "s") {
        let impuesto = monto * .21
        return impuesto
    } else if (boleta === "N" || boleta === "n") {
        return 0
    }
}

function totalPrecioConImpuesto(monto, importado) {
    let precioFinal = gananciaEmpresa(monto) + esImportado(monto, importado) + monto
    return precioFinal
}



function toString(producto) {

    return "Codigo: " + producto.codigoProducto + "\n" + "Nombre: " + producto.nombreProducto + "\n" + "Tipo: " + producto.tipoProducto + "\n" + "Importado: " + producto.importado + "\n" + "Precio costo: " + producto.precioCompra + "\n" + "Precio venta: " + producto.precioVenta + "\n" + "Stock: " + producto.stock + "\n\n"
}

function error() {
    alert("Algo salió mal, reintente")
}




//SE CARGAN LOS DATOS AQUÍ PARA QUE NO SE AGREGUEN SIEMPRE QUE SALTA EL MENÚ
//OBJETO PRODUCTO
agregarProducto(new Producto(1001, "Kingston", "Memoria flash 8gb", "S", 120, totalPrecioConImpuesto(120, "S"), 1))
agregarProducto(new Producto(1002, "Kingston", "Camara web", "S", 140, totalPrecioConImpuesto(140, "S"), 1))
agregarProducto(new Producto(1003, "Lenovo", "Laptop refubrished core i5, 8gb de ram", "N", 240, totalPrecioConImpuesto(240, "S"), 1))

//COMIENZA LA PARTE INTERACTIVA CON EL USUARIO


//SESIÓN ACTUAL
let usuarioActual = document.getElementById("espacioUsuario")
let parrafoUsuario = document.createElement("p")
parrafoUsuario.innerHTML = `<strong> Estás logueado como: ${localStorage.getItem("Nombre")}</strong>`
usuarioActual.appendChild(parrafoUsuario)

//FUNCION PARA QUE EL ADMINISTRADOR VENDA PRODUCTOS Y LOS REGISTRE EN LA PC
function venderProducto() {


    const formulario2 = document.getElementById("venderProducto")

    formulario2.innerHTML = " "

    for (const producto of arrayProductos) {


        let mensaje = document.createElement("div")
        mensaje.innerHTML = `
                <form id="${producto.codigoProducto}">
                <p class="parrafoID"> id: ${producto.codigoProducto} </h5>
                <p> Nombre: ${producto.nombreProducto} </p>
                <p> Tipo: ${producto.tipoProducto}</p>
                <p> Precio: ${producto.precioCompra} </p>
                <p> Precio venta facturado: ${parseInt(calculoImpuesto(producto.precioVenta,"S")+totalPrecioConImpuesto(producto.precioVenta,producto.importado))}</p>
                <p> Precio venta sin facturar: ${producto.precioVenta}</p>
                <p> Stock: ${producto.stock} </p>
                <label> Hacer boleta?</label>
                <input type="text" name="boleta"> 
                <button type="submit"> Confirmar </button>
                </form>
                `



        formulario2.appendChild(mensaje)


    }

}

//FUNCION PARA MOSTRAR PRODUCTOS FACTURADOS
function factura() {
    const arrayVentas = []
    const formulario = document.getElementById("control")
    formulario.addEventListener('submit', e => {
        e.preventDefault()
        const formData1 = new FormData(e.target)
        const formProps1 = Object.fromEntries(formData1)
        let objVentas
        for (const producto of arrayProductos) {
            if (formProps1.boleta) {
                objVentas = {
                    "Nombre: ": producto.nombreProducto,
                    "Codigo. ": producto.codigoProducto,
                    "Facturado: ": boleta,
                    "Precio final: ": producto.precioFinal
                }
                arrayVentas.push(objVentas)

            }
        }
        let form = document.getElementById("avisoFactura")
        let mensaje = document.createElement("li")
        mensaje.innerHTML = `<p> ${objVentas["Nombre: "]}</p
                            <p> ${objVentas["Facturado: "]}</p`

        form.appendChild(mensaje)
    })
}

//INGRESA A LA LISTA DE PRODUCTOS DE LOS ADMINISTRADORES
function ingresarProducto() {

    const formulario = document.getElementById("ingresarProducto")
    formulario.addEventListener('submit', e => {
        e.preventDefault()
            //LIMPIAMOS LA CONFIRMACION DE PRODUCTO AGREGADO

        const formData1 = new FormData(e.target)
        const formProps1 = Object.fromEntries(formData1)
        let nombre = formProps1.nombre
        let tipo = formProps1.tipo
            //RECORRO Y COMPARO CADA OBJETO producto CONTRA UN input CON ATRIBUTO name=codigo

        let encontrado = arrayProductos.find(item => item.nombreProducto === nombre)
        let encontrado2 = arrayProductos.find(item => item.tipoProducto === tipo)

        let flag = 1

        for (let i = 0; i < arrayProductos.length - 1; i++) {
            while (flag != 0) {
                if (encontrado != undefined && encontrado2 != undefined) {
                    if ((nombre == arrayProductos[i].nombreProducto) && (tipo == arrayProductos[i].tipoProducto)) {

                        /*SI EL CODIGO YA EXISTE, AGREGO AL STOCK DEL PRODCUTO EN CASO DE ASI DESEARLO 
                        SINO AGERGO UN NUEVO PRODUCTO SIEMPRE Y CUANDO EL CODIGO NO EXISTA PREVIAMENTE
                        */
                        encontrado.stock += 1
                            //SE RENUEVAN LAS LISTAS

                        segunUsuario()
                            //CONFIRMA AGREGADO
                        confirmarAgregado(encontrado, encontrado2)

                        //LIMPIAR CAMPOS
                        document.getElementById("limpiarFormulario").reset()

                        flag = 0

                    }
                } else {
                    if ((encontrado == undefined && encontrado2 == undefined)) {

                        obj = new Producto()
                        obj.codigoProducto = obtenerUltimoCodigo() + 1
                        obj.precioCompra = Number(formProps1.precioCompra)
                        obj.importado = formProps1.importado
                        obj.nombreProducto = formProps1.nombre
                        obj.tipoProducto = formProps1.tipo
                        obj.precioVenta = totalPrecioConImpuesto(Number(formProps1.precioCompra), formProps1.importado)
                        obj.stock = +1

                        agregarProducto(obj)

                        confirmarAgregado(obj.nombreProducto, obj.tipoProducto)

                        document.getElementById("limpiarFormulario").reset()
                        flag = 0

                    } else {
                        if (encontrado == undefined || encontrado2 == undefined) {
                            confirmarAgregado(encontrado, encontrado2)
                            document.getElementById("limpiarFormulario").reset()
                            flag = 0
                        }
                    }




                }
            }
            flag = 0
        }
    })
}
//BUSQUEDA DE PRODUCTOS POR MARCA

$(`#buscarProducto`).submit((e) => {
    e.preventDefault()
    $(`#encontrados`).html(``)
    const formData = new FormData(e.target)
    const formProps = Object.fromEntries(formData)
    let resultado = arrayProductos.find(item => item.nombreProducto == formProps.nombre)
    if (resultado) {
        $(`#encontrados`).append(`<p> Marca: ${resultado.nombreProducto} </p>
                                                <p> Tipo: ${resultado.tipoProducto} </p>
                                                <p> Codigo: ${resultado.codigoProducto} </p>
                                                <p> Precio Compra: ${resultado.precioCompra} </p>
                                                <p> Precio Venta: ${resultado.precioVenta} </p>`)



    } else {
        $(`#encontrados`).append(`<span> No se encontraron resultados </span>`)
    }

})







//REFRESCA LA LISTA EN PRODUCTOS.HTML PARA LOS ADMINISTRADORES
function generarLista() {

    let result = document.getElementById("listaProductos")
    result.innerHTML = " "

    for (const producto of arrayProductos) {

        let lista = document.createElement("li")
        lista.innerHTML = `<p class="parrafoID"> id: ${producto.codigoProducto} </p>
                <p> Nombre: ${producto.nombreProducto} </p>
                <p> Tipo: ${producto.tipoProducto}</p>
                <p> Precio: ${producto.precioVenta} </p>
                <p> Stock: ${producto.stock} </p>`
        result.appendChild(lista)
            //ANTE LA POSIBILIDAD DE QUE SE AGREGUE UN PRODUCTO SIN CONTENIDO
        if (producto.nombreProducto === '' || producto.tipoProducto === '') {
            result.removeChild(lista)
        }
    }
}


//LISTA DE PRODUCTOS DISPONIBLES PARA LOS CLIENTES. ES LO QUE SE DESPLIEGA EN VENTAS.HTML
function listaParaVentas() {
    let documento = document.getElementById("listaVentas")
    documento.innerHTML = " "
    let idElemento
    let elemento = document.createElement("li")
    for (const producto of arrayProductos) {
        idElemento = producto.codigoProducto
        elemento.innerHTML += `<div id="${producto.codigoProducto}" class="parrafoID">
        <p>  id:${producto.codigoProducto}</p>
        <p> Nombre: ${producto.nombreProducto} </p>
        <p> Tipo: ${producto.tipoProducto}</p>
        <p> Precio: ${producto.precioVenta} </p>
        <p> Stock: ${producto.stock} </p>
        <form>
        <label type="text" name="nombre">${producto.tipoProducto} ${producto.nombreProducto} </label>
        <button id="${idElemento}">Agregar a la compra</button>
        </form >
        <hr>

        </div>`

        documento.appendChild(elemento)

        //CODIGO PARA AGREGAR AL CARRITO
        let carrito = []
        $(`#${idElemento}`).click(function() {
            if (producto.stock > 0) {
                producto.stock--;
                carrito.push(producto.nombreProducto)
                let string = JSON.stringify(carrito)
                localStorage.setItem("Producto", string)
                listaParaVentas()
            } else {
                $(`#advertencia`).append(`<span>No hay stock</span>`)
            }

        })
    }

}

//OBTIENE EL ULTIMO CODIGO DE PRODUCTO DE LA LISTA, ASI SE GENERA EL ID DE LOS PRODUCTOS
function obtenerUltimoCodigo() {
    let ultimo = 0
    for (const producto of arrayProductos) {
        ultimo = producto.codigoProducto
    }
    return ultimo
}
//CONFIRMA SI EL PRODUCTO SE AGREGO O NO
function confirmarAgregado(nombre, tipo) {
    if (nombre != '' || tipo != '') {
        $(`.formularioAgregar`).click(() => {
            $(`.confirmacion`).trigger(`append`)
        })

        $(`.confirmacion`).append(`<span> Producto agregado a la lista </span>`)
        setInterval(mostrarAviso, 3000)
    } else {
        $(`.formularioAgregar`).click(() => {
            $(`.confirmacion`).trigger(`append`)
        })

        $(`.confirmacion`).append(`<span> No se agregó </span>`)
        setInterval(mostrarAviso, 3000)


    }
}

function mostrarAviso() {
    $(`.confirmacion`).fadeOut()
}