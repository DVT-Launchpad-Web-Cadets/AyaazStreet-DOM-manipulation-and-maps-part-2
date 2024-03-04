import { getAllRaces, getListData, getMapData } from '../main.ts';
import type { IAllLaps } from '../models/laps.d.ts';

export default function racePage(data: IAllLaps) {
  resetPage();
  headerSection(data);
  mainSection();
  mapSection(data);
  listSection(data);
}

const headerSection = (data: IAllLaps) => {
  const headerElement = document.createElement('header');
  if (!headerElement) throw new Error('Header Element Not Found');
  headerElement.setAttribute('id', 'race-header');
  const minutes = Math.floor(data.lapRecord / 60);
  const seconds = data.lapRecord % 60;
  const milliseconds = (seconds + '').split('.')[1];
  headerElement.innerHTML = `
  <section id="title-header">
    <div class="race-info">
      <h1 id="title">${data.title}</span>
      <h2 id="summary">${data.summary}</span>
    </div>
    <button id="back">
      <img src="/close.png" alt="Close icon" />
    </button>
  </section>
  <section id="stats-header">
    <div id="max-speed">
        <h2>${data.maxSpeed}<span>km/h</span></h2>
        <h3>Speed Record</h3>
    </div>
    <div id="min-time">
        <h2>${minutes}:${Math.floor(seconds)}<span>.${milliseconds}</span></h2>
        <h3>Lap Record</h3>
    </div>
  </section>`;
  const backButton = headerElement.querySelector('#back');
  backButton?.addEventListener('click', goBack);
  const appElement = document.querySelector('#app');
  if (!appElement) throw new Error('App Element Not Found');
  appElement.appendChild(headerElement);
};

const mainSection = () => {
  const mainElement = document.createElement('main');
  if (!mainElement) throw new Error('Main Element Not Found');
  mainElement.setAttribute('id', 'race-page');
  const mapElement = document.createElement('section');
  if (!mapElement) throw new Error('Map Element Not Found');
  mapElement.setAttribute('id', 'map');
  mainElement.appendChild(mapElement);
  const listElement = document.createElement('section');
  if (!listElement) throw new Error('List Element Not Found');
  listElement.setAttribute('id', 'list');
  mainElement.appendChild(listElement);
  const appElement = document.querySelector('#app');
  if (!appElement) throw new Error('App Element Not Found');
  appElement.appendChild(mainElement);
};

const goBack = () => {
  resetPage();
  getAllRaces();
};

const resetPage = () => {
  const page = document.querySelector('#app');
  if (!page) console.error('Page not found');
  else document.body.removeChild(page);
  const newPage = document.createElement('div');
  if (!newPage) throw new Error('New Page Element Not Found');
  newPage.setAttribute('id', 'app');
  newPage.setAttribute('class', 'race');
  document.body.appendChild(newPage);
};

const mapSection = (data: IAllLaps) => {
  getMapData(data.filename, 1);
};

const listSection = (data: IAllLaps) => {
  getListData(data.filename);
};
