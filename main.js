import "./style.scss";
import showMapData from "./map";
import showListData from "./list";
import showRaceDetails from "./race-details";
import { getAllLaps } from "./api-calls.js";
import { getLap } from "./api-calls";

const filename = "SN2780_210722_11H00_NADINE_IDUBE_RACEWAY_16_5554.json";

function getRaceDetails() {
    getAllLaps(filename, showRaceDetails);
}

function getMapData() {
	getLap(filename, 1, showMapData);
}

function getListData() {
	getAllLaps(filename, showListData);
}

getRaceDetails();
getMapData();
getListData();
