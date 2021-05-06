<?php

require_once('./modelo.php');
Class Controlador{

    public static $modelo;

    public function __construct()
    {
        self::$modelo = new ConexionBD();
        self::$modelo->crearConexion();
    } 

    public function getEventos()
    {
        $eventos = self::$modelo->getEventos();
        return $eventos;
    }

    public function getEvento($idEv)
    {
        $evento = self::$modelo->getEvento($idEv);
        return $evento;
    }

    public function getComentariosEvento($idEv){
        $comentarios = self::$modelo->getComentariosEvento($idEv);
        return $comentarios;
    }

    public function getPalabrasProhibidas(){
        $palabras = self::$modelo->getPalabrasProhibidas();
        return $palabras;
    }

    public function close(){
        self::$modelo->cerrarConexion();
    }
}   
?>