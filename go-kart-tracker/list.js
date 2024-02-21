import "./style.scss";
import { getAllLaps } from "./api-calls";
import { drawLap } from "./map";

const filename = "SN2780_210722_11H00_NADINE_IDUBE_RACEWAY_16_5554.json";

export default function getListData() {
  getAllLaps(filename, showListData);
}

const showListData = (data) => {
  console.log(data);
  for (let i = 0; i < data.lapSummaries.length; i++) {
    let lap = document.createElement("div");
    lap.classList.add("lap");
    lap.id = `${i}`;
    lap.addEventListener("click", () => {
      drawLap(i + 1);
    });
    document.querySelector("#list").appendChild(lap);
    let prependNumber = i + 1 <= 9 ? "0" : "";
    let lapTime = (data.lapSummaries[i]["time lap"] * Math.pow(10, -3)).toFixed(
      2
    );
    let lapNumber = `${prependNumber}${i + 1}`;
    let lapDriver = data.driver;
    document.getElementById(`${i}`).innerHTML = `
        <div class="lap-number">${lapNumber}</div>
        <div class="lap-driver">${lapDriver}</div>
        <div class="lap-time">${lapTime} s</div>
    `;
  }
};
