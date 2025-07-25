// Función para cargar comentarios
function cargarComentarios() {
  fetch('obtener_comentarios.php')
    .then(response => response.json())
    .then(comentarios => {
      const contenedorComentarios = document.getElementById('contenedor-comentarios');
      contenedorComentarios.innerHTML = '';
      comentarios.forEach(comentario => {
        const comentarioElemento = document.createElement('div');
        comentarioElemento.classList.add('foro-comment');
        comentarioElemento.innerHTML = `
          <i class="fas fa-user-circle fa-2x"></i>
          <div class="content">
            <strong>${comentario.usuario}:</strong> ${comentario.contenido}
          </div>
        `;
        contenedorComentarios.appendChild(comentarioElemento);
      });
    });
}

// Función para enviar un comentario desde el modal
function enviarComentario() {
  const asunto = document.getElementById('asunto').value.trim();
  const descripcion = document.getElementById('descripcion').value.trim();

  if (asunto === '' || descripcion === '') {
    alert('Por favor completa ambos campos.');
    return;
  }

  fetch('guardar_comentario.php', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: `usuario=${encodeURIComponent(asunto)}&contenido=${encodeURIComponent(descripcion)}`
  })
  .then(response => response.text())
  .then(data => {
    console.log(data);
    document.getElementById('comentario-modal').style.display = 'none';
    document.getElementById('asunto').value = '';
    document.getElementById('descripcion').value = '';
    cargarComentarios();
  });
}

// Al cargar todo el DOM
document.addEventListener('DOMContentLoaded', () => {
  const modal = document.getElementById("comentario-modal");
  const abrirBtn = document.querySelector(".btn-agregar-comentario");
  const cancelarBtn = document.getElementById("cancelar-btn");
  const subirBtn = document.getElementById("subir-btn");

  if (abrirBtn && cancelarBtn && subirBtn && modal) {
    abrirBtn.addEventListener("click", () => {
      modal.style.display = "block";
    });

    cancelarBtn.addEventListener("click", () => {
      modal.style.display = "none";
    });

    subirBtn.addEventListener("click", enviarComentario);

    window.addEventListener("click", (e) => {
      if (e.target === modal) {
        modal.style.display = "none";
      }
    });
  }

  cargarComentarios();

  // Funcionalidad para abrir y cerrar respuestas de preguntas frecuentes
  const preguntas = document.querySelectorAll(".faq-question");

  preguntas.forEach(pregunta => {
    pregunta.addEventListener("click", () => {
      const respuesta = pregunta.nextElementSibling;

      const yaVisible = respuesta.style.display === "block";
      document.querySelectorAll(".faq-answer").forEach(r => r.style.display = "none");

      if (!yaVisible) {
        respuesta.style.display = "block";
      }
    });
  });
});