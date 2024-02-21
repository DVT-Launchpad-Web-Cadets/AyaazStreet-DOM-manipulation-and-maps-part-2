import "./style.scss";
import { getLap } from "./api-calls";

const filename = "SN2780_210722_11H00_NADINE_IDUBE_RACEWAY_16_5554.json";
let map = L.map("map");
let points = L.layerGroup();
let polylines = L.layerGroup();
let latLngs = [];
let drawing = false;

export default function getMapData() {
  getLap(filename, 1, showMapData);
}

export function drawLap(lapNumber) {
  drawing = true;
  for (let index = 0; index < latLngs.length; index++) {
    polylines.removeFrom(map);
    points.removeFrom(map);
  }
  points.clearLayers();
  polylines.clearLayers();
  latLngs = [];
  getLap(filename, lapNumber, draw);
}

const showMapData = (data) => {
  const jsonLatitude = "Lat\u{002E}";
  const jsonLongitude = "Lon\u{002E}";

  const latitude = data.dataSet[0][jsonLatitude] * Math.pow(10, -6);
  const longitude = data.dataSet[0][jsonLongitude] * Math.pow(10, -6);
  map.setView([latitude, longitude], 17);

  L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
    minZoom: 16,
    maxZoom: 19,
  }).addTo(map);
};

function drawPoint(latitude, longitude) {
  let point = L.circle([latitude, longitude], {
    color: "rgb(211, 82, 100)",
    fillColor: "rgb(211, 82, 100)",
    fillOpacity: 1,
    radius: 3,
  });
  points.addLayer(point);
  points.addTo(map);
}

function drawPolyline() {
  let polyline = L.polyline(latLngs, {
    stroke: true,
    color: "rgb(93, 112, 228)",
    weight: 5,
    opacity: 0.75,
    smoothFactor: 1,
    lineJoin: "round",
    lineCap: "round",
  });
  polylines.addLayer(polyline);
  polylines.addTo(map);
}

const draw = (data) => {
  drawing = false;
  let index = 0;
  let myTimeout = setInterval(() => {
    if (drawing)
      clearInterval(myTimeout);
    let speed = data.dataSet[index]["Speed GPS"];
    const jsonLatitude = "Lat\u{002E}";
    const jsonLongitude = "Lon\u{002E}";
    let latitude = data.dataSet[index][jsonLatitude] * Math.pow(10, -6);
    let longitude = data.dataSet[index][jsonLongitude] * Math.pow(10, -6);

    points.clearLayers();
    polylines.clearLayers();
    latLngs.push([latitude, longitude]);
    drawPolyline();
    drawPoint(latitude, longitude);

    index < data.dataSet.length - 1 ? index++ : clearInterval(myTimeout);
  }, data.dataSet[index]["Speed GPS"] / 20);
};
