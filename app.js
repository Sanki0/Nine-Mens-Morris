const tablero = document.getElementById('tablero');
const circulos = document.querySelectorAll('.circulos');
const jugador1Marcador = document.querySelector('.fichasJugadorUno');
const jugador2Marcador = document.querySelector('.fichasJugadorDos');
const controles = document.querySelector('.controles');


let fichasJugadorUno = 9;
let fichasJugadorDos = 9;
let jugador1 = 'jugador1';
let jugador2 = 'jugador2';
let turno = jugador1;
let anteriorCX;
let anteriorCY;
let jugadorMolino = null;
let Fase2 = false;
let ultimoCirculo = null;

//Funcion para rollear por quien empieza
const roll = e => {
	var randomMath = Math.round(Math.random());
	randomMath === 0 ? (turno = jugador1) : (turno = jugador2);
}


const movimientoValido = (e, btn, jugador, ...args) => {
	let valido;
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
	controles.children[1].disabled = true;
	btn.classList.replace('vacio', jugador);
	fichasJugadorUno--;
	console.log('Quedan ' + fichasJugadorUno + ' fichas - Jugador1');
	jugador1Marcador.children[1].children[0].innerHTML = fichasJugadorUno;
	jugador1Marcador.parentElement.style.setProperty('background-color', 'rgb(0, 0, 0)');
	turno = jugador2;
}

//Pendiente el mover fichas
const jugador1Move = (e, btn, ...args) => {
	controles.children[1].disabled = false;
	btn.classList.replace(jugador1, 'vacio');
	anteriorCX = btn.attributes.cx.value; 	//Verificamos coordenadas
	anteriorCY = btn.attributes.cy.value;
	ultimoCirculo = btn;
	fichasJugadorUno++;
	jugador1Marcador.children[1].children[0].innerHTML = fichasJugadorUno;	//Actualizamos marcador
}


//Añadimos primeras 9 fichas jugador1
const jugador2Add = (e, btn, jugador, ...args) => {
	if (movimientoValido(e, btn, jugador) === false) {
		return
	}
	controles.children[1].disabled = true;
	btn.classList.replace('vacio', jugador);
	fichasJugadorDos--;
	console.log('Quedan ' + fichasJugadorDos + ' fichas - Jugador2');
	jugador2Marcador.children[1].children[0].innerHTML = fichasJugadorDos;
	jugador2Marcador.parentElement.style.setProperty('background-color', 'rgb(255, 255, 255)');
	turno = jugador1;
}

//Falta completar la funcion de mover fichas
const jugador2Move = (e, btn, ...args) => {
	controles.children[1].disabled = false;
	btn.classList.replace(jugador2, 'vacio');
	anteriorCX = btn.attributes.cx.value;	//Verificamos coordenadas
	anteriorCY = btn.attributes.cy.value;
	ultimoCirculo = btn;
	fichasJugadorDos++;
	jugador2Marcador.children[1].children[0].innerHTML = fichasJugadorDos; //Actualizamos marcador
}

//Seccion de escucha de eventos 'click'
tablero.addEventListener('click', e => {
	let btn = e.target.closest('circle');
	if (!btn) return
	//vacio
	if (btn.classList.contains('vacio')) {
		if (fichasJugadorUno > 0 || fichasJugadorDos > 0) {
			console.log('Añadiendo ficha');
			turno === jugador1 ? jugador1Add(e, btn, jugador1) : jugador2Add(e, btn, jugador2);
		}
		//jugador 1
	} else if (btn.classList.contains(jugador1)) {
		if (turno === jugador1 && fichasJugadorUno <= 0 && !jugadorMolino) {
			console.log('Probando condición mover');
			Fase2 = true;
			jugador1Move(e, btn);
		} 
		//jugador 2
	} else {
		if (turno === jugador2 && fichasJugadorDos <= 0 && !jugadorMolino) {
			Fase2 = true;
			jugador2Move(e, btn);
		}
	}
})

controles.addEventListener('click', e => {
	let btn = e.target.closest('.btn');
	if (!btn) return

	btn.classList.contains('roll') ? (roll(), (btn.disabled = true)) : null
	
	if (btn.classList.contains('retroceder')) {
		if (turno === jugador1) {
			ultimoCirculo.classList.replace('vacio', jugador1);
			fichasJugadorUno--;
			//turno = jugador2
			jugador1Marcador.children[1].children[0].innerHTML = fichasJugadorUno;
			controles.children[1].disabled = true;
		} else {
			ultimoCirculo.classList.replace('vacio', jugador2);
			fichasJugadorDos--;
			//turno = jugador2
			jugador2Marcador.children[1].children[0].innerHTML = fichasJugadorDos;
			controles.children[1].disabled = true;
		}
		console.log(turno, fichasJugadorDos, fichasJugadorUno, ultimoCirculo);
	}

	turno !== jugador1
		? jugador1Marcador.parentElement.style.setProperty('background-color', 'rgb(0, 0, 0)')
		: jugador2Marcador.parentElement.style.setProperty('background-color', 'rgb(255, 255, 255)')
})
