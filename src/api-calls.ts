import type { IKartLap, IKartRace } from './models/go-kart.d.ts';

export default function getAllRaces(
  callBack: (allRacesJSON: string[]) => void,
  errorCallBack: (error: Error) => void,
  finallyCallBack?: () => void
) {
  fetch('https://go-kart-api.onrender.com/runs')
    .then((response) => response.json())
    .then((res: string[]) => {
      if (!res) {
        throw new Error('No Races Found');
      }
      callBack(res);
    })
    .catch((error) => {
      errorCallBack(error);
    })
    .finally(() => {
      if (finallyCallBack) finallyCallBack();
    });
}

export function getLapSummary(
  filename: string,
  callBack: (allLapsJSON: IKartRace, filename: string) => void,
  errorCallBack: (error: Error) => void,
  finallyCallBack?: () => void
) {
  fetch(`https://go-kart-api.onrender.com/runs/${filename}`)
    .then((response) => response.json())
    .then((res: IKartRace) => {
      if (!res?.lapSummaries) {
        throw new Error(`No Laps Found for ${filename}`);
      }
      callBack(res, filename);
    })
    .catch((error) => {
      errorCallBack(error);
    })
    .finally(() => {
      if (finallyCallBack) finallyCallBack();
    });
}

export function getLap(
  filename: string,
  lapNumber: number,
  callBack: (lapJSON: IKartLap) => void,
  errorCallBack: (error: Error) => void,
  finallyCallBack?: () => void
) {
  fetch(`https://go-kart-api.onrender.com/runs/${filename}/laps/${lapNumber}`)
    .then((response) => response.json())
    .then((res: IKartLap) => {
      if (!res) {
        throw new Error(`No Lap ${lapNumber} Found for ${filename}`);
      }
      callBack(res);
    })
    .catch((error) => {
      errorCallBack(error);
    })
    .finally(() => {
      if (finallyCallBack) finallyCallBack();
    });
}
