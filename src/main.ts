import { getAllLaps, getLap } from './api-calls.ts';
import showListData from './list.ts';
import showMapData from './map.ts';
import showRaceDetails from './race-details.ts';
import './style.scss';

const filename = 'SN2780_210722_11H00_NADINE_IDUBE_RACEWAY_16_5554.json';

function getRaceDetails() {
  try {
    getAllLaps(filename, showRaceDetails, errorCallBack);
  } catch (error) {
    console.error(error);
  }
}

function getMapData() {
  try {
    getLap(filename, 1, showMapData, errorCallBack);
  } catch (error) {
    console.error(error);
  }
}

function getListData() {
  try {
    getAllLaps(filename, showListData, errorCallBack);
  } catch (error) {
    console.error(error);
  }
}

const errorCallBack = (error: Error) => console.error(error);

getRaceDetails();
getMapData();
getListData();
