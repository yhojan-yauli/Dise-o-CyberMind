document.querySelector('form').addEventListener('submit', function(event) {
    const password = document.getElementById('new-password').value;
    const confirmPassword = document.getElementById('confirm-password').value;

    if (password !== confirmPassword) {
        alert('Las contraseñas no coinciden.');
        event.preventDefault(); // Evita que el formulario se envíe
    }
});
