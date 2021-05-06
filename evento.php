<?php
  require_once "/usr/local/lib/php/vendor/autoload.php";
  include('controlador.php');
  
  $controlador = new Controlador();

  $loader = new \Twig\Loader\FilesystemLoader('templates');
  $twig = new \Twig\Environment($loader);
  
  if (isset($_GET['ev'])) {
    $idEv = $_GET['ev'];
  } else {
    $idEv = -1;
  }

  if (isset($_GET['print'])) {
    $print = $_GET['print'];
  } else {
    $print = 0;
  }

  $evento = $controlador->getEvento($idEv);
  $palabras = $controlador->getPalabrasProhibidas();
  $controlador->close();
  
echo $palabras[1]->palabra;

  echo $twig->render('evento.html', ['evento' => $evento,'palabras' => $palabras, 'imprimir' => $print]);


?>
