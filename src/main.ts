import {
  lapsSubject$,
  mapLapsSubject$,
  mapSubject$,
  racesSubject$,
  signalLapsRequest$,
  signalMapLapsRequest$,
  signalMapRequest$,
  signalRacesRequest$
} from './api-calls.ts';
import showListData from './dom/list.ts';
import mainPage from './dom/main-page.ts';
import showMapData from './dom/map.ts';
import racePage from './dom/race-page.ts';
import type { IAllLaps, ILap } from './models/laps.d.ts';
import type { IAllRaces } from './models/races.d.ts';

export function getAllRaces() {
  signalRacesRequest$.next(null);
  racesSubject$.subscribe((res: IAllRaces) => {
    try {
      mainPage(res);
    } catch (error) {
      console.error(error);
      return;
    }
  });
}

export default function getRaceLaps(filename: string) {
  signalLapsRequest$.next(filename);
  lapsSubject$.subscribe((res: IAllLaps) => {
    try {
      racePage(res);
    } catch (error) {
      console.error(error);
      return;
    }
  });
}

export function getMapData(filename: string, lapNumber: number) {
  signalMapRequest$.next({ filename, lapNumber });
  mapSubject$.subscribe((res: ILap) => {
    try {
      showMapData(res);
    } catch (error) {
      console.error(error);
      return;
    }
  });
}

export function getListData(filename: string) {
  signalMapLapsRequest$.next(filename);
  mapLapsSubject$.subscribe((res: IAllLaps) => {
    try {
      showListData(res, res.filename);
    } catch (error) {
      console.error(error);
      return;
    }
  });
}

getAllRaces();
