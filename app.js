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