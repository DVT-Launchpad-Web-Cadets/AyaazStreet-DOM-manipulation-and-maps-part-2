import "./style.scss";
import { getLap } from "./api-calls";

const filename = "SN2780_210722_11H00_NADINE_IDUBE_RACEWAY_16_5554.json";

export default function getMapData() {
  getLap(filename, 1, showMapData);
};

export function drawLap(lapNumber) {
  getLap(filename, lapNumber, draw);
};

const showMapData = (data) => {
  const jsonLatitude = "Lat\u{002E}";
  const jsonLongitude = "Lon\u{002E}";

  const latitude = data.dataSet[0][jsonLatitude] * Math.pow(10, -6);
  const longitude = data.dataSet[0][jsonLongitude] * Math.pow(10, -6);
  let map = L.map("map").setView([latitude, longitude], 17);

  L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
    minZoom: 16,
    maxZoom: 19,
  }).addTo(map);
};

const draw = (data) => {
  // let latlngs = [];
  // for (let i = 0; i < data.dataSet.length; i++) {
  //   const jsonLatitude = "Lat\u{002E}";
  //   const jsonLongitude = "Lon\u{002E}";

  //   const latitude = data.dataSet[i][jsonLatitude] * Math.pow(10, -6);
  //   const longitude = data.dataSet[i][jsonLongitude] * Math.pow(10, -6);
  //   latlngs.push([latitude, longitude]);
  // }
  // let polyline = L.polyline(latlngs, { color: "red" }).addTo(map);
  // map.fitBounds(polyline.getBounds());
}
