// Función para cargar comentarios
function cargarComentarios() {
  fetch('obtener_comentarios.php')
    .then(response => response.json())
    .then(comentarios => {
      const contenedorComentarios = document.getElementById('contenedor-comentarios');
      contenedorComentarios.innerHTML = '';
      comentarios.forEach(comentario => {
        const comentarioElemento = document.createElement('div');
        comentarioElemento.innerHTML = `
          <p>${comentario.usuario}: ${comentario.contenido}</p>
        `;
        contenedorComentarios.appendChild(comentarioElemento);
      });
    });
}

// Función para enviar un comentario
function enviarComentario() {
  const usuario = document.getElementById('usuario').value;
  const contenido = document.getElementById('contenido').value;

  fetch('guardar_comentario.php', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: `usuario=${encodeURIComponent(usuario)}&contenido=${encodeURIComponent(contenido)}`
  })
  .then(response => response.text())
  .then(data => {
    console.log(data);
    cargarComentarios();
  });
}

// Cargar comentarios al cargar la página
window.onload = cargarComentarios;
