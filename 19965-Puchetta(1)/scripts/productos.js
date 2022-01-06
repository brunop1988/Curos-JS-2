class Producto {
    constructor(codigoProducto, imagen, nombreProducto, tipoProducto, importado, precioCompra, precioVenta, stock) {
        this.codigoProducto = codigoProducto
        this.imagen = imagen
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
const carrito = []
const facturados = []







function agregarProducto(producto) {
    arrayProductos.push(producto)
    segunUsuario()
}

//CODIGO PARA VER EL CARRITO
$(`#carrito`).click(() => {
            $(`#verCarrito`).show()

            $(`#verCarrito`).html(`<li>${localStorage.getItem(`Productos ${localStorage.getItem("Nombre")}`)}</li>`)

            $(`#carrito`).dblclick(()=>{
                $(`#verCarrito`).hide()
            })
    })


function cargarArrayCarrito() {
if(localStorage.getItem(`Productos ${localStorage.getItem("Nombre")}`)!=null){
    carrito.push(localStorage.getItem(`Productos ${localStorage.getItem("Nombre")}`))
}
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

        return `
            <li class="listaCarrito"><img class="imagenCarrito" src="${producto.imagen}"</li>
            <li class="listaCarrito"><strong>Nombre producto:</strong> ${producto.nombreProducto}</li>
            
            <li class="listaCarrito"><strong>Tipo producto:</strong> ${producto.tipoProducto}</li>
            <li class="listaCarrito"><strong>Precio:</strong> ${producto.precioVenta}</li>
            ----------------------------------------------------
            `
                      
            
}


function error() {
    alert("Algo salió mal, reintente")
}




//SE CARGAN LOS DATOS AQUÍ PARA QUE NO SE AGREGUEN SIEMPRE QUE SALTA EL MENÚ
//OBJETO PRODUCTO
agregarProducto(new Producto(1001, "../img/pendrive.jpg","Kingston", "Memoria flash 8gb", "S", 120, totalPrecioConImpuesto(120, "S"), 1))
agregarProducto(new Producto(1002, "../img/camara.jpg","Genius", "Camara web", "S", 140, totalPrecioConImpuesto(140, "S"), 1))
agregarProducto(new Producto(1003, "../img/notebook.jpg", "Lenovo", "Laptop refubrished core i5, 8gb de ram", "N", 240, totalPrecioConImpuesto(240, "S"), 1))

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
            let idProducto = producto.codigoProducto
            

        let mensaje = document.createElement("div")
        mensaje.innerHTML = `
                <form id="${producto.codigoProducto}">
                <p class="parrafoID"> id: ${producto.codigoProducto} </p>
                <p> Nombre: ${producto.nombreProducto} </p>
                <p> Tipo: ${producto.tipoProducto}</p>
                <p> Precio: ${producto.precioCompra} </p>
                <p> Precio venta facturado: ${parseInt(calculoImpuesto(producto.precioVenta,"S")+totalPrecioConImpuesto(producto.precioVenta,producto.importado))}</p>
                <p> Precio venta sin facturar: ${producto.precioVenta}</p>
                <p> Stock: ${producto.stock} </p>
                <img src="" id="tableBanner"  />

                <label> Hacer boleta?</label>
                <input id="${idProducto}" type="text" name="boleta"> 
                <button class="control" type="submit"> Confirmar </button>
                </form>
                `


            let dataImage = localStorage.getItem('imgData');
            let bannerImg = $('#tableBanner');
            bannerImg.src = "data:image/png;base64," + dataImage;

        formulario2.appendChild(mensaje)

        $(`#${idProducto}`).submit((e) => {

            e.preventDefault()

            const formData = new FormData(e.target)
            const formProps = Object.fromEntries(formData)
         
            if (producto.stock > 0) {
                producto.stock--;
                if (formProps.boleta=="s" || formProps.boleta=="S"){
                facturados.push(producto)
                $(`#${idProducto}`).html("Operacion realizada")
                avisarFacturacion(idProducto)
                
             }else if
             (formProps.boleta=="n" || formProps.boleta=="N"){
                $(`#${idProducto}`).html("Operacion realizada")
                avisarFacturacion(idProducto)
             } 

            }else {
                $(`#${idProducto}`).html("SIN STOCK")
                avisarFacturacion(idProducto)

            }
             venderProducto()
             generarLista()
         })

    }
}


