
let carrito = []

function listaParaVentas() {
    let documento = document.getElementById("listaVentas")
    documento.innerHTML = " "
    
    for (const producto of arrayProductos) {
        let elemento = document.createElement("li")
       let idElemento = producto.codigoProducto
        elemento.innerHTML += `<div id="${producto.codigoProducto}" class="parrafoID">
                                    <p>  id:${producto.codigoProducto}</p>
                                    <p> Nombre: ${producto.nombreProducto} </p>
                                    <p> Tipo: ${producto.tipoProducto}</p>
                                    <p> Precio: ${producto.precioVenta} </p>
                                    <p> Stock: ${producto.stock} </p>
                                    
                                    <label type="text" name="nombre">${producto.tipoProducto} ${producto.nombreProducto} </label>
                                    <button id="${idElemento}">Agregar a la compra</button>
                                    
                                    <hr>

                                </div>`

        documento.appendChild(elemento)

        //CODIGO PARA AGREGAR AL CARRITO
        

        $(`#${idElemento}`).on(`click`, () => {
            
            console.log(idElemento)
            if (producto.stock > 0) {
                let buscar = arrayProductos.find(el => el.codigoProducto == idElemento)
                buscar.stock--;
                console.log(buscar);
                carrito.push(buscar)
                let string = JSON.stringify(carrito)
                localStorage.setItem("Producto", string)
                listaParaVentas()
            } else {
                $(`#advertencia`).append(`<span>No hay stock</span>`)
            }

        })
    }

    console.log(carrito)
}

function obtenerUltimoCodigo() {
    let ultimo = 0
    for (const producto of arrayProductos) {
        ultimo = producto.codigoProducto
    }
    return ultimo
}
listaParaVentas()
