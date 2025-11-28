let map;
let marker;
const ubicacionInput = document.getElementById('ubicacion_servicio_input');
const ubicacionSpan = document.getElementById('ubicacion-actual');

// Coordenadas predeterminadas (Barquisimeto, Venezuela)
const defaultCoords = [10.0667, -69.3583]; 
const defaultZoom = 13; 

/**
 * Función asíncrona para convertir coordenadas a dirección legible.
 /** */
async function getAddressFromCoords(lat, lng) {
    // URL del servicio de Nominatim para Geocodificación Inversa
    const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&zoom=18&addressdetails=1`;
    
    try {
        const response = await fetch(url);
        const data = await response.json();

        // Extrae la dirección formateada (display_name)
        if (data && data.display_name) {
            return data.display_name;
        }
        return `Dirección no encontrada. Coordenadas: ${lat.toFixed(5)}, ${lng.toFixed(5)}`;
    } catch (error) {
        console.error("Error al obtener la dirección:", error);
        return `Error de servicio. Coordenadas: ${lat.toFixed(5)}, ${lng.toFixed(5)}`;
    }
}

/**
 * Inicializa el mapa Leaflet en el contenedor con ID 'map'.
 */
function initializeLeafletMap(center, zoom) {
    map = L.map('map').setView(center, zoom);

    // Añade la capa de mosaicos (tiles) de OpenStreetMap
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    // Crea el marcador, lo hace arrastrable
    marker = L.marker(center, { draggable: true }).addTo(map);

    // Evento para actualizar la ubicación cuando el marcador es arrastrado
    marker.on('dragend', function(event) {
        const coords = event.target.getLatLng();
        // Llama a la nueva función de actualización
        updateLocation(coords.lat, coords.lng);
    });

    // Evento para actualizar la ubicación cuando se hace clic en el mapa
    map.on('click', function(event) {
        const coords = event.latlng;
        marker.setLatLng(coords); // Mueve el marcador
        // Llama a la nueva función de actualización
        updateLocation(coords.lat, coords.lng);
    });
}

/**
 * Actualiza el campo oculto con la dirección y el texto visual con la dirección.
 */
async function updateLocation(lat, lng) {
    ubicacionSpan.innerText = 'Obteniendo dirección...';
    ubicacionSpan.style.color = 'darkorange';

    // 1. Obtiene la dirección legible
    const address = await getAddressFromCoords(lat, lng);

    // 2. Guarda la dirección en el campo oculto para el formulario
    ubicacionInput.value = address; 

    // 3. Muestra la dirección al usuario
    ubicacionSpan.innerText = `Dirección del Servicio: ${address}`;
    ubicacionSpan.style.color = 'darkgreen';
}


/**
 * Lógica principal: 
 * 1. Inicializa el mapa SIEMPRE en la ubicación por defecto.
 * 2. Intenta obtener la ubicación GPS del usuario. Si lo logra, mueve el mapa.
 */
function initMapLogic() {
    // 1. Inicializa el mapa inmediatamente en Barquisimeto
    initializeLeafletMap(defaultCoords, defaultZoom);
    updateLocation(defaultCoords[0], defaultCoords[1]); // Muestra la dirección inicial

    ubicacionSpan.innerText = 'Buscando ubicación actual...';
    
    if (navigator.geolocation) {
        // 2. Pide permiso al usuario para obtener la ubicación
        navigator.geolocation.getCurrentPosition(
            (position) => {
                // Éxito: mueve el mapa y marcador a la ubicación del usuario
                const userLocation = [position.coords.latitude, position.coords.longitude];
                
                map.setView(userLocation, 15); // Centra y hace más zoom
                marker.setLatLng(userLocation); // Mueve el marcador
                
                updateLocation(userLocation[0], userLocation[1]);
            },
            (error) => {
                // Error o denegación de GPS
                console.warn('Error al obtener la ubicación:', error.code);
                ubicacionSpan.innerText = 'No se pudo obtener la ubicación GPS. Selecciona en el mapa.';
                ubicacionSpan.style.color = 'red';
            },
            {
                enableHighAccuracy: true, // Solicita la mejor precisión posible
                timeout: 5000,            // Espera solo 5 segundos
                maximumAge: 0             // No acepta ubicaciones en caché antiguas
            }
        );
    } else {
        // Navegador no soporta Geolocation
        ubicacionSpan.innerText = 'Tu navegador no soporta Geolocation. Selecciona en el mapa.';
        ubicacionSpan.style.color = 'red';
    }
}

// Inicia la lógica del mapa una vez que el HTML está completamente cargado
document.addEventListener('DOMContentLoaded', initMapLogic);