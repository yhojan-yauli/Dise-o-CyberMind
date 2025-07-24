<?php
if (isset($_POST["btn-register"])) {
    if (empty($_POST["new-username"]) || empty($_POST["email"]) || empty($_POST["new-password"]) || empty($_POST["confirm-password"])) {
        echo '<div class="alert alert-danger">Por favor, complete todos los campos.</div>';
    } else {
        $usuario = $_POST["new-username"];
        $email = $_POST["email"];
        $clave = $_POST["new-password"];
        $confirmar_clave = $_POST["confirm-password"];

        if ($clave !== $confirmar_clave) {
            echo '<div class="alert alert-danger">Las contraseñas no coinciden.</div>';
        } else {
            global $conexion;
            if ($conexion->connect_error) {
                echo '<div class="alert alert-danger">Conexión fallida: ' . $conexion->connect_error . '</div>';
            } else {
                // Verificar si el correo ya existe en la base de datos
                $sql_check_email = "SELECT id FROM usuarios WHERE email = ?";
                $stmt_check_email = $conexion->prepare($sql_check_email);
                $stmt_check_email->bind_param("s", $email);
                $stmt_check_email->execute();
                $stmt_check_email->store_result();

                if ($stmt_check_email->num_rows > 0) {
                    echo '<div class="alert alert-danger">El correo electrónico ya está registrado.</div>';
                } else {
                    // Insertar el nuevo usuario si el correo no está registrado
                    $sql_insert = "INSERT INTO usuarios (username, email, password) VALUES (?, ?, ?)";
                    $stmt_insert = $conexion->prepare($sql_insert);

                    if ($stmt_insert === false) {
                        echo '<div class="alert alert-danger">Error en la preparación de la consulta: ' . $conexion->error . '</div>';
                    } else {
                        $stmt_insert->bind_param("sss", $usuario, $email, $clave);

                        if ($stmt_insert->execute()) {
                            echo '<div class="alert alert-success">Registro exitoso. Ahora puedes iniciar sesión.</div>';
                        } else {
                            echo '<div class="alert alert-danger">Error al registrar el usuario: ' . $stmt_insert->error . '</div>';
                        }

                        $stmt_insert->close();
                    }
                }

                $stmt_check_email->close();
            }
        }
    }
}
?>
