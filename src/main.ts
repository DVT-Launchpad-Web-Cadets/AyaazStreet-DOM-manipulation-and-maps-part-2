import { getAllLaps, getLap } from './api-calls.ts';
import showListData from './list.ts';
import showMapData from './map.ts';
import showRaceDetails from './race-details.ts';
import './style.scss';

const filename = 'SN2780_210722_11H00_NADINE_IDUBE_RACEWAY_16_5554.json';

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
