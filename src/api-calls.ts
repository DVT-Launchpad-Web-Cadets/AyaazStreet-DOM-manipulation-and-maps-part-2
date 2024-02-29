export default function getAllRaces(callBack, errorCallBack, finallyCallBack = () => 0) {
  fetch('https://go-kart-api.onrender.com/runs')
    .then((response) => response.json())
    .then((res) => {
      if (!res) {
        throw new Error('No Races Found');
      }
      callBack(res);
    })
    .catch((error) => {
      errorCallBack(error);
    })
    .finally(() => {
      finallyCallBack();
    });
}

export function getAllLaps(filename, callBack, errorCallBack, finallyCallBack = () => 0) {
  fetch(`https://go-kart-api.onrender.com/runs/${filename}`)
    .then((response) => response.json())
    .then((res) => {
      if (!res?.lapSummaries) {
        throw new Error(`No Laps Found for ${filename}`);
      }
      callBack(res);
    })
    .catch((error) => {
      errorCallBack(error);
    })
    .finally(() => {
      finallyCallBack();
    });
}

export function getLap(filename, lapNumber, callBack, errorCallBack, finallyCallBack = () => 0) {
  fetch(`https://go-kart-api.onrender.com/runs/${filename}/laps/${lapNumber}`)
    .then((response) => response.json())
    .then((res) => {
      if (!res) {
        throw new Error(`No Lap ${lapNumber} Found for ${filename}`);
      }
      callBack(res);
    })
    .catch((error) => {
      errorCallBack(error);
    })
    .finally(() => {
      finallyCallBack();
    });
}
