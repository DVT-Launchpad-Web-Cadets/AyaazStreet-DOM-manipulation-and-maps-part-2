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
        for (let j = 0; j < data.lapSummaries.length; j++) 
            document.getElementById(`${j}`).classList.remove("active");
        lap.classList.add("active");
        drawLap(i + 1);
    });
    document.querySelector("#list").appendChild(lap);
    let prependNumber = i + 1 <= 9 ? "0" : "";
    let lapTime = (data.lapSummaries[i]["time lap"] * Math.pow(10, -3)).toFixed(
      2
    );
    let lapNumber = `${prependNumber}${i + 1}`;
    let lapSpeed = data.lapSummaries[i]["Max Speed GPS"];
    document.getElementById(`${i}`).innerHTML = `
        <div class="lap-number">${lapNumber}</div>
        <div class="lap-speed">${lapSpeed / 10} km/h</div>
        <div class="lap-time">${lapTime} s</div>
    `;
  }
};
