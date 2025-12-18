import { auth, db } from './firebase-config.js';
import { doc, setDoc } from "https://www.gstatic.com/firebasejs/10.x/firebase-firestore.js";
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.x/firebase-auth.js";

const btnConfirmar = document.getElementById('btn-confirmar-direccion');

// Asegurarnos de que el usuario esté logueado
onAuthStateChanged(auth, (user) => {
    if (!user) {
        window.location.href = "index.html"; // Si no hay sesión, regresa al inicio
    }
});

btnConfirmar.addEventListener('click', async () => {
    const user = auth.currentUser;
    // Tomamos la dirección que tu mapa_servicio.js puso en el input
    const direccionCapturada = document.getElementById('ubicacion_servicio_input').value;

    if (user && direccionCapturada) {
        try {
            // Guardamos en la colección "usuarios" con el ID del usuario (UID)
            await setDoc(doc(db, "usuarios", user.uid), {
                uid: user.uid,
                nombre: user.displayName,
                email: user.email,
                direccion: direccionCapturada,
                actualizadoEl: new Date()
            }, { merge: true });

            alert("¡Ubicación guardada correctamente!");
            // Ahora lo enviamos al formulario de solicitud de servicio
            window.location.href = "todolimpio_solicitud_de_servicio.html";
        } catch (error) {
            console.error("Error al guardar:", error);
            alert("No pudimos guardar la dirección. Intenta de nuevo.");
        }
    } else {
        alert("Por favor, marca un punto en el mapa antes de continuar.");
    }
});