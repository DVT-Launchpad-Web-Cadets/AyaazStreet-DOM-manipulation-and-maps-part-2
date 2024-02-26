export default function getAllRaces(callBackFunction) {
    fetch ("https://go-kart-api.onrender.com/runs")
    .then ((response) => response.json())
    .then ( (res) => {
        if (!res) {
            throw new Error("No Races Found");
        }
        callBackFunction(res);
    })
    .catch((error) => {
        console.error(error);
    })
    .finally(() => {
        console.log("Finish getAllRaces API call");
    });
}

export function getAllLaps(filename, callBackFunction) {
    fetch (`https://go-kart-api.onrender.com/runs/${filename}`)
    .then ((response) => response.json())
    .then ( (res) => {
        if (!res?.lapSummaries) {
            throw new Error(`No Laps Found for ${filename}`);
        }
        callBackFunction(res);
    })
    .catch((error) => {
        console.error(error);
    })
    .finally(() => {
        console.log("Finish getAllLaps API call");
    });
}

export function getLap(filename, lapNumber, callBackFunction) {
    fetch (`https://go-kart-api.onrender.com/runs/${filename}/laps/${lapNumber}`)
    .then ((response) => response.json())
    .then ( (res) => {
        if (!res) {
            throw new Error(`No Lap ${lapNumber} Found for ${filename}`);
        }
        callBackFunction(res);
    })
    .catch((error) => {
        console.error(error);
    })
    .finally(() => {
        console.log("Finish getLap API call");
    });
}
