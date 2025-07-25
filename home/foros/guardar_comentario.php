<?php
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "ciberseguridad_db";

// Crear conexión
$conn = new mysqli($servername, $username, $password, $dbname);

// Verificar conexión
if ($conn->connect_error) {
    die("Conexión fallida: " . $conn->connect_error);
}

$usuario = $_POST['usuario'];
$contenido = $_POST['contenido'];
$respuesta_a = isset($_POST['respuesta_a']) ? $_POST['respuesta_a'] : NULL;

$sql = "INSERT INTO comentarios (usuario, contenido, respuesta_a) VALUES ('$usuario', '$contenido', $respuesta_a)";

if ($conn->query($sql) === TRUE) {
    echo "Comentario guardado exitosamente";
} else {
    echo "Error: " . $sql . "<br>" . $conn->error;
}

$conn->close();
?>
