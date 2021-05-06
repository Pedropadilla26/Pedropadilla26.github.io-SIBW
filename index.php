<?php
  require_once "/usr/local/lib/php/vendor/autoload.php";

  include('controlador.php');

  $controlador = new Controlador();

  $loader = new \Twig\Loader\FilesystemLoader('templates');
  $twig = new \Twig\Environment($loader);
  
  $eventos = $controlador->getEventos();  
  $controlador->close();

  echo $twig->render('index.html', ['eventos' => $eventos]);
?>
