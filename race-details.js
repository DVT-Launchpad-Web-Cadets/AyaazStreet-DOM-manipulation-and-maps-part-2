import { getAllLaps } from "./api-calls.js";

const filename = "SN2780_210722_11H00_NADINE_IDUBE_RACEWAY_16_5554.json";

export default function getRaceDetails() {
  getAllLaps(filename, showRaceDetails);
}

const showRaceDetails = (data) => {
    document.querySelector(
      "#race-details"
    ).innerHTML = `${data.trackName}: ${data.driver}'s ${data.sessionName} on ${data.date} ${data.time}`;
}
