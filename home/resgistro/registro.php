<?php
include '../conexion.php';

$username = $_POST['new-username'];
$email = $_POST['email'];
$password = password_hash($_POST['new-password'], PASSWORD_DEFAULT);

$sql = "INSERT INTO usuarios (username, email, password) VALUES ('$username', '$email', '$password')";

if ($conn->query($sql) === TRUE) {
    echo "<div style='text-align: center; margin-top: 50px;'>
            <h2>Registro exitoso</h2>
            <p>Tu registro se ha completado con éxito.</p>
            <a href='../login/login.html' style='display: inline-block; margin-top: 20px; padding: 10px 20px; background-color: #333; color: #fff; text-decoration: none; border-radius: 5px;'>Iniciar Sesión</a>
            </div>";
} else {
    echo "Error: " . $sql . "<br>" . $conn->error;
}

$conn->close();
?>