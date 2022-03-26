
/*Patrón Módulo (lo usaremos para encapsular todo el código)

(() => { //Función Anónima Autoinvocada

    'use strict'

})();

*/

const miModulo = (() => {
    'use strict'

    let baraja = []; //Baraja de cartas
    const tipos = ['C', 'D', 'H', 'S'], // Palos de la baraja
          figuras = ['A', 'J', 'Q', 'K']; // Figuras no incluidas del 2 al 10

    let puntosJugadores = [];
    
    //Referencias al HTML

    const btnPedir = document.querySelector('#btnPedir'),
          btnDetener = document.querySelector('#btnDetener'),
          btnNuevo = document.querySelector('#btnNuevo');

    const divCartasJugadores = document.querySelectorAll('.divCartas'),         
          puntajeTotal = document.querySelectorAll('small');

    //Función que incializa el juego 
    const inicializarJuego = (numJugadores = 2) => {
            baraja = crearBaraja();
            
            puntosJugadores = [];
            for (let i=0; i < numJugadores; i++) {// Método para que el CPU siempre sea el último en jugar

                puntosJugadores.push(0);
            }

        puntajeTotal.forEach(elem => elem.innerText = 0);
        divCartasJugadores.forEach(elem => elem.innerText = '');

        btnPedir.disabled = false;
        btnDetener.disabled = false;
            
        }

    //Función crear la baraja
    const crearBaraja = () => { 

        baraja = [];
        for(let i=2; i <= 10; i++) { //Cartas que van del 2 al 10
            for(let tipo of tipos) {; //Palos de las barajas
                baraja.push(i + tipo); // Asignamos las cartas a los diferentes tipos
            }
        } 
        for( let tipo of tipos) {
            for(let esp of figuras){
                baraja.push(esp + tipo);
            }
        }
        return _.shuffle(baraja);; // Mezcla usando la librería UnderScore
    }

    const pedirCarta = () => { //Función para repartir una carta

        if (baraja.length === 0) {
            throw 'No hay más cartas en la Baraja';
        }

        return baraja.pop(); //elimina la carta de la Baraja y la usamos como entregada

    }

    const valorCarta = (carta) => { // Valor de la carta

        const valor = carta.substring(0, carta.length - 1); //tomamos el valor de la carta sin el palo
        return ( isNaN(valor)) ? 
            (valor === 'A') ? 11 : 10
            : valor * 1;

    }

    // Turno: 0 será el primer jugador y el último será la PC
    const acumularPuntos = (carta, turno) => {
        puntosJugadores[turno] = puntosJugadores[turno] + valorCarta(carta);
        puntajeTotal[turno].innerText = puntosJugadores[turno]; // Suma los puntos en el Score HTML
        return puntosJugadores[turno];
    }
    
    const crearCarta = (carta, turno) => {
        const imgCarta = document.createElement('img');
        imgCarta.src = `assets/cartas/${carta}.png`;
        imgCarta.classList.add('carta');
        divCartasJugadores[turno].append(imgCarta);
    }

    const determinarGanador = () => {
        
        const [puntosMinimos, puntosComputadora] = puntosJugadores;
        
        setTimeout(() => {
            
            if(puntosComputadora === puntosMinimos) {
                alert('Nadie Gana');
            }else if (puntosMinimos > 21) {
                alert('Computadora gana');
            }else if (puntosComputadora > 21) {
                alert('Jugador gana'); 
            }else {
                alert('Computadora Gana');
            }
        }, 100);
    }

    // Turno de la computadora
     const turnoComputadora = (puntosMinimos) => {

        let puntosComputadora = 0;

        do {
            const carta = pedirCarta();
            
            puntosComputadora = acumularPuntos(carta, puntosJugadores.length - 1); // El último jugador es la PC 

            crearCarta(carta, puntosJugadores.length - 1);

        } while ((puntosComputadora < puntosMinimos) && (puntosMinimos <= 21));

        determinarGanador();
    }

    // Eventos Click
    btnPedir.addEventListener('click',() => { //Callback (Función que entra por Argmento)

        const carta = pedirCarta();
        
        const puntosJugador = acumularPuntos(carta, 0);

        crearCarta(carta, 0);        

        if (puntosJugador > 21) {
            console.warn('Has perdido');
            btnPedir.disabled = true;
            btnDetener.disabled = true;
            turnoComputadora(puntosJugador);
        }else if (puntosJugador === 21) {
            console.warn('21! Genial!');
            btnPedir.disabled = true;
            btnDetener.disabled = true;
            turnoComputadora(puntosJugador);
        }

    }); 

    btnDetener.addEventListener('click', () => {
        
        btnPedir.disabled = true;
        btnDetener.disabled = true;

        turnoComputadora(puntosJugadores[0]);
    });

    /*btnNuevo.addEventListener('click', () => { //Básicamente tenemos que reiniciar todo

        inicializarJuego();
    });*/

    return {
        nuevoJuego: inicializarJuego
    }
})();







