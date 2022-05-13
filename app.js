const tablero = document.getElementById('tablero')
const circulos = document.querySelectorAll('.circulos')
const jugador1Marcador = document.querySelector('.fichasJugadorUno')
const jugador2Marcador = document.querySelector('.fichasJugadorDos')

var fichasJugadorUno = 9
var fichasJugadorDos = 9
var jugador1 = 'jugador1'
var jugador2 = 'jugador2'
var turno = jugador1

var jugadorMolino = null
var Fase2 = false


const rollStart = e => {
	var randomMath = Math.round(Math.random())
	randomMath === 0 ? (turno = jugador1) : (turno = jugador2)
}


const movimientoValido = (e, btn, jugador, ...args) => {
	var valido
	if (jugadorMolino) {					//verificamos si existe un jugador que haya realizado un molino 
		return (valido = false)
	}
	if (!Fase2) {							//ya se ingresaron al tablero las primeras 18 fichas?
		return (valido = true)
	}
	if (anteriorCX === btn.attributes.cx.value && anteriorCY === btn.attributes.cy.value) {
		return (valido = false)
	}
	
}


//Añadimos primeras 9 fichas jugador1
const jugador1Add = (e, btn, jugador, ...args) => {
	if (movimientoValido(e, btn, jugador) === false) {
		return
	}
	btn.classList.replace('vacio', jugador)
	fichasJugadorUno--
	console.log("Quedan " + fichasJugadorUno + " fichas - Jugador1")
	jugador1Marcador.children[1].children[0].innerHTML = fichasJugadorUno
	jugador1Marcador.parentElement.style.setProperty('background-color', 'rgb(95, 161, 95)')
	turno = jugador2

}

//Pendiente el mover fichas
const jugador1Move = (e, btn, ...args) => {
	btn.classList.replace(jugador1, 'vacio')
}


//Añadimos primeras 9 fichas jugador1
const jugador2Add = (e, btn, jugador, ...args) => {
	if (movimientoValido(e, btn, jugador) === false) {
		return
	}
	btn.classList.replace('vacio', jugador)
	fichasJugadorDos--
	console.log("Quedan " + fichasJugadorDos + " fichas - Jugador2")
	jugador2Marcador.children[1].children[0].innerHTML = fichasJugadorDos
	jugador2Marcador.parentElement.style.setProperty('background-color', 'rgb(202, 89, 95)')
	turno = jugador1
}

//Falta completar la funcion de mover fichas
const jugador2Move = (e, btn, ...args) => {
	btn.classList.replace(jugador2, 'vacio')
}

//Seccion de escucha de eventos "click"
tablero.addEventListener('click', e => {
	var btn = e.target.closest('circle')
	if (!btn) return
	//vacio
	if (btn.classList.contains('vacio')) {
		if (fichasJugadorUno > 0 || fichasJugadorDos > 0) {
			console.log("Añadiendo ficha")
			turno === jugador1 ? jugador1Add(e, btn, jugador1) : jugador2Add(e, btn, jugador2)
		}
		//jugador 1
	} else if (btn.classList.contains(jugador1)) {
		if (turno === jugador1 && fichasJugadorUno <= 0 && !jugadorMolino) {
			console.log("Probando condición mover")
			Fase2 = true
			jugador1Move(e, btn)
		} 
		//jugador 2
	} else {
		if (turno === jugador2 && fichasJugadorDos <= 0 && !jugadorMolino) {
			Fase2 = true
			jugador2Move(e, btn)
		}
	}
})
