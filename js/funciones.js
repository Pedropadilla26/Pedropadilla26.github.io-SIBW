
/* Bool para comprobar el estado visible o no del desplegable */
var oculto = true;


/* Array de palabras prohibidas */
//var bad_words = /profesor|maestro|caca|culo|covid|coronavirus|puto|puta|mierda|cabron/gi;
bad_words = [];

/* Muestra u oculta el desplegable de comentarios */
function mostrarComentarios(){
  aniadirProhibidas();
  var css = document.getElementById("desplegable");

  if(!oculto)
   css.style.display = "none";
  else
    css.style.display = "block";
    
  oculto = !oculto;
}

//Por si es menor que el dia mes o año 10. Ej: mes 3, se formatea a 03
function comprobarDate(date){
  var format_date = date;
  if(date<10){
    format_date = "0"+date;
  }
  console.log(format_date);
  return format_date;
}

function aniadirProhibidas(){
  var bloque = document.getElementById("prohibidas");

  var inp = bloque.innerText;
  var palabras = inp.split(' ');

  for (i = 0; i < palabras.length; i++) {
    bad_words.push(palabras[i].toUpperCase());
    console.log(bad_words[i]);

  }
}


/* Recoge la info enviada por el usuario y comprueba los datos antes de crear el comentario */
function enviarComentario(){
  var nombre     = document.getElementById("nombre").value;
  var comentario = document.getElementById("comentario").value;
  var email      = document.getElementById("email").value;
  var date       = new Date();
  var dia        = comprobarDate(date.getDate());
  var mes        = comprobarDate(date.getMonth() + 1); //Month empieza por 0
  var fecha      = dia + "/" + mes + "/" + date.getFullYear();
  date           = fecha;

  // Comprueba que los campos estén rellenados
  if ( !(nombre==="" || comentario==="" || email==="" )){
    //Comprueba que el email es válido
    if (validateEmail(email)){

      //Para resetear el contenido del form si es valido
      document.getElementById("nombre").value ="";
      document.getElementById("comentario").value ="";
      document.getElementById("email").value ="";

      //Llama a la creacion del comentario
      crearNuevoComentario(date, nombre, comentario);

    }
    else 
      alert("Formato de email no válido.")
  }
    else
      alert("Debes rellenar todos los campos.")

      preventDefault() ;
  return false;
}


/* Comprueba la validez del email, source: https://stackoverflow.com/questions/46155/how-to-validate-an-email-address-in-javascript */
function validateEmail(email) {
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

/* Añade el nuevo comentario como append child del contenedor de comentarios, usando appendchilds y text nodes
el propio comentario para aniadir los elementos de texto */
function crearNuevoComentario(fecha, nombre, texto){
  // Variable auxiliar para crear nodos de texto
  var text_node;

  var contenedor_comentario = document.createElement("div");
  contenedor_comentario.setAttribute("id", "contenedor-comentario");

  var autor = document.createElement("h3");
  autor.setAttribute("id", "autor");
  text_node = document.createTextNode(nombre);
  autor.appendChild(text_node);

  var fecha_comentario = document.createElement("h3");
  fecha_comentario.setAttribute("id", "fecha");
  text_node = document.createTextNode(fecha);
  fecha_comentario.appendChild(text_node);

  var parrafo = document.createElement("p");
  text_node = document.createTextNode(texto);
  parrafo.appendChild(text_node);

  contenedor_comentario.appendChild(autor);
  contenedor_comentario.appendChild(fecha_comentario);
  contenedor_comentario.appendChild(parrafo);

  // Recuperar comentarios anteriores y añadir el nuevo
  var desplegable  = document.getElementById("contenedor-comentarios");
  desplegable.appendChild(contenedor_comentario);
  return false;
}


/* Censura palabras del comentario que sean del array bad_words */
function revisarComentario(palabras){
  var comentario = document.getElementById("comentario");
  for (i = 0; i < bad_words.length - 1; i++) {
    comentario.value = comentario.value.replace(bad_words[i], "****");

  }
}

document.getElementById("mi_boton").addEventListener("click", mostrarComentarios);
document.getElementById("comentario").addEventListener("change", revisarComentario);
document.getElementById("submit").addEventListener("click", enviarComentario);