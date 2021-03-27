
/* Bool para comprobar el estado visible o no del desplegable */
var oculto = true;


/* Array de palabras prohibidas */
var bad_words = /profesor|maestro|caca|culo|sevilla|maquina|covid|coronavirus|puto|puta|mierda|cabron/gi;


/* Muestra u oculta el desplegable de comentarios */
function mostrarComentarios(){

  var css = document.getElementById("desplegable");

  if(!oculto)
   css.style.display = "none";
  else
    css.style.display = "block";
    
  oculto = !oculto;
}


function comprobarDate(date){
  var format_date = date;
  if(date<10){
    format_date = "0"+date;
  }
  console.log(format_date);
  return format_date;
}

/**
 * Recupera la información introducida por el usuario.
 *
 * @return {Boolean} False
 */
function enviarComentario(){
  var nombre     = document.getElementById("nombre").value;
  var comentario = document.getElementById("comentario").value;
  var email      = document.getElementById("email").value;
  var date       = new Date();
  var dia        = comprobarDate(date.getDate());
  var mes        = comprobarDate(date.getMonth());
  var fecha      = dia + "/" + mes + "/" + date.getFullYear();
  var horas      = comprobarDate(date.getHours());
  var minutos    = comprobarDate(date.getMinutes());
  var hora       = horas + ":" + minutos;
  date           = fecha + " - " + hora;
  alert("vaya");
  // Comprueba si los campos están completados
  if ( !(nombre==="" || comentario==="" || email==="" ))
    crearNuevoComentario(date, nombre, comentario);

  // Devulve false para evitar que la página se refresque al hacer submit
  return false;
}


/**
 * Crea y añade el nuevo comentario a la sección de comentarios.
 *
 * @param  {String} fecha  Concatenación de fecha y hora
 * @param  {String} nombre Nombre del cliente
 * @param  {String} texto  Comentario introducido por el cliente
 * @return {void}
 */
function crearNuevoComentario(fecha, nombre, texto){
  // Variables auxiliares para crear nodos de texto
  var text_node;
  var parrafo;

  // Crear nuevos elementos
  var nuevo_comentario = document.createElement("div");
  nuevo_comentario.setAttribute("class", "comentario");
  var fecha_nombre = document.createElement("div");
  fecha_nombre.setAttribute("class", "comentario-fecha");
  // Añadir fecha y autor a la sección comentario-fecha
  parrafo = document.createElement("p");
  text_node = document.createTextNode(fecha);
  parrafo.appendChild(text_node);
  fecha_nombre.appendChild(parrafo);
  parrafo = document.createElement("p");
  text_node = document.createTextNode(nombre);
  parrafo.appendChild(text_node);
  fecha_nombre.appendChild(parrafo);
  // Añadir la sección comentario-fecha al nuevo comentario
  nuevo_comentario.appendChild(fecha_nombre);
  // Crear cuerpo del comentario y añadirlo al nuevo comentario
  var comentario = document.createElement("div");
  comentario.setAttribute("class", "texto");
  text_node = document.createTextNode(texto);
  comentario.appendChild(text_node);
  nuevo_comentario.appendChild(comentario);

  // Recuperar comentarios anteriores y añadir el nuevo
  var old_data  = document.getElementById("comentarios");
  old_data.appendChild(nuevo_comentario);return false;
}


/* Censura palabras del comentario que sean del array bad_words */
function revisarComentario(){
  var comentario = document.getElementById("comentario");
  comentario.value = comentario.value.replace(bad_words, "****");
}

document.getElementById("mi_boton").addEventListener("click", mostrarComentarios);
document.getElementById("comentario").addEventListener("change", revisarComentario);
/*document.getElementById("submit").addEventListener("submit", enviarComentario);*/