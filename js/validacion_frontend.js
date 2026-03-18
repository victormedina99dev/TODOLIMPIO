// js/validacion_frontend.js

document.addEventListener('DOMContentLoaded', function() {
    const fechaInput = document.getElementById('fecha_de_servicio');
    const horaInput = document.getElementById('horaservicio');
    const form = document.querySelector('form');

    // 1. Establecer la fecha mínima a HOY
    const today = new Date();
    const todayString = today.toISOString().split('T')[0];
    fechaInput.setAttribute('min', todayString);

    // Función principal de validación
    function validarFormulario(event) {
        const fechaServicio = fechaInput.value;
        const horaServicio = horaInput.value;

        if (!fechaServicio || !horaServicio) {
            // El navegador ya maneja el 'required' pero es buena práctica
            return true; 
        }

        const servicioDateTime = new Date(`${fechaServicio}T${horaServicio}:00`);
        const ahora = new Date();

        // 2. Comprobar si la hora/fecha seleccionada ya pasó
        if (servicioDateTime <= ahora) {
            alert('¡Error! No puedes seleccionar una fecha u hora que ya ha pasado. Por favor, elige un momento futuro.');
            // Detiene el envío del formulario
            event.preventDefault(); 
            return false;
        }

        return true;
    }

    // Escuchar el intento de envío del formulario
    form.addEventListener('submit', validarFormulario);
});