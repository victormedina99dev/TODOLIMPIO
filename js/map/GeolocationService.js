export class GeolocationService {
  constructor() {
    this.defaultCoords = [10.0667, -69.3583];
    this.defaultZoom = 13;
    this.allowedBounds = {
      lat: { min: -90, max: 90 },
      lng: { min: -180, max: 180 }
    };
  }

  getDefaultLocation() {
    return { coords: this.defaultCoords, zoom: this.defaultZoom };
  }

  isSupported() {
    return !!navigator.geolocation;
  }

  validateCoordinates(lat, lng) {
    if (typeof lat !== 'number' || typeof lng !== 'number') {
      return false;
    }
    if (isNaN(lat) || isNaN(lng)) {
      return false;
    }
    if (lat < this.allowedBounds.lat.min || lat > this.allowedBounds.lat.max) {
      return false;
    }
    if (lng < this.allowedBounds.lng.min || lng > this.allowedBounds.lng.max) {
      return false;
    }
    return true;
  }

  sanitizePosition(position) {
    const lat = position.coords.latitude;
    const lng = position.coords.longitude;

    if (!this.validateCoordinates(lat, lng)) {
      console.warn('Coordenadas inválidas detectadas, usando默认值');
      return { coords: this.defaultCoords, zoom: 15 };
    }

    return {
      coords: [
        parseFloat(lat.toFixed(6)),
        parseFloat(lng.toFixed(6))
      ],
      zoom: 15
    };
  }

  getCurrentPosition() {
    return new Promise((resolve, reject) => {
      if (!this.isSupported()) {
        reject(new Error("Tu navegador no soporta Geolocation"));
        return;
      }

      if (!window.isSecureContext) {
        reject(new Error("Geolocalización requiere HTTPS"));
        return;
      }

      navigator.geolocation.getCurrentPosition(
        (position) => {
          try {
            const sanitized = this.sanitizePosition(position);
            resolve(sanitized);
          } catch (e) {
            reject(new Error("Error al procesar ubicación"));
          }
        },
        (error) => {
          const errorMessages = {
            1: 'Permiso de ubicación denegado',
            2: 'Ubicación no disponible',
            3: 'Tiempo de espera agotado'
          };
          const message = errorMessages[error.code] || 'Error desconocido';
          reject(new Error(message));
        },
        {
          enableHighAccuracy: true,
          timeout: 5000,
          maximumAge: 0
        }
      );
    });
  }
}
