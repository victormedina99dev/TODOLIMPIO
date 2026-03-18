export class FormValidator {
  constructor(formId) {
    this.form = document.getElementById(formId);
    this.fechaInput = document.getElementById('fecha_de_servicio');
    this.horaInput = document.getElementById('horaservicio');
    this.init();
  }

  init() {
    this.setMinDate();
    if (this.form) {
      this.form.addEventListener('submit', (e) => this.validate(e));
    }
  }

  setMinDate() {
    if (!this.fechaInput) return;
    const today = new Date();
    const todayString = today.toISOString().split('T')[0];
    this.fechaInput.setAttribute('min', todayString);
  }

  validate(event) {
    if (!this.fechaInput || !this.horaInput) return true;

    const fechaServicio = this.fechaInput.value;
    const horaServicio = this.horaInput.value;

    if (!fechaServicio || !horaServicio) return true;

    const servicioDateTime = new Date(`${fechaServicio}T${horaServicio}:00`);
    const ahora = new Date();

    if (servicioDateTime <= ahora) {
      alert('¡Error! No puedes seleccionar una fecha u hora que ya ha pasado. Por favor, elige un momento futuro.');
      event.preventDefault();
      return false;
    }

    return true;
  }
}
