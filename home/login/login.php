<!DOCTYPE html>
<html lang="es">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Login</title>
    <link rel="stylesheet" href="../index.css">
    <link rel="stylesheet" href="../login/login.css">

</head>

<body>
    <header>
        <nav class="navbar">
            <div class="navbar-brand">
                <a href="/">Ciberseguridad</a>
            </div>
            <ul class="navbar-nav">
                <li class="nav-item"><a class="nav-link" href="../index.html">Inicio</a></li>
                <li class="nav-item"><a class="nav-link" href="../cursosPremium/cursos-premium.html">Cursos Premium</a>
                </li>
                <li class="nav-item"><a class="nav-link" href="../foros/foros.html">Foros</a></li>
            </ul>
        </nav>
    </header>
    <main>
        <section>
            <h2>Iniciar Sesión</h2>
            <?php
            include ("conexion.php");
            include ("controlador.php"); 
            ?>     
            <form action="login.php" method="post" autocomplete="off">
                




            <label for="username">Usuario:</label>
                <input type="text" id="username" name="user" required>
                <label for="password">Contraseña:</label>
                <input type="password" id="password" name="pass" required>





                <div class="form-buttons">
                <button type="button" onclick="window.location.href='../index.html'">Atrás</button>
                <button type="submit" name="btn-login" class="btn" value="Iniciar Sesión">Iniciar Sesión</inp>
                </div>
            </form>
            <p class="register-link">¿No tienes cuenta? <a href="../resgistro/registro.php">Regístrate</a></p>
        </section>
    </main>
    <footer>
        <p>© 2023 Curso de Ciberseguridad</p>
    </footer>
    <script>
    window.onload = function() {
        document.getElementById("username").value = "";
        document.getElementById("password").value = "";
    };
</script>
</body>

</html>