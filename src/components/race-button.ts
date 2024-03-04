class raceButton extends HTMLElement {
  static observedAttributes = ['day', 'monthyear', 'title', 'summary', 'filename'];

  constructor() {
    super();
    const shadowRoot = this.attachShadow({ mode: 'open' });
    shadowRoot.innerHTML = `
      <style>
        .race {
          cursor: pointer;
          display: flex;
          justify-content: space-between;
          padding: 1.5em 0.5em;
          width: 100%;
          border: none;
          border-bottom: 0.5px solid #9495a0;
          background-color: transparent;
				  font-size: 1rem;
          color: whitesmoke;
        }

        #dateTime {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: flex-start;

          #day {
            font-size: 1.3rem;
            font-weight: bold;
          }

          #monthyear {
            font-size: 0.8rem;
            font-weight: bold;
            color: #9495a0;
          }
        }

        #race-header {
          display: flex;
          width: calc(100% - 9em);
          justify-content: space-between;
          padding-left: 2em;
          border-left: 2px solid #383a44;
          align-items: center;

          .race-info {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: flex-start;
            margin-right: 1em;
          }

          #title {
            font-size: 1.3rem;
            font-weight: bold;
          }

          #summary {
            font-size: 0.8rem;
            color: #9495a0;
          }

          img {
            width: 1.2rem;
            height: 1.2rem;
          }
        }
    </style>
    <button class="race">
      <div id="dateTime">
        <span id="day">Loading</span>
        <span id="monthyear">Loading</span>
      </div>
      <div id="race-header">
        <div class="race-info">
          <span id="title">Loading</span>
          <span id="summary">Loading</span>
        </div>
        <img src="/right-arrow.png" alt="Right arrow icon" />
      </div>
    </button>`;
  }

  attributeChangedCallback(name: string, _oldValue: null, newValue: string) {
    this.setTargetToValue(name, newValue);
  }

  setTargetToValue(targetId: string, value: string) {
    if (!this.shadowRoot) {
      console.error('No shadowRoot');
      return;
    }

    if (targetId !== 'filename') {
      const target = this.shadowRoot.getElementById(targetId);
      if (!target) {
        console.warn('No target', targetId);
        return;
      }
      target.innerText = value;
    }
  }
}

customElements.define('race-button', raceButton);
