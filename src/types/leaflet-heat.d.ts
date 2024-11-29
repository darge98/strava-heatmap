// src/leaflet-heat.d.ts
import * as L from 'leaflet';

declare module 'leaflet' {
  namespace leaflet {
    function heatLayer(latlngs: L.LatLngExpression[], options?: L.HeatLayerOptions): L.Layer;
  }

  export { leaflet };
}

declare module 'leaflet.heat';
