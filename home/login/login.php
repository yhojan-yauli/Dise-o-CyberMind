<?php
session_start();
include '../conexion.php';

$username = $_POST['username'];
$password = $_POST['password'];

$sql = "SELECT id, username, password FROM usuarios WHERE username = '$username'";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
    $row = $result->fetch_assoc();
    if (password_verify($password, $row['password'])) {
        $_SESSION['user_id'] = $row['id'];
        $_SESSION['username'] = $row['username'];
        header("Location: /home/home_logueado.html");
        exit();
    } else {
        echo "Contraseña incorrecta";
    }
} else {
    echo "Usuario no encontrado";
}

$conn->close();
?>
