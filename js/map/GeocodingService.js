export class GeocodingService {
  constructor() {
    this.baseUrl = "https://nominatim.openstreetmap.org/reverse";
    this.requestTimeout = 10000;
    this.lastRequestTime = 0;
    this.minRequestInterval = 1000;
    this.allowedBounds = {
      lat: { min: -90, max: 90 },
      lng: { min: -180, max: 180 }
    };
  }

  validateCoordinates(lat, lng) {
    if (typeof lat !== 'number' || typeof lng !== 'number') {
      return false;
    }
    if (isNaN(lat) || isNaN(lng) || !isFinite(lat) || !isFinite(lng)) {
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

  sanitizeInput(value) {
    const num = parseFloat(value);
    if (isNaN(num)) return null;
    return Math.max(-180, Math.min(180, num));
  }

  async rateLimitCheck() {
    const now = Date.now();
    const timeSinceLastRequest = now - this.lastRequestTime;
    
    if (timeSinceLastRequest < this.minRequestInterval) {
      const waitTime = this.minRequestInterval - timeSinceLastRequest;
      await new Promise(resolve => setTimeout(resolve, waitTime));
    }
    
    this.lastRequestTime = Date.now();
  }

  async getAddressFromCoords(lat, lng) {
    const sanitizedLat = this.sanitizeInput(lat);
    const sanitizedLng = this.sanitizeInput(lng);

    if (!this.validateCoordinates(sanitizedLat, sanitizedLng)) {
      console.warn('Coordenadas inválidas bloqueadas');
      return `Coordenadas inválidas`;
    }

    await this.rateLimitCheck();

    const url = `${this.baseUrl}?format=json&lat=${sanitizedLat}&lon=${sanitizedLng}&zoom=18&addressdetails=1`;

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), this.requestTimeout);

    try {
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'User-Agent': 'TodoLimpioApp/1.0 (victormedina@example.com)',
          'Accept': 'application/json'
        },
        signal: controller.signal
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        throw new Error(`Error HTTP: ${response.status}`);
      }

      const data = await response.json();
      
      if (data && data.display_name) {
        const truncatedAddress = this.truncateAddress(data.display_name);
        return truncatedAddress;
      }

      return `Dirección no encontrada. Coordenadas: ${sanitizedLat.toFixed(5)}, ${sanitizedLng.toFixed(5)}`;
      
    } catch (error) {
      if (error.name === 'AbortError') {
        return 'Tiempo de espera agotado';
      }
      console.error('Error de geocodificación:', error.message);
      return `Error de servicio`;
    }
  }

  truncateAddress(address) {
    const maxLength = 200;
    if (address.length <= maxLength) return address;
    return address.substring(0, maxLength) + '...';
  }
}
