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

    generarLista()
}

//OBJETOS CREADOS EN datosPersonal.json, traídos usando AJAX

const datosPersonas = "../datosJSON/datosPersonal.json"
$.get(datosPersonas, (respuesta, estado) => {

    for (const trabajador of respuesta) {
        if (estado == "success") {
            agregarTrabajador(trabajador)
        }
    }
})


//Listado de personas

function generarLista() {
    let result = document.getElementById("personal")
    result.innerHTML = " "

    for (const personas of arrayTrabajadores) {
        let lista = document.createElement("li")

        lista.innerHTML = `
        <p class="parrafoID"> Documento: ${personas.documento}</p>
        <p> Nombre: ${personas.nombre} </p>
        <p> Apellido: ${personas.apellido} </p>
        <p> Categoría: ${personas.categoria} </p>
        <p> Teléfono: ${personas.telefono}</p>`
        result.appendChild(lista)
            //Por si se agrega personal sin nombre o apellido
        if (personas.nombre === '' || personas.apellido === '') {
            result.removeChild(lista)
        }
    }
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




//OBJETOS TRABAJADOR







//Liquidacion de sueldo por documento

const formulario2 = document.getElementById('liquidarSueldo')
formulario2.addEventListener('submit', e => {
    e.preventDefault()
    const formData2 = new FormData(e.target)
    const formProps2 = Object.fromEntries(formData2)
    for (const trabajador of arrayTrabajadores) {

        if (trabajador.documento === Number(formProps2.documento)) {
            let categoria = trabajador.categoria
            let aportePersonasFisicas = impuestoPersonasFisicas(categoriaTrabajador(categoria))
            let aporteJubilatorio = impuestoJubilatorio(categoriaTrabajador(categoria))
            let aporteTotal = aporteJubilatorio + aportePersonasFisicas

            let mensaje = document.createElement("p")
            mensaje.innerHTML = `A ${trabajador.nombre} le corresponde cobrar ` + calculoSueldo(categoria, aporteTotal)
            formulario2.appendChild(mensaje)
        }
    }
})


//Sesión actual

let usuarioActual = document.getElementById("espacioUsuario")
let parrafoUsuario = document.createElement("p")
parrafoUsuario.innerHTML = `<strong> Estás logueado como: ${localStorage.getItem("Nombre")}</strong>`
usuarioActual.appendChild(parrafoUsuario)


//Ingreso al sistema de una persona


const formulario = document.getElementById('ingresarPersona')
formulario.addEventListener('submit', e => {

    e.preventDefault()

    const formData = new FormData(e.target)
    const formProps = Object.fromEntries(formData)
    let persona = new Persona()

    persona.nombre = formProps.nombre
    persona.apellido = formProps.apellido
    persona.documento = Number(formProps.documento)
    persona.telefono = Number(formProps.telefono)
    persona.edad = Number(formProps.edad)
    persona.direccion = formProps.direccion
    persona.categoria = Number(formProps.categoria)



    //Confirmación de persona agregada

    agregarTrabajador(persona)
    confirmarAgregado(persona)



    document.getElementById('limpiarFormulario').reset()


})


//Búsqueda de los datos de una persona por documento


$(`#buscarPersonal`).submit(e => {
    e.preventDefault()
    const formData3 = new FormData(e.target)
    const formProps3 = Object.fromEntries(formData3)
    let resultado = arrayTrabajadores.find(item => item.documento === Number(formProps3.documento))
    if (resultado != undefined) {
        $(`#buscarPersonal`).append(`<p> Nombre: ${resultado.nombre} </p>
                                                <p> Apellido: ${resultado.apellido} </p>
                                                <p> Documento: ${resultado.documento} </p>
                                                <p> Categoría: ${resultado.categoria} </p>
                                                <p> Teléfono: ${resultado.telefono} </p>`

        )

    } else {
        error()
    }

})

//Mensaje de confirmación cuando se agrega una persona
function confirmarAgregado(persona) {
    if (persona != undefined) {
        $(`#ingresarPersona`).click(() => {
            $(`#confirmacion`).html(``)

            $(`#confirmacion`).trigger(`append`)
        })

        $(`#confirmacion`).append(`<span> Personal agregado </span>`)
        mostrarAvisoOk()
    } else {
        $(`.formularioAgregar`).click(() => {
            $(`#confirmacion`).html(``)

            $(`.confirmacion`).trigger(`append`)
        })

        $(`#confirmacion`).append(`<span> No se agregó </span>`)
        mostrarAvisoError()
    }
}

//Avisos segun resutlado de intento de agregar al array
function mostrarAvisoError() {
    $(`#confirmacion`).css({
            "color": "red",
            "font-size": "20px",
        })
        .fadeOut(2000)
        .fadeIn(2000)
        .slideUp(1000)

}

function mostrarAvisoOk() {
    $(`#confirmacion`).css({
            "color": "green",
            "font-size": "20px",
        })
        .fadeOut(2000)
        .fadeIn(2000)
        .slideUp(1000)

}