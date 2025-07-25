<?php
if(!empty($_POST["btn-login"]) )
    if(empty($_POST["user"]) || empty($_POST["pass"])) {
        echo '<div class="alert-danger">Por favor, complete todos los campos.</div>';
    } else {
        $usuario = $_POST["user"];
        $clave = $_POST["pass"];
        $sql=$conexion->query("SELECT * FROM usuarios WHERE email='$usuario' AND password='$clave'");
        if($datos=$sql->fetch_object()) {
            header("Location:HomeLogueado/HomeLogueado.html");
        } else {
                echo '<div class="alert-danger red">Acceso denegado.</div>';
        }
    }
?>