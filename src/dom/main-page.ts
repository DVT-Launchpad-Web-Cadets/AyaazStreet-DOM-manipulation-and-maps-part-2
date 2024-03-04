import { getDate, getMonth, getYear } from 'date-fns';
import getRaceLaps from '../main.ts';
import type { IAllRaces } from '../models/races.d.ts';

export default function mainPage(data: IAllRaces) {
  resetPage();
  headerSection();
  mainSection();
  showListData(data);
}

const headerSection = () => {
  const headerElement = document.createElement('header');
  if (!headerElement) throw new Error('Header Element Not Found');
  headerElement.setAttribute('id', 'main-header');
  headerElement.innerHTML = `
                <h1>Go Kart Lap Times</h1>
        `;
  const appElement = document.querySelector('#app');
  if (!appElement) throw new Error('App Element Not Found');
  appElement.appendChild(headerElement);
};

const mainSection = () => {
  const mainElement = document.createElement('main');
  if (!mainElement) throw new Error('Main Element Not Found');
  mainElement.setAttribute('id', 'main-page');
  mainElement.innerHTML = `
        <h1>Races</h1>
        <section id="list"></section>
    `;
  const appElement = document.querySelector('#app');
  if (!appElement) throw new Error('App Element Not Found');
  appElement.appendChild(mainElement);
};

const showListData = (data: IAllRaces) => {
  const raceListElement = document.querySelector('#list');
  if (!raceListElement) throw new Error('Race List Element Not Found');
  if (!data || !data.filename) throw new Error('Missing race data');
  const race = document.createElement('race-button');
  if (!race) throw new Error(`Race Button Element Not Found`);
  race.setAttribute('filename', data.filename);
  if (!data.dateTime) {
    race.setAttribute('day', '??');
    race.setAttribute('monthyear', '??? ????');
  } else {
    race.setAttribute('day', `${getDate(data.dateTime)}`);
    race.setAttribute(
      'monthyear',
      `${Intl.DateTimeFormat('en-GB', { month: 'short' }).format(getMonth(data.dateTime))} ${getYear(data.dateTime)}`
    );
  }
  if (!data.title) {
    race.setAttribute('title', 'No Title');
  } else {
    race.setAttribute('title', data.title);
  }
  if (!data.summary) {
    race.setAttribute('summary', 'No Summary');
  } else {
    race.setAttribute('summary', data.summary);
  }
  race.addEventListener('click', () => {
    resetPage();
    getRaceLaps(data.filename);
  });
  raceListElement.appendChild(race);
};

const resetPage = () => {
  const page = document.querySelector('#app');
  if (!page) console.error('Page not found');
  else document.body.removeChild(page);
  const newPage = document.createElement('div');
  if (!newPage) throw new Error('New Page Element Not Found');
  newPage.setAttribute('id', 'app');
  newPage.setAttribute('class', 'main');
  document.body.appendChild(newPage);
};
