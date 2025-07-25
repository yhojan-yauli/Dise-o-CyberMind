<?php
header('Content-Type: application/json');

try {
    $conexion = new mysqli("localhost", "root", "958814505", "ciberseguridad_db");
    $conexion->set_charset("utf8");

    if ($conexion->connect_error) {
        throw new Exception("Conexión fallida: " . $conexion->connect_error);
    }

    $sql = "SELECT * FROM comentarios ORDER BY fecha_publicacion DESC";
    $result = $conexion->query($sql);

    $comentarios = array();

    if ($result->num_rows > 0) {
        while($row = $result->fetch_assoc()) {
            $comentarios[] = $row;
        }
        echo json_encode($comentarios);
    } else {
        echo json_encode(["mensaje" => "No se encontraron comentarios."]);
    }

    $conexion->close();
} catch (Exception $e) {
    echo json_encode(["error" => $e->getMessage()]);
}
?>