//FUNCION PARA MOSTRAR PRODUCTOS FACTURADOS
function factura() {
    const arrayVentas = []
    const formulario = document.getElementsByClassName("control")
    formulario.addEventListener('submit', e => {
        e.preventDefault()
        const formData1 = new FormData(e.target)
        const formProps1 = Object.fromEntries(formData1)
    
        let objVentas
        for (const producto of facturados) {
            if (formProps1.boleta) {
                objVentas = {
                    "Nombre: ": producto.nombreProducto,
                    "Codigo. ": producto.codigoProducto,
                    "Facturado: ": formProps1.boleta,
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
            //RECORRO Y COMPARO CADA OBJETO producto CONTRA DOS input CON ATRIBUTO name 

        let encontrado = arrayProductos.find(item => item.nombreProducto === nombre)

        let encontrado2 = arrayProductos.find(item => item.tipoProducto === tipo)
        let yaExistía = 0
            //EN TODOS LOS CASOS SE EVITARÁ AGREGAR UN PRODUCTO SIN NOMBRE NI TIPO
        if ((encontrado != undefined && encontrado2 != undefined)) {
            if (encontrado.nombreProducto != `` || encontrado2.tipoProducto != ``) {
                for (let i = 0; i < arrayProductos.length; i++) {
                    if (encontrado2.tipoProducto == arrayProductos[i].tipoProducto && encontrado.nombreProducto == arrayProductos[i].nombreProducto) {
                        /*SI EL CODIGO YA EXISTE, AGREGO AL STOCK DEL PRODCUTO EN CASO DE ASI DESEARLO 
                        SINO AGERGO UN NUEVO PRODUCTO SIEMPRE Y CUANDO EL CODIGO NO EXISTA PREVIAMENTE
                        */
                        arrayProductos[i].stock += 1
                            //SE RENUEVAN LAS LISTAS

                        segunUsuario()
                            //CONFIRMA AGREGADO
                        confirmarAgregado(encontrado, encontrado2)

                        //LIMPIAR CAMPOS
                        document.getElementById("limpiarFormulario").reset()
                        yaExistía = 1
                    }

                }
            }
        } else {
            if ((encontrado === undefined || encontrado2 === undefined) && (encontrado != `` || encontrado2 != ``)) {

                obj = new Producto()
                obj.codigoProducto = obtenerUltimoCodigo() + 1
                obj.precioCompra = Number(formProps1.precioCompra)
                obj.importado = formProps1.importado
                obj.nombreProducto = formProps1.nombre
                obj.tipoProducto = formProps1.tipo
                obj.precioVenta = totalPrecioConImpuesto(Number(formProps1.precioCompra), formProps1.importado)

                obj.stock = +1
                let bannerImage = $(`#bannerImg`)
                console.log(bannerImage)
                let imgData = getBase64Image(bannerImage)
                localStorage.setItem("imgData", imgData)
                agregarProducto(obj)

                confirmarAgregado(obj.nombreProducto, obj.tipoProducto)

                document.getElementById("limpiarFormulario").reset()

            }





        }
        if (((yaExistía === 0) && ((encontrado != undefined || encontrado2 != undefined) && (encontrado.nombreProducto != `` || encontrado2.tipoProducto != ``)))) {

            obj = new Producto()
            obj.codigoProducto = obtenerUltimoCodigo() + 1
            obj.precioCompra = Number(formProps1.precioCompra)
            obj.importado = formProps1.importado
            obj.nombreProducto = formProps1.nombre
            obj.tipoProducto = formProps1.tipo
            obj.precioVenta = totalPrecioConImpuesto(Number(formProps1.precioCompra), formProps1.importado)
            obj.stock = +1

            let bannerImage = $(`#bannerImg`).val();
            let imgData = getBase64Image(bannerImage);
            localStorage.setItem("imgData", imgData);

            agregarProducto(obj)

            confirmarAgregado(obj.nombreProducto, obj.tipoProducto)

            document.getElementById("limpiarFormulario").reset()
        }



    })
}
function getBase64Image(img) {
    let canvas = document.createElement("canvas");
    canvas.width = img.width;
    console.log(canvas.width)

    canvas.height = img.height;
    console.log(canvas.height)

    let ctx = canvas.getContext("2d");
    ctx.drawImage(img, 0, 0);

    let dataURL = canvas.toDataURL("image/png");

    return dataURL.replace(/^data:image\/(png|jpg);base64,/, "");
}





//BUSQUEDA DE PRODUCTOS POR MARCA

$(`#buscarProducto`).submit((e) => {
    e.preventDefault()
    //LIMPIA EL RESULTADO DE BÚSQUEDA ANTERIOR 
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
        lista.innerHTML = 
        `<p class="parrafoID" ><img class="tamañoImagen" src="${producto.imagen}"></p>
        <p > id: ${producto.codigoProducto} </p>
                <p> Nombre: ${producto.nombreProducto} </p>
                <p> Tipo: ${producto.tipoProducto}</p>
                <p> Precio: ${producto.precioVenta} </p>
                <p> Stock: ${producto.stock} </p>
                <img src="" id="tableBanner" />
                `

            let dataImage = localStorage.getItem('imgData');
            bannerImg = $('#tableBanner');
            bannerImg.src = "data:image/png;base64," + dataImage;
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
    let parrafoID = 1

    for (const producto of arrayProductos) {
        let elemento = document.createElement("li")

        idElemento = producto.codigoProducto
        elemento.innerHTML +=
        
        `<div id="${producto.codigoProducto}" class="parrafoID${parrafoID}">
        <p><img class="tamañoImagen" src="${producto.imagen}"></p>
        <p>  id:${producto.codigoProducto}</p>
        <p> Nombre: ${producto.nombreProducto} </p>
        <p> Tipo: ${producto.tipoProducto}</p>
        <p> Precio: ${producto.precioVenta} </p>
        <p> Stock: ${producto.stock} </p>
        <form>
        <label type="text" name="nombre">${producto.tipoProducto} ${producto.nombreProducto} </label>
        <button class="btn btn-primary" id="${idElemento}">Agregar a la compra</button>
        <span id="advertencia></spam>
        </form >
        <hr>

        </div>`
        parrafoID++
        documento.appendChild(elemento)

        //CODIGO PARA AGREGAR AL CARRITO
        $(`#${idElemento}`).click(function(e) {
            e.preventDefault()
            if (producto.stock > 0) {
                producto.stock--;
                carrito.push(toString(producto))
                
                localStorage.setItem(`Productos ${localStorage.getItem("Nombre")}`, carrito)
            } else {
                avisarStock(idElemento)

            }
            listaParaVentas()

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
//AVISAR "SIN STOCk"
function avisarStock(id) {

    $(`#${id}`).click(() => {
        $(`#advertencia`).trigger(`append`)
    })

    $(`#advertencia`).append(`<span> No hay stock</span>`)
    mostrarAvisoError()
}







//CONFIRMA SI EL PRODUCTO SE AGREGO O NO
function confirmarAgregado(nombre, tipo) {
    if (nombre != '' || tipo != '') {

        $(`.formularioAgregar`).click(() => {
            $(`.confirmacion`).html(``)

            $(`.confirmacion`).trigger(`append`)
        })

        $(`.confirmacion`).append(`<span> Producto agregado a la lista </span>`)
        mostrarAvisoOk()

    } else {
        $(`.formularioAgregar`).click(() => {
            $(`.confirmacion`).html(``)

            $(`.confirmacion`).trigger(`append`)
        })

        $(`.confirmacion`).append(`<span> No se agregó </span>`)
        mostrarAvisoError()
    }
}

//ANIMACIONES CONCATENADAS PARA METODO confirmarAgregado(param1, param2)
function mostrarAvisoError() {
    $(`.confirmacion`).css({
            "color": "red",
            "font-size": "20px",
        })
        .fadeOut(2000)
        .fadeIn(2000)
        .slideUp(1000)

    $(`#advertencia`).css({
            "color": "red",
            "font-size": "20px",
        })
        .fadeOut(2000)
        .fadeIn(2000)
        .slideUp(1000)
}

function mostrarAvisoOk() {
    $(`.confirmacion`).css({
            "color": "green",
            "font-size": "20px",
        })
        .fadeOut(2000)
        .fadeIn(2000)
        .slideUp(1000)
}

function avisarFacturacion(idProducto){
    $(`${idProducto}`).css({"color": "green",
    "font-size": "20px",
})
.fadeOut(2000)
.fadeIn(2000)
.slideUp(1000)

}

function compararCarritoContraStock() {


    for (let i = 0; i < arrayProductos.length; i++) {
        let encontrado = carrito.find(item => item.nombreProducto == arrayProductos[i].nombreProducto, item => item.tipoProducto == arrayProductos[i].tipoProducto)
        if (encontrado != undefined) {
            arrayProductos[i].stock--
        }
    }
}