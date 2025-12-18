import { auth, db } from './firebase-config.js';
import { doc, setDoc } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

document.getElementById('btn-confirmar').addEventListener('click', async () => {
    const user = auth.currentUser;
    const dir = document.getElementById('ubicacion_servicio_input').value;

    if (user && dir) {
        await setDoc(doc(db, "usuarios", user.uid), {
            nombre: user.displayName,
            email: user.email,
            direccion: dir
        }, { merge: true });
        
        window.location.href = "todolimpio_solicitud_de_servicio.html";
    } else {
        alert("Por favor selecciona tu ubicación en el mapa.");
    }
});