
//MÉTODOS CLASE PRODUCTO






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





function toString(producto) {

    return "Codigo: " + producto.codigoProducto + "\n" + "Nombre: " + producto.nombreProducto + "\n" + "Tipo: " + producto.tipoProducto + "\n" + "Importado: " + producto.importado + "\n" + "Precio costo: " + producto.precioCompra + "\n" + "Precio venta: " + producto.precioVenta + "\n" + "Stock: " + producto.stock + "\n\n"
}

function error() {
    alert("Algo salió mal, reintente")
}






//COMIENZA LA PARTE INTERACTIVA CON EL USUARIO


//SESIÓN ACTUAL
let usuarioActual = document.getElementById("espacioUsuario")
let parrafoUsuario = document.createElement("p")
parrafoUsuario.innerHTML = `<strong> Estás logueado como: ${localStorage.getItem("Nombre")}</strong>`
usuarioActual.appendChild(parrafoUsuario)

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
        const formData1 = new FormData(e.target)
        const formProps1 = Object.fromEntries(formData1)
        let nombre = formProps1.nombre
        let tipo = formProps1.tipo

        //RECORRO Y COMPARO CADA OBJETO producto CONTRA UN input CON ATRIBUTO name=codigo
        let encontrado = arrayProductos.find(item => item.nombreProducto === nombre)
        let encontrado2 = arrayProductos.find(item => item.tipoProducto === tipo)
        if (encontrado != undefined && encontrado2 != undefined) {
            obj = encontrado
            const form = document.getElementById("advertencia")
            let mensaje = document.createElement("li")
            mensaje.innerHTML = `<form>
                    <label>Ya existe el producto, desea sumarlo al stock? Digite (S,s) ó (N,n)</label>
                    <input type="text" name="op"></input>
                    <button type="submit">Enviar</button>
                    
                    </form>
                    `

            form.appendChild(mensaje)

            /*SI EL CODIGO YA EXISTE, AGREGO AL STOCK DEL PRODCUTO EN CASO DE ASI DESEARLO 
            SINO AGERGO UN NUEVO PRODUCTO SIEMPRE Y CUANDO EL CODIGO NO EXISTA PREVIAMENTE
            */
            form.addEventListener('submit', p => {
                p.preventDefault()
                const formData2 = new FormData(p.target)
                const formProps2 = Object.fromEntries(formData2)
                if (formProps2.op === "S" || formProps2.op === "s") {

                    encontrado.stock += 1

                    segunUsuario()
                    mensaje.remove()

                } else {
                    if (formProps2.op === "N" || formProps2.op === "n") {
                        mensaje.remove()
                    }
                }
                form.removeChild(mensaje)

            })
        }


        if (encontrado === undefined || encontrado2 === undefined) {

            obj = new Producto()
            obj.codigoProducto = obtenerUltimoCodigo() + 1
            obj.precioCompra = Number(formProps1.precioCompra)
            obj.importado = formProps1.importado
            obj.nombreProducto = formProps1.nombre
            obj.tipoProducto = formProps1.tipo
            obj.precioVenta = totalPrecioConImpuesto(Number(formProps1.precioCompra), formProps1.importado)
            obj.stock = +1


            agregarProducto(obj)


        }

    })



}

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
    }
}

//LISTA DE PRODUCTOS DISPONIBLES PARA LOS CLIENTES. ES LO QUE SE DESPLIEGA EN VENTAS.HTML
