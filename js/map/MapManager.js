import { GeocodingService } from './GeocodingService.js';
import { GeolocationService } from './GeolocationService.js';

export class MapManager {
  constructor(mapId, options = {}) {
    this.mapId = mapId;
    this.map = null;
    this.marker = null;
    this.geocodingService = new GeocodingService();
    this.geolocationService = new GeolocationService();
    
    this.ubicacionInput = document.getElementById('ubicacion_servicio_input');
    this.ubicacionSpan = document.getElementById('ubicacion-actual');
    
    this.defaultCoords = options.defaultCoords || [10.0667, -69.3583];
    this.defaultZoom = options.defaultZoom || 13;
    
    this.maxZoom = 18;
    this.minZoom = 5;
  }

  validateZoom(zoom) {
    if (typeof zoom !== 'number' || isNaN(zoom)) return this.defaultZoom;
    return Math.max(this.minZoom, Math.min(this.maxZoom, zoom));
  }

  validateCoords(coords) {
    if (!Array.isArray(coords) || coords.length !== 2) return false;
    return this.geolocationService.validateCoordinates(coords[0], coords[1]);
  }

  async init() {
    try {
      this.initializeMap(this.defaultCoords, this.defaultZoom);
      await this.updateLocation(this.defaultCoords[0], this.defaultCoords[1]);
      await this.requestUserLocation();
    } catch (error) {
      console.error('Error al inicializar el mapa:', error.message);
      this.showError('Error al cargar el mapa');
    }
  }

  initializeMap(center, zoom) {
    if (!this.geolocationService.validateCoordinates(center[0], center[1])) {
      center = this.defaultCoords;
    }

    this.map = L.map(this.mapId).setView(center, this.validateZoom(zoom));

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      maxZoom: this.maxZoom,
      minZoom: this.minZoom
    }).addTo(this.map);

    this.marker = L.marker(center, { 
      draggable: true,
      autoPan: true
    }).addTo(this.map);

    this.marker.on('dragend', (event) => {
      const coords = event.target.getLatLng();
      this.updateLocation(coords.lat, coords.lng);
    });

    this.map.on('click', (event) => {
      const coords = event.latlng;
      this.marker.setLatLng(coords);
      this.updateLocation(coords.lat, coords.lng);
    });
  }

  async updateLocation(lat, lng) {
    this.showLoading();

    try {
      const address = await this.geocodingService.getAddressFromCoords(lat, lng);
      this.setAddress(address);
    } catch (error) {
      console.error('Error al actualizar ubicación:', error);
      this.showError('No se pudo obtener la dirección');
    }
  }

  setAddress(address) {
    if (this.ubicacionInput) {
      this.ubicacionInput.value = address;
    }
    if (this.ubicacionSpan) {
      this.ubicacionSpan.innerText = `Dirección del Servicio: ${address}`;
      this.ubicacionSpan.style.color = 'darkgreen';
    }
  }

  showLoading() {
    if (this.ubicacionSpan) {
      this.ubicacionSpan.innerText = 'Obteniendo dirección...';
      this.ubicacionSpan.style.color = 'darkorange';
    }
  }

  showError(message) {
    if (this.ubicacionSpan) {
      this.ubicacionSpan.innerText = message;
      this.ubicacionSpan.style.color = 'red';
    }
  }

  async requestUserLocation() {
    this.ubicacionSpan.innerText = 'Buscando ubicación actual...';
    
    if (!this.geolocationService.isSupported()) {
      this.showError('Tu navegador no soporta Geolocation. Selecciona en el mapa.');
      return;
    }

    try {
      const { coords, zoom } = await this.geolocationService.getCurrentPosition();
      
      if (this.validateCoords(coords)) {
        this.map.setView(coords, this.validateZoom(zoom));
        this.marker.setLatLng(coords);
        await this.updateLocation(coords[0], coords[1]);
      } else {
        this.showError('Coordenadas inválidas recibidas');
      }
    } catch (error) {
      console.warn('Error al obtener la ubicación:', error.message);
      this.showError('No se pudo obtener la ubicación GPS. Selecciona en el mapa.');
    }
  }
}
