import L from 'leaflet';
import { getLap } from './api-calls.ts';
import type { IKartLap } from './models/go-kart.d.ts';

const filename = 'SN2780_210722_11H00_NADINE_IDUBE_RACEWAY_16_5554.json';

const map = L.map('map', { zoomControl: false });
const point = L.circle([0, 0], {
  color: 'rgb(211, 82, 100)',
  fillColor: 'rgb(211, 82, 100)',
  fillOpacity: 1,
  radius: 3,
});
const polylines = L.layerGroup();
let latLngs: Array<Array<number>> = [];
let drawing = false;
let myTimeout: number | undefined;

function clearMapLayers() {
  point.removeFrom(map);
  for (let index = 0; index < latLngs.length; index++) {
    polylines.removeFrom(map);
  }
  polylines.clearLayers();
  latLngs = [];
}

export function drawLap(lapNumber: number) {
  clearInterval(myTimeout);
  drawing = true;
  try {
    getLap(filename, lapNumber, draw, (error: Error) => console.error(error));
  } catch (error) {
    console.error(error);
  }
}

export default function showMapData(data: IKartLap) {
  const latitude = data.dataSet[0]['Lat.'] * Math.pow(10, -6);
  const longitude = data.dataSet[0]['Lon.'] * Math.pow(10, -6);
  map.setView([latitude, longitude], 18);

  // L.tileLayer(
  // 	"https://tile.thunderforest.com/transport-dark/{z}/{x}/{y}.png?apikey={apikey}",
  // 	{
  // 		minZoom: 16,
  // 		maxZoom: 19,
  // 		apikey: "1450a75cc99040bfba3cc75c764e64c7",
  // 	}
  // ).addTo(map);

  L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    minZoom: 16,
    maxZoom: 19,
  }).addTo(map);
}

function drawPolyline() {
  const polyline = L.polyline(latLngs.map(([latitude, longitude]) => L.latLng(latitude, longitude)), {
    stroke: true,
    color: 'rgb(93, 112, 228)',
    weight: 5,
    opacity: 0.75,
    smoothFactor: 1,
    lineJoin: 'round',
    lineCap: 'round',
  });
  polylines.addLayer(polyline);
  polylines.addTo(map);
}

const draw = (data: IKartLap) => {
  drawing = false;
  let index = 0;
  clearMapLayers();
  point.addTo(map);
  myTimeout = setInterval(() => {
    if (drawing) clearInterval(myTimeout);
    const latitude = data.dataSet[index]['Lat.'] * Math.pow(10, -6);
    const longitude = data.dataSet[index]['Lon.'] * Math.pow(10, -6);
    polylines.clearLayers();
    latLngs.push([latitude, longitude]);
    drawPolyline();
    point.setLatLng([latitude, longitude]);
    index < data.dataSet.length - 1 ? index++ : clearInterval(myTimeout);
  }, 100);
};
