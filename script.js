var myIndex = 0;
var st = ["Piedra", "Papel", "o Tijera"];
var superpiedra = ["SUPER, PIEDRA PAPEL O TIJERA... DOS?...TURBO?"];
var voices = window.speechSynthesis.getVoices();

var audio = document.getElementById("player2").volume = 0.2;
var audio2 = document.getElementById("player").volume = 0.2;

var puntaje_us = 0;
var puntaje_cpu = 0;
var acum = 0;




//CAROUSEL
function carousel() {

  var i;

  var x = document.getElementsByClassName("mySlides");
  for (i = 0; i < x.length; i++) {
    x[i].style.visibility = "hidden";

  }
  myIndex++;
  if (myIndex > x.length) {
    myIndex = 1
  }

  x[myIndex - 1].style.visibility = "visible";
  setTimeout(carousel, 350); // Change image every 2 seconds
  //SE LLAMA A SI MISMA
  


}

//TEXTO A VOCES
function speak(string) {

  var utterance = new SpeechSynthesisUtterance();
  utterance.voice = speechSynthesis.getVoices()[5];
  utterance.text = string;
  utterance.lang = "en-ES";
  utterance.volume = 1; //0-1 interval
  utterance.rate = .8;
  utterance.pitch = 1; //0-2 interval
  speechSynthesis.speak(utterance);
}

function intro(string) {
  var string = superpiedra;
  var utterance = new SpeechSynthesisUtterance();
  utterance.voice = speechSynthesis.getVoices()[5];
  utterance.text = string;
  utterance.lang = "en-US";
  utterance.volume = 1; //0-1 interval
  utterance.rate = 1;
  utterance.pitch = 1; //0-2 interval
  speechSynthesis.speak(utterance);
}
// FUNCIONES JUEGO (OCULTAR Y MOSTRAR)
function ganar() {
  document.getElementById("win").style.display = "block";
  document.getElementById("lose").style.display = "none";
  document.getElementById("meh").style.display = "none";

}

function perder() {
  document.getElementById("lose").style.display = "block";
  document.getElementById("win").style.display = "none";
  document.getElementById("meh").style.display = "none";
}

function empatar() {

  document.getElementById("meh").style.display = "block";
  document.getElementById("win").style.display = "none";
  document.getElementById("lose").style.display = "none";
}
function volver() {
  location.href = "./index.html";
};
function puntos() {
  $(".porPuntos").css("display", "block");
}

//redirigir
function rediri(){
  window.location.href = "./index.html";
  
}

/*

EL JUEGO

*/ 
$(document).ready(function () {


  //BOTONERA
  $("header").on("click", intro);
  $(".botones").on("click", puntos);
  $("#fight").one("click", carousel);
  $("#btnVolver").on("click", volver);
  document.getElementById("p3").onclick = function () {
    location.href = "./main.html";
  };
  document.getElementById("p5").onclick = function () {
    location.href = "./main.html";
  };

  //BOTONERA


  /*

  EL GRAN JUEGO DE LA PIEDRA ETCETCETC

  */
  $("#piedraP, #papelP, #tijeraP").click(function jugar() {
    var res;
    var eleccion = $(this).attr("id");



    $("#usuario_eleccion").html(eleccion);


    /********SELECCION MAQUINA */
    var maq = Math.floor(Math.random() * 3);

    if (maq == 0) {
      maq = "piedra";
    } else if (maq == 1) {
      maq = "papel";
    } else if (maq == 2) {
      maq = "tijera";
    }

    $("#maquina_eleccion").html(maq);
    /********SELECCION  MAQUINA */


    /********SELECCION DE USUARIO */
    if (eleccion == "piedraP") {
      eleccion = "piedra"
      speak("piedraa?");
      if (maq == "papel") {
        res = "Perdiste";
      } else if (maq == "tijera") {
        res = "Ganaste";
      } else if (maq == "piedra") {
        res = "Empate";

      }

    }

    if (eleccion == "papelP") {
      eleccion = "papel";
      speak("papeell");
      if (maq == "tijera") {
        res = "Perdiste";
      } else if (maq == "piedra") {
        res = "Ganaste";
      } else if (maq == "papel") {
        res = "Empate";

      }

    }

    if (eleccion == "tijeraP") {
      speak("tijera");
      eleccion = "tijera";
      if (maq == "piedra") {
        res = "Perdiste";
      } else if (maq == "papel") {
        res = "Ganaste";
      } else if (maq == "tijera") {
        res = "Empate";

      }

    }

    /********SELECCION DE USUARIO */


    /********MOSTRAR RESULTADOS 
     * 
     * 
     */

    if (res == "Ganaste") {
      //CHAU MENU PELEA
      $(".pelea").hide();
      //muestro victoria
      $("#gane").show(500);
      ganar();
      puntaje_us++; //SUMO AL TOTAL DEL JUGADOR
      $("#puntaje_usuario").html(puntaje_us) //Muestro en pantalla



    } else if (res == "Perdiste") {
      $(".pelea").hide();
      //muestro victoria
      $("#gane").hide();
      $("#perdi").show(500);
      perder();
      puntaje_cpu++; // +CPU
      $("#puntaje_cpu").html(puntaje_cpu); //MOSTRAR

    } else if (res == "Empate") {
      $(".pelea").hide();

      $("#meh2").show(500);

      empatar();
      $("#puntaje_usuario").html(puntaje_us);
      $("#puntaje_cpu").html(puntaje_cpu);
    }
    /*
     *
     *
     *****MOSTRAR RESULTADOS*/




    /* EL BOTON GO!*/

    $("#fight").click(function rejugar() {
      // speak(st);
      //OCULTA LO ANTERIOR
      $("#meh2,#win,#lose,#meh,#gane,#perdi").hide();
      // 
      //MUESTRA EL MENU DE SELECCION DE ITEM
      $(".pelea").show(1000); //DELAY
      if (puntaje_us == 3) {
        //GANASTE
        $(".pelea").hide();
        $("#lomensajito").hide();
        $("#ganador").show(2000);

        // $("#fight").hide();
        setTimeout("rediri()",6000);

      } else if (puntaje_cpu == 3) {
        //PERDISTE
        // $(".pelea").hide();
        // $("#lomensajito").hide();
        setTimeout("rediri()",6000);
        $("#perdedor").show(1000);
        
        $("#fight").hide(); // lo borramos?


      } else if (puntaje_cpu > 3 || puntaje_us > 3) {
        //SI EL PUNTAJE SE PASA DE 3 VA AL MENSAJE FINAL
        $(".pelea").show();
        $("#lomensajito").hide();
      }

    })




  })






});


