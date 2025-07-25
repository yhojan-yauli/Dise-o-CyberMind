<?php
header('Content-Type: application/json');

try {
    $conexion = new mysqli("localhost", "root", "958814505", "ciberseguridad_db");
    $conexion->set_charset("utf8");

    if ($conexion->connect_error) {
        throw new Exception("Conexión fallida: " . $conexion->connect_error);
    }

    $searchTerm = isset($_GET['search']) ? $_GET['search'] : '';

    if (empty($searchTerm)) {
        echo json_encode(["mensaje" => "No se proporcionó un término de búsqueda."]);
        exit;
    }

    $searchTerm = $conexion->real_escape_string($searchTerm);
    $sql = "SELECT * FROM comentarios WHERE asunto LIKE '%$searchTerm%' OR descripcion LIKE '%$searchTerm%'";
    $result = $conexion->query($sql);

    $comentarios = array();

    if ($result->num_rows > 0) {
        while($row = $result->fetch_assoc()) {
            $comentarios[] = $row;
        }
        echo json_encode($comentarios);
    } else {
        echo json_encode(["mensaje" => "No se encontraron comentarios que coincidan con la búsqueda."]);
    }

    $conexion->close();
} catch (Exception $e) {
    echo json_encode(["error" => $e->getMessage()]);
}
?>
