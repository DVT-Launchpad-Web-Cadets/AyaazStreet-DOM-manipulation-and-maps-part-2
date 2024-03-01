import getAllRaces, { getLap, getLapSummary } from './api-calls.ts';
import showListData from './list.ts';
import showMapData from './map.ts';
import showRaceDetails from './race-details.ts';
import './style.scss';

let filename: string;

const getFilename = (data: string[]) => {
  filename = data[0];
};

function getRaceDetails() {
  try {
    getLapSummary(filename, showRaceDetails, errorCallBack);
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
    getLapSummary(filename, showListData, errorCallBack);
  } catch (error) {
    console.error(error);
  }
}

const errorCallBack = (error: Error) => console.error(error);

getAllRaces(getFilename, errorCallBack);
getRaceDetails();
getMapData();
getListData();
