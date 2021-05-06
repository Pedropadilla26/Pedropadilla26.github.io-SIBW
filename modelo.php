<?php

class Evento{
  public $id;
  public $nombre;
  public $titulo;
  public $organizador;
  public $fecha;
  public $descripcion;
  public $link;
  public $imagenes;
  public $comentarios;
}

class Imagen{
  public $img;
  public $desc;
}

class Comentario{
  public $id_evento;
  public $autor;
  public $fecha;
  public $email;
  public $comentario;
}



class ConexionBD {

  public static $conn;

  public function getEvento($idEv) {

    $stmt = self::$conn->prepare("Select * FROM evento Where evento.id = ?");
    $stmt->bind_param("i", $idEv);
    $stmt->execute();
    $result = $stmt->get_result(); 
    $datos = $result->fetch_assoc();
    $stmt->close();

    $evento = new Evento();
    $evento->id = $datos['id'];
    $evento->nombre = $datos['nombre'];
    $evento->titulo = $datos['titulo'];
    $evento->organizador = $datos['organizador'];
    $evento->fecha = $datos['fecha'];
    $evento->descripcion = $datos['descripcion'];
    $evento->link = $datos['link'];
    $evento->imagenes = $this->getImagenesEvento($datos['id']);
    $evento->comentarios = $this->getComentariosEvento($datos['id']);
    return $evento;
  }


  public static function getImagenPortada($idEv) {
 
    // prepare and bind
    $stmt = self::$conn->prepare("SELECT * FROM imagen WHERE imagen.id_evento = ? AND imagen.descripcion=''");
    $stmt->bind_param("i", $idEv);
    $stmt->execute();
    $result = $stmt->get_result(); // get the mysqli result
    $imagen = $result->fetch_assoc();
    $stmt->close();

    return $imagen;
  }

  public function getEventos(){
 
    // prepare and bind
    $stmt = self::$conn->prepare("SELECT * FROM evento");
    $stmt->execute();
    $result = $stmt->get_result(); // get the mysqli result
    $stmt->close();

    $eventos = [];

    $fila = new stdClass();

    $i = 1;
    while($fila = $result->fetch_array()) {
      $evento_actual = new Evento();
      $evento_actual->id=$fila['id'];
      $evento_actual->nombre=$fila['nombre'];
      $evento_actual->imagenes[]=$this->getImagenPortada($fila['id']);
      $eventos[] = $evento_actual;
    }
  
    return $eventos;
  }
  



  public static function getImagenesEvento($idEv) {
 
    // prepare and bind
    $stmt = self::$conn->prepare("SELECT * FROM imagen WHERE imagen.id_evento = ?");
    $stmt->bind_param("i", $idEv);
    $stmt->execute();
    $result = $stmt->get_result(); // get the mysqli result
    $stmt->close();


    $imagenes = [];
    $fila = new stdClass();

    while($fila = $result->fetch_array()) {
      $imagen = new Imagen();
      $imagen->img=$fila['img'];
      $imagen->desc=$fila['descripcion'];
      $imagenes[] = $imagen;
    }

    return $imagenes;
  }


  public static function getComentariosEvento($idEv) {
 
    // prepare and bind
    $stmt = self::$conn->prepare("SELECT * FROM comentario WHERE comentario.id_evento = ?");
    $stmt->bind_param("i", $idEv);
    $stmt->execute();
    $result = $stmt->get_result(); // get the mysqli result

    $comentarios = [];
    $fila = new stdClass();

    while($fila = $result->fetch_array()) {
      $comentario = new Comentario();
      $comentario->id_evento=$fila['id_evento'];
      $comentario->autor=$fila['autor'];
      $comentario->fecha=$fila['fecha'];
      $comentario->email=$fila['email'];
      $comentario->comentario=$fila['comentario'];
      $comentarios[] = $comentario;
    }
    $stmt->close();

    return $comentarios;
  }

  public static function getPalabrasProhibidas() {
 
    // prepare and bind
    $stmt = self::$conn->prepare("SELECT palabra FROM palabras_prohibidas");
    $stmt->execute();
    $result = $stmt->get_result(); // get the mysqli result
    $palabras = [];
    $fila = new stdClass();

    while($fila = $result->fetch_array()) {
      $palabra = $fila['palabra'];
      $palabras[] = $palabra;
    }
    $stmt->close();
    return $palabras;
  }

  public static function crearConexion() {
    $servername = "mysql";
    $username = "coronavirus";
    $password = "covid19";
    $dbname = "SIBW";

    // Create connection
    self::$conn = new mysqli($servername, $username, $password, $dbname);

    // Check connection
    if (self::$conn->connect_error) {
      die("Connection failed: " . self::$conn->connect_error); 
    }
    self::$conn->query("SET NAMES 'utf8'");
    return $conn;
  }

  public static function cerrarConexion() {
    self::$conn->close();
  }

}


?>
