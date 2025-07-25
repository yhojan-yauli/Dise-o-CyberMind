// Espera a que el contenido del DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', function() {
  // Selecciona todos los botones con la clase específica o atributo
  const buttons = document.querySelectorAll('button[onclick*="homelogueado.html"]');

  // Añade un event listener a cada botón
  buttons.forEach(button => {
    button.addEventListener('click', function() {
      // Redirige a la página de "Home Logueado"
      window.location.href = './homelogueado.html';
    });
  });

  // Manejo del menú hamburguesa para dispositivos móviles
  const hamburger = document.querySelector('.hamburger');
  const menuToggle = document.querySelector('#menu-toggle');
  const navMenu = document.querySelector('.navbar-nav');

  if (hamburger && menuToggle && navMenu) {
    hamburger.addEventListener('click', function() {
      menuToggle.checked = !menuToggle.checked;
    });
  }
});

