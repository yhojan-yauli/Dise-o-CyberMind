document.addEventListener('DOMContentLoaded', function() {
      const modal = document.getElementById('comentario-modal');
      const btnAgregarComentario = document.querySelector('.btn-agregar-comentario');
      const btnCancelar = document.getElementById('cancelar-btn');
      const closeBtn = document.querySelector('.close');
      const form = document.getElementById('comentario-form');

      // Abrir modal al hacer clic en "Agregar comentario"
      btnAgregarComentario.addEventListener('click', () => {
        modal.style.display = 'block';
      });

      // Cerrar modal al hacer clic en "Cancelar" o en la "X"
      btnCancelar.addEventListener('click', () => {
        modal.style.display = 'none';
      });

      closeBtn.addEventListener('click', () => {
        modal.style.display = 'none';
      });

      // Cerrar modal al hacer clic fuera del contenido del modal
      window.addEventListener('click', (event) => {
        if (event.target === modal) {
          modal.style.display = 'none';
        }
      });

      // Manejar el envío del formulario
      form.addEventListener('submit', function(e) {
        e.preventDefault();

        const formData = new FormData(form);

        fetch('guardar_comentario.php', {
          method: 'POST',
          body: formData
        })
        .then(response => response.text())
        .then(data => {
          alert(data);
          modal.style.display = 'none';
          form.reset();
          cargarComentarios();
        })
        .catch(error => {
          console.error('Error:', error);
          alert('Error al guardar el comentario. Por favor, inténtalo de nuevo más tarde.');
        });
      });

      // Función para cargar comentarios desde la base de datos
      function cargarComentarios() {
        fetch('obtener_comentario.php')
          .then(response => {
            if (!response.ok) {
              throw new Error('Error en la respuesta de la red');
            }
            return response.json();
          })
          .then(data => {
            const contenedorComentarios = document.getElementById('contenedor-comentarios');
            contenedorComentarios.innerHTML = '';

            if (data.error) {
              // Mostrar mensaje de error específico
              contenedorComentarios.innerHTML = `<p>Error: ${data.error}</p>`;
            } else if (data.mensaje) {
              // Mostrar mensaje si no hay comentarios
              contenedorComentarios.innerHTML = `<p>${data.mensaje}</p>`;
            } else {
              // Mostrar comentarios si los hay
              data.forEach((comentario, index) => {
                const comentarioDiv = document.createElement('div');
                comentarioDiv.className = 'foro-comment';
                comentarioDiv.innerHTML = `
                  <i class="fas fa-user-circle fa-2x"></i>
                  <div class="content">
                    <strong>Comentario ${index + 1}:</strong> ${comentario.asunto}<br>
                    ${comentario.descripcion}
                  </div>
                `;
                contenedorComentarios.appendChild(comentarioDiv);
              });
            }
          })
          .catch(error => {
            console.error('Error al cargar comentarios:', error);
            document.getElementById('contenedor-comentarios').innerHTML = '<p>Error al cargar los comentarios. Por favor, inténtalo de nuevo más tarde.</p>';
          });
      }

      // Cargar comentarios al inicio
      cargarComentarios();
    });






    document.addEventListener('DOMContentLoaded', function() {
  const modal = document.getElementById('faq-modal');
  const modalQuestion = document.getElementById('modal-question');
  const modalAnswer = document.getElementById('modal-answer');
  const closeBtn = document.querySelector('.close');
  const deAcuerdoBtn = document.getElementById('de-acuerdo-btn');
  const faqQuestions = document.querySelectorAll('.faq-question');

  faqQuestions.forEach(question => {
    question.addEventListener('click', function() {
      const questionText = this.getAttribute('data-question');
      const answerText = this.getAttribute('data-answer');

      modalQuestion.textContent = questionText;
      modalAnswer.textContent = answerText;

      modal.style.display = 'block';
    });
  });

  closeBtn.addEventListener('click', () => {
    modal.style.display = 'none';
  });

  deAcuerdoBtn.addEventListener('click', () => {
    modal.style.display = 'none';
  });

  window.addEventListener('click', (event) => {
    if (event.target === modal) {
      modal.style.display = 'none';
    }
  });
});












document.addEventListener('DOMContentLoaded', function() {
  const searchInput = document.getElementById('search-input');
  const searchButton = document.getElementById('search-button');
  const contenedorComentarios = document.getElementById('contenedor-comentarios');

  // Función para cargar comentarios desde la base de datos
  function cargarComentarios() {
    fetch('obtener_comentarios.php')
      .then(response => {
        if (!response.ok) {
          throw new Error('Error en la respuesta de la red');
        }
        return response.json();
      })
      .then(data => {
        contenedorComentarios.innerHTML = '';

        if (data.error) {
          contenedorComentarios.innerHTML = `<p>Error: ${data.error}</p>`;
        } else if (data.mensaje) {
          contenedorComentarios.innerHTML = `<p>${data.mensaje}</p>`;
        } else {
          data.forEach((comentario) => {
            const comentarioDiv = document.createElement('div');
            comentarioDiv.className = 'foro-comment';
            comentarioDiv.innerHTML = `
              <i class="fas fa-user-circle fa-2x"></i>
              <div class="content">
                <strong>Comentario ID: ${comentario.id}</strong><br>
                <strong>Asunto:</strong> ${comentario.asunto}<br>
                ${comentario.descripcion}
              </div>
            `;
            contenedorComentarios.appendChild(comentarioDiv);
          });
        }
      })
      .catch(error => {
        console.error('Error al cargar comentarios:', error);
        contenedorComentarios.innerHTML = '<p>Error al cargar los comentarios. Por favor, inténtalo de nuevo más tarde.</p>';
      });
  }

  // Función para buscar comentarios
  function buscarComentarios() {
    const searchTerm = searchInput.value.trim();

    if (searchTerm === '') {
      cargarComentarios();
      return;
    }

    fetch(`buscar_comentarios.php?search=${encodeURIComponent(searchTerm)}`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Error en la respuesta de la red');
        }
        return response.json();
      })
      .then(data => {
        contenedorComentarios.innerHTML = '';

        if (data.error) {
          contenedorComentarios.innerHTML = `<p>Error: ${data.error}</p>`;
        } else if (data.mensaje) {
          contenedorComentarios.innerHTML = `<p>${data.mensaje}</p>`;
        } else {
          data.forEach((comentario) => {
            const comentarioDiv = document.createElement('div');
            comentarioDiv.className = 'foro-comment';
            comentarioDiv.innerHTML = `
              <i class="fas fa-user-circle fa-2x"></i>
              <div class="content">
                <strong>Comentario ID: ${comentario.id}</strong><br>
                <strong>Asunto:</strong> ${comentario.asunto}<br>
                ${comentario.descripcion}
              </div>
            `;
            contenedorComentarios.appendChild(comentarioDiv);
          });
        }
      })
      .catch(error => {
        console.error('Error al buscar comentarios:', error);
        contenedorComentarios.innerHTML = '<p>Error al buscar los comentarios. Por favor, inténtalo de nuevo más tarde.</p>';
      });
  }

  // Event listeners
  searchButton.addEventListener('click', buscarComentarios);

  searchInput.addEventListener('keyup', function(event) {
    if (event.key === 'Enter') {
      buscarComentarios();
    }
  });

  // Cargar comentarios al inicio
  cargarComentarios();
});
