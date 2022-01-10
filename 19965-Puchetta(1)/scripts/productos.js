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

//CLASE USADA PARA PASAR LOS DATOS DE UN NUEVO OBJETO PARA FACTURARLO CON EL PRECIO CORRECTO
class Factura {

}
//MÉTODOS CLASE PRODUCTO

const arrayProductos = []
const carrito = []
const facturados = []
const ventasSF = []


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

/*CARGA LOS ULTIMOS PRODUCTOS AGREGADOS A LA COMPRA, SEGUN EL USUARIO
*NECESARIO SI NO SE VACÍA EL LOCALSTORAGE
*EN EL PRESENTE CÓDIGO SE VACÍA EL CARRITO DE CADA USUARIO CADA VEZ QUE INGRESA (VER ingreso.js)

function cargarArrayCarrito() {
if(localStorage.getItem(`Productos ${localStorage.getItem("Nombre")}`)!=null){
    carrito.push(localStorage.getItem(`Productos ${localStorage.getItem("Nombre")}`))
}
}
*/


function mostrarTotal(){
    $(`#mostrarTotal`).html(``)
    
        $(`#mostrarTotal`).click (()=>{
            $(`#mostrarTotal`).trigger(`append`)
        })
        $(`#mostrarTotal`).append(`<p> 
                                <span> A pagar: ${localStorage.getItem(`Total compras ${localStorage.getItem("Nombre")}`)}</span>
                                <a data-toggle="tooltip" title="Ir al formulario de tarjeta" href="#pagoTarjeta"><img class="imagenCC" src="../img/card1.png"></a>
                                <a data-toggle="tooltip" title="Ir al formulario de tarjeta" href="#pagoTarjeta"><img class="imagenCC" src="../img/card2.png"></a>
                                </p>`)
        mostrarAvisoTotal()
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

function mostrarPrecioFacturado(producto){
   let calculo = parseInt(calculoImpuesto(producto.precioVenta,"S")+totalPrecioConImpuesto(producto.precioVenta,producto.importado))
    return calculo
}

function hacerFactura(producto){
     //CREACION DE OBJETO FACTURA PARA PASARLO A UN ARRAY CON EL PRECIO CORRECTO
     let factura =  new Factura()
     factura.nombre=producto.nombreProducto
     factura.tipo = producto.tipoProducto
     factura.precio = mostrarPrecioFacturado(producto)
     facturados.push(factura)
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
            <li class="listaCarrito" ><strong>Precio:</strong> ${producto.precioVenta}</li>
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
agregarProducto(new Producto(1004, "../img/celular.jpg","Xiaomi 9A", "Teléfono celular", "S", 250, totalPrecioConImpuesto(120, "S"), 1))
agregarProducto(new Producto(1005, "../img/impresora.jpg","HP Desk Ink Advantage 2375", "Impresora", "S", 300, totalPrecioConImpuesto(140, "S"), 1))
agregarProducto(new Producto(1006, "../img/microi9.jpg", "Intel", "Microprocesador i9", "N", 240, totalPrecioConImpuesto(240, "S"), 1))

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
                <form class="formularioVentas" id="${producto.codigoProducto}">
                <p class="parrafoID"> id: ${producto.codigoProducto} </p>
                <p> Nombre: ${producto.nombreProducto} </p>
                <p> Tipo: ${producto.tipoProducto}</p>
                <p> Precio: ${producto.precioCompra} </p>
                <p> Precio venta facturado: ${mostrarPrecioFacturado(producto)}</p>
                <p> Precio venta sin facturar: ${parseInt(producto.precioVenta)}</p>
                <p name="stock"> Stock: ${producto.stock} </p>
                
                <label> Hacer boleta?</label>
                <input id="${idProducto}" type="text" name="boleta"> 
                <button class="control" type="submit"> Confirmar </button>
                </form>
                
                
                `


            

        formulario2.appendChild(mensaje)

        $(`#${idProducto}`).submit((e) => {

            e.preventDefault()

            const formData = new FormData(e.target)
            const formProps = Object.fromEntries(formData)
         
            if (producto.stock > 0) {
                producto.stock--;
                if (formProps.boleta=="s" || formProps.boleta=="S"){
                        
                            hacerFactura(producto)
                        
                 $(`#mostrarOk`).html("Producto enviado a facturas")
                               .css({
                                        "color": "green",
                                        "font-size": "20px",
})
                                .show()
                                .fadeOut(5000)
                    }else if
             (formProps.boleta=="n" || formProps.boleta=="N"){

                 //ARRAY DE VENTAS NO FACTURADAS
                    ventasSF.push(producto)
                $(`#mostrarOk`).html("Operacion realizada")
                               .css({
                                        "color": "green",
                                        "font-size": "20px",
                })
                               .show()
                               .fadeOut(5000)
                                    
             } 

            }else {
                $(`#mostrarOk`).html("SIN STOCK")
                               .css({
                                        "color": "red",
                                        "font-size": "20px",
                })
                                .show()
                                .fadeOut(1000)
                                .fadeIn(1000)
                                .fadeOut(1000)
                                .fadeIn(1000)
                                .fadeOut(3000)
                        
                }
             venderProducto()
             generarLista()
         })

    }
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
                obj.imagen = localStorage.getItem('img')
                agregarProducto(obj)

                confirmarAgregado(obj.nombreProducto, obj.tipoProducto)

                document.getElementById("limpiarFormulario").reset()
                $('#onload').val(0)
                yaExistía=1

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
            obj.imagen = localStorage.getItem('img')

            

            agregarProducto(obj)

            confirmarAgregado(obj.nombreProducto, obj.tipoProducto)

            document.getElementById("limpiarFormulario").reset()
            $('#onload').val(0)

        }



    })
}

