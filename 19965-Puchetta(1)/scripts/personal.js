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

//Listado de personas


function generarLista() {
    let result = document.getElementById("personal")
    result.innerHTML = " "
    let lista
    for (const personas of arrayTrabajadores) {
        lista = document.createElement("li")
        lista.innerHTML = `<p> Nombre: ${personas.nombre} </p>
                                <p> Apellido: ${personas.apellido} </p>
                                <p> Documento: ${personas.documento}</p>
                                <p> Categoría: ${personas.categoria} </p>
                                <p> Teléfono: ${personas.telefono}</p>`
        result.appendChild(lista)
    }
    return lista
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


function toString(trabajador) {

    return "Nombre: " + trabajador.nombre + "\n" + "Apellido: " + trabajador.apellido + "\n" + "Documento: " + trabajador.documento + "\n" + "Categoría: " + trabajador.categoria + "\n" + "Telefono: " + trabajador.telefono + "\n\n"
}

//OBJETOS TRABAJADOR


agregarTrabajador(new Persona("Bruno", "Puchetta", 43589726, 33, "JJ Severino 1414", 091689780, 4))
agregarTrabajador(new Persona("Carolina", "Rodríguez", 47693464, 26, "Andromeda 10345", 092444556, 5))
agregarTrabajador(new Persona("María", "Paz", 36365034, 58, "Jose Livi 8919", 092667890, 3))





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


let persona = new Persona()
const formulario = document.getElementById('ingresarPersona')
formulario.addEventListener('submit', e => {
    //Limpia el contenedor con el mensaje de confirmación, para volverlo a cargar
    $(`#confirmacion`).html(` `)
    e.preventDefault()
    const formData = new FormData(e.target)
    const formProps = Object.fromEntries(formData)
    persona.nombre = formProps.nombre
    persona.apellido = formProps.apellido
    persona.documento = Number(formProps.documento)
    persona.telefono = Number(formProps.telefono)
    persona.edad = Number(formProps.edad)
    persona.direccion = formProps.direccion
    persona.categoria = Number(formProps.categoria)

    agregarTrabajador(persona)
        //Confirmación de persona agregada
    confirmarAgregado(persona)
    document.getElementById('ingresarPersona').reset()


})


//Búsqueda de los datos de una persona por documento


const formulario3 = document.getElementById("buscarPersonal")
let persona2 = document.createElement("li")
formulario3.addEventListener('submit', e => {
    e.preventDefault()
    const formData3 = new FormData(e.target)
    const formProps3 = Object.fromEntries(formData3)
    let resultado = arrayTrabajadores.find(item => item.documento === Number(formProps3.documento))
    if (resultado != undefined) {
        persona2.innerHTML = `<p> Nombre: ${resultado.nombre} </p>
                                                <p> Apellido: ${resultado.apellido} </p>
                                                <p> Documento: ${resultado.documento} </p>
                                                <p> Categoría: ${resultado.categoria} </p>
                                                <p> Teléfono: ${resultado.telefono} </p>`

        formulario3.appendChild(persona2)

    } else {
        error()
    }

})

function confirmarAgregado(persona) {
    if (persona != undefined) {
        $(`#ingresarPersona`).click(() => {
            $(`#confirmacion`).trigger(`append`)
        })

        $(`#confirmacion`).append(`<span> Personal agregado </span>`)
    }
}