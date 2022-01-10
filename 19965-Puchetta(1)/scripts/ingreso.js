const usuarios = [{
        Tipo: "Admin",
        Nombre: "Usuario-1",
        Contraseña: "123"

    },
    {
        Tipo: "Comun",
        Nombre: "Usuario-2",
        Contraseña: "234"
    },
    {

        Tipo: "Comun",
        Nombre: "Usuario-3",
        Contraseña: "345"
    }


]





function sesionActual(usuario) {
    localStorage.setItem("Nombre", usuario.Nombre)
    localStorage.setItem("TipoUsuario", usuario.Tipo)
    let sesionActiva = localStorage.getItem("Nombre")
    let documento = document.getElementById("contenedorUsuarioActual")
    let mensaje = document.createElement("p")
    mensaje.innerHTML = `<strong> Bienvenido ${sesionActiva} </strong>`
    documento.appendChild(mensaje)
}

//RESETEO DEL CARRITO DEL USUARIO QUE ACABA DE INGRESAR
localStorage.removeItem(`Productos ${localStorage.getItem("Nombre")}`)
localStorage.removeItem(`Total compras ${localStorage.getItem("Nombre")}`)

function registrarse() {
    const formData2 = new FormData(e.target)
    const formProps2 = Object.fromEntries(formData2)
    for (const usuario of usuarios) {
        if ((formProps2.nombreUsuario != usuario.Nombre) && (formProps2.contraseña != usuario.Contraseña) && (formProps2.tipo === "claveAdmin")) {
            usuarios.push(nombreUsuario, contraseña, "Admin")
        }




    }
}


let link

//SEGUN EL TIPO DE USUARIO LOGUEADO, ESTA PAGINA NOS DIRIGE A rutas.html o ventas.html
for (const usuario of usuarios) {

    const formulario = document.getElementById("formIngreso")

    formulario.addEventListener('submit', e => {
        e.preventDefault()

        const formData1 = new FormData(e.target)
        const formProps1 = Object.fromEntries(formData1)
        if ((formProps1.usuarioNombre === usuario.Nombre) && (formProps1.contraseña === usuario.Contraseña) && (usuario.Tipo === "Admin")) {
            window.location.replace("../html/rutas.html")

            sesionActual(usuario)


        }
        if ((formProps1.usuarioNombre === usuario.Nombre) && (formProps1.contraseña === usuario.Contraseña) && (usuario.Tipo === "Comun")) {
            window.location.replace("../html/ventas.html")
            sesionActual(usuario)

        }



    })

}