const CLOUDINARY_URL= 'https://api.cloudinary.com/v1_1/dwf7z8i1s/image/upload'
const CLOUDINARY_PRESET = 'jlobzt7r'

    $(`#bannerImg`).on('change', async(e)=>{
      const image = e.target.files[0]
        const formData = new FormData()
        formData.append('file', image)
        formData.append('upload_preset', CLOUDINARY_PRESET)


    const res = await axios.post(CLOUDINARY_URL, formData, {
        headers:{
            'content-type': 'multipart/form-data'
        },
        onUploadProgress(e){
            
            $('#onload').val(Math.round((e.loaded * 100) / e.total))
        }
    });
        console.log(res.status)
        
        if(res.status == 200){
           
          localStorage.setItem('img',res.data.secure_url)  
        }else{
            alert('error al cargar imagen')
        }
        
    })
    

      






//BUSQUEDA DE PRODUCTOS POR MARCA

$(`#buscarProducto`).submit((e) => {
    e.preventDefault()
    //LIMPIA EL RESULTADO DE BÚSQUEDA ANTERIOR 
    $(`#encontrados`).html(``)
    let contador = 0
    const formData = new FormData(e.target)
    const formProps = Object.fromEntries(formData)
    for(let i=0;i<arrayProductos.length;i++){
    

    if (formProps.nombre==arrayProductos[i].nombreProducto) {
        $(`#encontrados`).append(`<p> Marca: ${arrayProductos[i].nombreProducto} </p>
                                                <p> Tipo: ${arrayProductos[i].tipoProducto} </p>
                                                <p> Codigo: ${arrayProductos[i].codigoProducto} </p>
                                                <p> Precio Compra: ${arrayProductos[i].precioCompra} </p>
                                                <p> Precio Venta: ${arrayProductos[i].precioVenta} </p>
                                                --------------------------------------------------`)
                            
                                                contador++


    } 
}
    if(contador===0) {
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
                <p> Precio: ${parseInt(producto.precioVenta)} </p>
                <p> Stock: ${producto.stock} </p>
        
                `

         
        result.appendChild(lista)
            //ANTE LA POSIBILIDAD DE QUE SE AGREGUE UN PRODUCTO SIN CONTENIDO
        if (producto.nombreProducto === '' || producto.tipoProducto === '') {
            result.removeChild(lista)
        }
    }
}

let localStore = 0
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
        <p class="fondoImagen"><img class="tamañoImagen" src="${producto.imagen}"></p>
        <p> Código:${producto.codigoProducto}</p>
        <p> Nombre: ${producto.nombreProducto} </p>
        <p> Tipo: ${producto.tipoProducto}</p>
        <p> Precio: ${producto.precioVenta} </p>
        <p> Stock: ${producto.stock} </p>
        <form class="formularioVentas">
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
                let suma=0
                suma+= producto.precioVenta
                let suma2 =0 
                //SUMA EL VALOR DE LA COMPRA TOTAL Y LO MUESTRA EN CASO DE SOLICITARLO
                if (localStorage.getItem(`Total compras ${localStorage.getItem("Nombre")}`)!=undefined){
                localStore = parseInt(localStorage.getItem(`Total compras ${localStorage.getItem("Nombre")}`))
                }
                suma2 = localStore + suma
               
                localStorage.setItem(`Total compras ${localStorage.getItem("Nombre")}`, suma2)
            
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

function mostrarAvisoTotal(){


$(`#mostrarTotal`).css({
    "color": "black",
    "font-size": "17px",
})
.show()
.fadeOut(5000)

}


function compararCarritoContraStock() {


    for (let i = 0; i < arrayProductos.length; i++) {
        let encontrado = carrito.find(item => item.nombreProducto == arrayProductos[i].nombreProducto, item => item.tipoProducto == arrayProductos[i].tipoProducto)
        if (encontrado != undefined) {
            arrayProductos[i].stock--
        }
    }
}