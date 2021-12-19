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


let link
    //SEGUN EL TIPO DE USUARIO LOGEADO, ESTA PAGINA NOS DIRIGE A rutas.html o ventas.html
for (const usuario of usuarios) {
    const formulario = document.getElementById("formIngreso")

    formulario.addEventListener('submit', e => {
        e.preventDefault()

        const formData1 = new FormData(e.target)
        const formProps1 = Object.fromEntries(formData1)
        if ((formProps1.usuario === usuario.Nombre) && (formProps1.contraseña === usuario.Contraseña) && (usuario.Tipo === "Admin")) {
            link = document.createElement("p")

            link.innerHTML = `<a href="rutas.html">A pagina principal</a>`
            formulario.appendChild(link)
            sesionActual(usuario)


        }
        if ((formProps1.usuario === usuario.Nombre) && (formProps1.contraseña === usuario.Contraseña) && (usuario.Tipo === "Comun")) {
            link = document.createElement("p")
            link.innerHTML = `<a href="ventas.html">A Lista Productos</a>`
            formulario.appendChild(link)
            sesionActual(usuario)

        }



    })

}