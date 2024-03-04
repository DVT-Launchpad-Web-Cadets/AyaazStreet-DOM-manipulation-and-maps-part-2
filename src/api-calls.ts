import { parse } from 'date-fns';
import { EMPTY, ReplaySubject, Subject, catchError, map, mergeMap, retry, switchMap } from 'rxjs';
import { fromFetch } from 'rxjs/fetch';
// eslint-disable-next-line import/no-unresolved
import { fromPromise } from 'rxjs/internal/observable/innerFrom';
import type { IKartLap, IKartRace } from './models/go-kart.d.ts';

export const signalRacesRequest$ = new Subject<null>();

export const racesSubject$ = signalRacesRequest$.pipe(
  switchMap(() =>
    fromFetch('https://go-kart-api.onrender.com/runs').pipe(
      switchMap((res) => fromPromise<string[]>(res.json())),
      switchMap((json) =>
        fromFetch(`https://go-kart-api.onrender.com/runs/${json}`).pipe(
          switchMap((res) => fromPromise<IKartRace>(res.json())),
          map((json: IKartRace) => ({
            filename: `${json.filename}`,
            title: `${convertToTitleCase(json.trackName)}`,
            summary: `${json.lapSummaries?.length} Laps ${convertToTitleCase(json.sessionName)} • ${convertToTitleCase(json.driver)} (${json.vehicleClass})`,
            dateTime: parse(json.date + ' ' + json.time, 'dd-MM-yyyy HH:mm', new Date())
          })),
          catchError((err) => {
            console.error('JSON Parse Fail', err);
            return EMPTY;
          })
        )
      ),
      retry(2),
      catchError((err) => {
        console.error('API Call Fail', err);
        return EMPTY;
      })
    )
  )
);

export const signalLapsRequest$ = new ReplaySubject<string>();

export const lapsSubject$ = signalLapsRequest$.pipe(
  mergeMap((filename) =>
    fromFetch(`https://go-kart-api.onrender.com/runs/${filename}`).pipe(
      switchMap((res) => fromPromise<IKartRace>(res.json())),
      map((json) => {
        return {
          filename: `${json.filename}`,
          title: `${convertToTitleCase(json.trackName)}`,
          summary: `${json.lapSummaries?.length} Laps ${convertToTitleCase(json.sessionName)} • ${convertToTitleCase(json.driver)} (${json.vehicleClass})`,
          lapRecord:
            (json.lapSummaries?.reduce((acc, val) => (acc < val['time lap'] ? acc : val['time lap']), Infinity) ?? 0) *
            Math.pow(10, -3),
          maxSpeed:
            (json.lapSummaries?.reduce((acc, val) => (acc > val['Max Speed GPS'] ? acc : val['Max Speed GPS']), 0) ?? 0) / 10,
          numberOfLaps: json.lapSummaries?.length,
          lapSummaries: json.lapSummaries?.map((lap) => ({
            lapNumber: lap.lap,
            maxSpeed: lap['Max Speed GPS'] / 10,
            minSpeed: lap['Min Speed GPS'] / 10,
            lapTime: lap['time lap'] * Math.pow(10, -3)
          }))
        };
      }),
      catchError((error) => {
        console.error('JSON Parse Fail', error);
        return EMPTY;
      }),
      retry(2),
      catchError((err) => {
        console.error('API Call Fail', err);
        return EMPTY;
      })
    )
  )
);

export const signalMapRequest$ = new ReplaySubject<{ filename: string; lapNumber: number }>();

export const mapSubject$ = signalMapRequest$.pipe(
  mergeMap(({ filename, lapNumber }) =>
    fromFetch(`https://go-kart-api.onrender.com/runs/${filename}/laps/${lapNumber}`).pipe(
      switchMap((res) => fromPromise<IKartLap>(res.json())),
      map((json: IKartLap) => {
        return {
          filename: `${filename}`,
          lapData: json.dataSet.map((data) => ({
            latitude: data['Lat.'] * Math.pow(10, -6),
            longitude: data['Lon.'] * Math.pow(10, -6),
            speed: data['Speed GPS']
          }))
        };
      }),
      catchError((error) => {
        console.error('JSON Parse Fail', error);
        return EMPTY;
      }),
      retry(2),
      catchError((err) => {
        console.error('API Call Fail', err);
        return EMPTY;
      })
    )
  )
);

export const signalMapLapsRequest$ = new ReplaySubject<string>();

export const mapLapsSubject$ = signalMapLapsRequest$.pipe(
  mergeMap((filename) =>
    fromFetch(`https://go-kart-api.onrender.com/runs/${filename}`).pipe(
      switchMap((res) => fromPromise<IKartRace>(res.json())),
      map((json) => {
        return {
          filename: `${json.filename}`,
          title: `${convertToTitleCase(json.trackName)}`,
          summary: `${json.lapSummaries?.length} Laps ${convertToTitleCase(json.sessionName)} • ${convertToTitleCase(json.driver)} (${json.vehicleClass})`,
          lapRecord:
            (json.lapSummaries?.reduce((acc, val) => (acc < val['time lap'] ? acc : val['time lap']), Infinity) ?? 0) *
            Math.pow(10, -3),
          maxSpeed:
            (json.lapSummaries?.reduce((acc, val) => (acc > val['Max Speed GPS'] ? acc : val['Max Speed GPS']), 0) ??
              0) / 10,
          numberOfLaps: json.lapSummaries?.length,
          lapSummaries: json.lapSummaries?.map((lap) => ({
            lapNumber: lap.lap,
            maxSpeed: lap['Max Speed GPS'] / 10,
            minSpeed: lap['Min Speed GPS'] / 10,
            lapTime: lap['time lap'] * Math.pow(10, -3)
          }))
        };
      }),
      catchError((error) => {
        console.error('JSON Parse Fail', error);
        return EMPTY;
      }),
      retry(2),
      catchError((err) => {
        console.error('API Call Fail', err);
        return EMPTY;
      })
    )
  )
);

function convertToTitleCase(str: string) {
  return str
    .toLowerCase()
    .split(' ')
    .map(function (word) {
      return word.charAt(0).toUpperCase().concat(word.substr(1));
    })
    .join(' ');
}
