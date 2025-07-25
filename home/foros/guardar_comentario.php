<?php
// Conexión a la base de datos
$conexion = new mysqli("localhost", "root", "958814505", "ciberseguridad_db");
$conexion->set_charset("utf8");

// Verificar conexión
if ($conexion->connect_error) {
    die("Conexión fallida: " . $conexion->connect_error);
}

// Obtener datos del formulario
$asunto = $_POST['asunto'];
$descripcion = $_POST['descripcion'];

// Preparar la consulta SQL para insertar un nuevo comentario
$sql = "INSERT INTO comentarios (asunto, descripcion) VALUES (?, ?)";
$stmt = $conexion->prepare($sql);

if ($stmt) {
    // Vincular parámetros
    $stmt->bind_param("ss", $asunto, $descripcion);

    // Ejecutar la consulta
    if ($stmt->execute()) {
        echo "Nuevo comentario guardado exitosamente";
    } else {
        echo "Error al guardar el comentario: " . $stmt->error;
    }

    // Cerrar la declaración
    $stmt->close();
} else {
    echo "Error en la preparación de la consulta: " . $conexion->error;
}

// Cerrar conexión
$conexion->close();
?>
