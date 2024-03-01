import { drawLap } from './map.ts';
import type { IKartRace } from './models/go-kart.d.ts';

export default function showListData(data: IKartRace, filename: string) {
  const lapListElement = document.querySelector('#list');
  if (!lapListElement) throw new Error('Lap List Element Not Found');
  if (!data) throw new Error('No Data Provided');
  if (!data.lapSummaries) throw new Error('No Laps Found');
  for (let i = 0; i < data.lapSummaries?.length; i++) {
    const lap = document.createElement('lap-button');
    try {
      if (!lap) throw new Error(`Lap ${i + 1} not found`);
      lap.setAttribute('number', `${i + 1}`);
      if (!data.lapSummaries[i]?.['Max Speed GPS']) throw new Error(`Max Speed GPS for lap ${i} not found`);
      lap.setAttribute('speed', `${data.lapSummaries[i]['Max Speed GPS'] / 10}`);
      if (!data.lapSummaries[i]?.['time lap']) throw new Error(`Time lap for lap ${i} not found`);
      lap.setAttribute('time', (data.lapSummaries[i]['time lap'] * Math.pow(10, -3)).toFixed(2));
      lap.addEventListener('click', () => {
        const lapButtons = document.querySelectorAll('lap-button');
        if (!lapButtons) throw new Error('Lap buttons not found');
        for (const lapButton of lapButtons) lapButton.classList.remove('active');
        lap.classList.add('active');
        drawLap(i + 1, filename);
      });
      lapListElement.appendChild(lap);
    } catch (error) {
      console.error(error);
      continue;
    }
  }
}
