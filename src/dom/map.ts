import L from 'leaflet';
import { mapSubject$, signalMapRequest$ } from '../api-calls.ts';
import type { ILap } from '../models/laps.d.ts';

let map = L.map('map', { zoomControl: false });
const point = L.circle([0, 0], {
  color: 'rgb(157, 40, 33)',
  fillColor: 'rgb(157, 40, 33)',
  fillOpacity: 1,
  radius: 3
});
const polylines = L.layerGroup();
let latLngs: [number, number][] = [];
let drawing = false;
let myTimeout: number | undefined;

function resetMap() {
  map.remove();
  point.setLatLng([0, 0]);
  polylines.clearLayers();
  latLngs = [];
  drawing = false;
  clearInterval(myTimeout);
}

export default function showMapData(data: ILap) {
  resetMap();
  map = L.map('map', { zoomControl: false });
  map.setView([data.lapData[0].latitude, data.lapData[0].longitude], 17);
  L.tileLayer('https://tile.thunderforest.com/transport-dark/{z}/{x}/{y}.png?apikey={apikey}', {
    minZoom: 16,
    maxZoom: 19,
    apikey: '1450a75cc99040bfba3cc75c764e64c7'
  } as L.TileLayerOptions).addTo(map);
}

function clearMapLayers() {
  point.removeFrom(map);
  for (let index = 0; index < latLngs.length; index++) {
    polylines.removeFrom(map);
  }
  polylines.clearLayers();
  latLngs = [];
}

const draw = (data: ILap) => {
  drawing = false;
  let index = 0;
  clearMapLayers();
  point.addTo(map);
  myTimeout = setInterval(() => {
    if (drawing) clearInterval(myTimeout);
    polylines.clearLayers();
    latLngs.push([data.lapData[index].latitude, data.lapData[index].longitude]);
    drawPolyline();
    point.setLatLng([data.lapData[index].latitude, data.lapData[index].longitude]);
    const lap = document.querySelector('.active');
    if (!lap) throw new Error(`Lap not found`);
    lap.setAttribute('speed', `${data.lapData[index].speed / 10}`);
    index < data.lapData.length - 1 ? index++ : clearInterval(myTimeout);
  }, 100);
};

export function drawLap(lapNumber: number, filename: string) {
  clearInterval(myTimeout);
  drawing = true;
  try {
    signalMapRequest$.next({ filename, lapNumber });
    mapSubject$.subscribe((res: ILap) => {
      try {
        draw(res);
      } catch (error) {
        console.error(error);
        return;
      }
    });
  } catch (error) {
    console.error(error);
  }
}

function drawPolyline() {
  const polyline = L.polyline(
    latLngs.map(([latitude, longitude]) => L.latLng(latitude, longitude)),
    {
      stroke: true,
      color: 'rgb(157, 40, 33)',
      weight: 5,
      opacity: 0.75,
      smoothFactor: 1,
      lineJoin: 'round',
      lineCap: 'round'
    }
  );
  polylines.addLayer(polyline);
  polylines.addTo(map);
}
