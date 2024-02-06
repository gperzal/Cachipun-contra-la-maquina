
let jugadaUsuario = '';
let juegosRestantes = 0; // Contador para la cantidad de juegos restantes


document.addEventListener('DOMContentLoaded', (event) => {
    // Eventos para las imágenes de jugada
    document.querySelector('img[alt="Piedra"]').addEventListener('click', () => seleccionarJugada('piedra'));
    document.querySelector('img[alt="Papel"]').addEventListener('click', () => seleccionarJugada('papel'));
    document.querySelector('img[alt="Tijeras"]').addEventListener('click', () => seleccionarJugada('tijeras'));

    // Evento para el botón de jugar
    document.getElementById('botonJugar').addEventListener('click', iniciarJuego);
});



function seleccionarJugada(jugada) {
  
    jugadaUsuario = jugada;
    // Mostrar la jugada seleccionada en el elemento con id 'resultado'
    document.getElementById('resultado').innerHTML = `Has seleccionado: ${jugadaUsuario}. <br><br>`;

    if (juegosRestantes > 0) {
        ejecutarJuego(); // Continuar con el siguiente juego si quedan juegos restantes
    }

}

function ejecutarJuego() {
    const jugadaMaquina = obtenerJugadaMaquina();
    const ganador = determinarGanador(jugadaUsuario, jugadaMaquina);
    const juegoNumero = document.getElementById('cantidad').value - juegosRestantes + 1;
   console.log(juegoNumero)
   console.log(juegosRestantes)
    mostrarResultado(ganador, jugadaUsuario, jugadaMaquina, juegoNumero);

    juegosRestantes--;

    // Seleccionar el botón por su id
    const botonJugar = document.getElementById('botonJugar');

    if (juegosRestantes > 0) {
        botonJugar.disabled = true;
        document.getElementById('resultado').innerHTML += '<spam id="jugada">Selecciona tu próxima jugada.</spam><br><br>';
    } else {
        // Reiniciar la jugada del usuario y la cantidad de juegos restantes para el próximo juego completo
        botonJugar.disabled = false;
        jugadaUsuario = '';

        //Reiniciamos el juego limpiado todo despues de 5 seg
        setTimeout(function(){
            document.getElementById('resultado').innerHTML = '';
            document.getElementById('cantidad').value ='1';
        }, 20000);

    }
}


//Jugada automatica con Math.random() 
function obtenerJugadaMaquina() {
    const jugadas = ['piedra', 'papel', 'tijera'];
    const indice = Math.floor(Math.random() * 3);
    return jugadas[indice];
}

function iniciarJuego() {
    // Verificar si el usuario ha seleccionado una jugada
    if (jugadaUsuario==='') {
       
        document.getElementById('resultado').innerHTML = 'Debe seleccionar al menos una opción entre Piedra, Papel o Tijeras. <br>';
        return; // Salir de la función si no se ha seleccionado una jugada
    }
       
 
    //Validamos que el usuario no ingrese 0 juegos
    const cantidad = document.getElementById('cantidad').value;
    if (cantidad <= 0) {
        document.getElementById('resultado').innerHTML = 'Por favor, ingresa una cantidad válida de juegos.<br>';
        return;
    }

    // Limpiar el contenido de 'resultado' para mostrar los resultados de los nuevos juegos
    document.getElementById('resultado').innerHTML = '';

    juegosRestantes = cantidad; // Establecer la cantidad de juegos restantes
    ejecutarJuego(); // Iniciar el primer juego


    jugadaUsuario = '';
    
}


//Definir a un ganador considerando la jugada del usuario y la generada automáticamente para la máquina
function determinarGanador(jugadaUsuario, jugadaMaquina) {

    if (jugadaUsuario === jugadaMaquina) {
        return 'Empate';
    } else if (
        (jugadaUsuario === 'piedra' && jugadaMaquina === 'tijera') ||
        (jugadaUsuario === 'papel' && jugadaMaquina === 'piedra') ||
        (jugadaUsuario === 'tijera' && jugadaMaquina === 'papel')
    ) {
    
        return 'Usuario';
    } else {
      
        return 'Máquina';
        
    }
}

//mostramos resultados de la partida
function mostrarResultado(ganador, jugadaUsuario, jugadaMaquina, juegoNumero) {
    const divResultado = document.getElementById('resultado');
    let mensaje = `Juego ${juegoNumero}: <br>Tu jugada: ${jugadaUsuario}. <br>Jugada de la máquina: ${jugadaMaquina}. `;

    if (ganador === 'Empate') {
        mensaje += '<br><span>¡Es un empate!</span>';
    } else if (ganador === 'Usuario') {
        mensaje += '<br><span>¡Felicidades, has ganado!</span>';
    } else {
        mensaje += '<br><span>Has perdido contra la máquina.</span>';
    }


    // Agregar el resultado de cada juego al contenido de 'resultado'
    divResultado.innerHTML += mensaje+ '<br><br>';


}

