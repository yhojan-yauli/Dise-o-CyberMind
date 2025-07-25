<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Registro</title>
  <link rel="stylesheet" href="../index.css" />
  <link rel="stylesheet" href="./registro.css" />
  <script src="https://kit.fontawesome.com/18d320874d.js" crossorigin="anonymous"></script>
</head>
<body>
  <header>
    <nav class="navbar">
      <div class="navbar-brand">
        <a href="/">Cyber Mind</a>
      </div>
      <input type="checkbox" id="menu-toggle" />
      <label for="menu-toggle" class="hamburger">
        <i class="fas fa-bars"></i>
      </label>
      <ul class="navbar-nav">
        <li class="nav-item"><a class="nav-link" href="../index.html">Inicio</a></li>
        <li class="nav-item"><a class="nav-link" href="../cursosPremium/cursos-premium.html">Cursos Premium</a></li>
        <li class="nav-item"><a class="nav-link" href="../foros/foros.html">Foros</a></li>
      </ul>
    </nav>
  </header>

  <main>
    <section>
      <h2>Registrarse</h2>

      <?php
      include("conexion_registro.php");
      if ($_SERVER["REQUEST_METHOD"] == "POST") {
        include("controlador_registro.php");
      }
      ?>

      <form action="registro.php" method="post">
        <div class="input-row">
          <div class="input-group">
            <label for="nombre">Nombre:</label>
            <input type="text" id="nombre" name="nombre" required>
          </div>
          <div class="input-group">
            <label for="apellido">Apellido:</label>
            <input type="text" id="apellido" name="apellido" required>
          </div>
        </div>

        <div class="input-row">
          <div class="input-group">
            <label for="dni">DNI / Cédula:</label>
            <input type="text" id="dni" name="dni" placeholder="Ej: 12345678, V-12345678, ABC123456" required>
          </div>
          <div class="input-group">
            <label for="pais">País:</label>
            <select id="pais" name="pais" required>
              <option value="">Selecciona un país</option>
              <option value="Perú">Perú</option>
              <option value="México">México</option>
              <option value="Ecuador">Ecuador</option>
              <option value="Argentina">Argentina</option>
              <option value="Bolivia">Bolivia</option>
              <option value="Chile">Chile</option>
              <option value="Colombia">Colombia</option>
              <option value="Uruguay">Uruguay</option>
              <option value="Paraguay">Paraguay</option>
              <option value="Otro">Otro</option>
            </select>
          </div>
        </div>

        <label for="email">Email:</label>
        <input type="email" id="email" name="email" required>

        <label for="new-password">Contraseña:</label>
        <div class="password-input-container">
          <input type="password" id="new-password" name="new-password" required>
          <i class="fas fa-eye toggle-password" id="togglePassword"></i>
        </div>

        <label for="confirm-password">Confirmar Contraseña:</label>
        <div class="password-input-container">
          <input type="password" id="confirm-password" name="confirm-password" required>
          <i class="fas fa-eye toggle-password" id="toggleConfirmPassword"></i>
        </div>

        <div class="form-buttons">
          <button type="button" onclick="window.location.href='../login/login.php'">Iniciar Sesión</button>
          <button type="submit" name="btn-register">Registrarse</button>
        </div>
      </form>
    </section>
  </main>

  <script src="/js/script.js"></script>
  <script src="./registro.js"></script>
  <script>
    const togglePassword = document.querySelector('#togglePassword');
    const password = document.querySelector('#new-password');

    const toggleConfirmPassword = document.querySelector('#toggleConfirmPassword');
    const confirmPassword = document.querySelector('#confirm-password');

    togglePassword.addEventListener('click', function() {
      const type = password.getAttribute('type') === 'password' ? 'text' : 'password';
      password.setAttribute('type', type);
      this.classList.toggle('fa-eye-slash');
    });

    toggleConfirmPassword.addEventListener('click', function() {
      const type = confirmPassword.getAttribute('type') === 'password' ? 'text' : 'password';
      confirmPassword.setAttribute('type', type);
      this.classList.toggle('fa-eye-slash');
    });
  </script>
</body>
</html>