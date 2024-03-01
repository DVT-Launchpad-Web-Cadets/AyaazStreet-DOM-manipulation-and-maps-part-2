class lapButton extends HTMLElement {
  static observedAttributes = ['number', 'speed', 'time'];

  constructor() {
    super();
    const shadowRoot = this.attachShadow({ mode: 'open' });
    shadowRoot.innerHTML = `
        <style>
            .lap {
                cursor: pointer;
                display: flex;
                justify-content: space-between;
                padding: 0.5em;
                width: 100%;
                border: none;
                background-color: transparent;
				        font-size: 1rem;
            }

            .lap:hover {
                background-color: #f0f0f0;
            }

            .lap-number,
            .lap-speed,
            .lap-time {
                min-width: 4em;
            }
        </style>
        <button class="lap">
            <span id="number">Loading</span>
            <span id="speed">Loading</span>
            <span id="time">Loading</span>
        </div>`;
  }

  attributeChangedCallback(name: string, _oldValue: null, newValue: number) {
    this.setTargetToValue(name, newValue);
  }

  setTargetToValue(targetId: string, value: number) {
    if (!this.shadowRoot) {
      console.error('No shadowRoot');
      return;
    }
    const target = this.shadowRoot.getElementById(targetId);

    if (!target) {
      console.warn('No target', targetId);
      return;
    }

    switch (targetId) {
      case 'number':
        if (isNaN(value)) target.innerText = 'N/A';
        else {
          const prependNumber = value <= 9 ? '0' : '';
          target.innerText = `${prependNumber}${value}`;
        }
        break;
      case 'speed':
        if (isNaN(value)) target.innerText = 'N/A';
        else target.innerText = `${value} km/h`;
        break;
      case 'time':
        if (isNaN(value)) target.innerText = 'N/A';
        else target.innerText = `${value} s`;

        break;
      default:
        target.innerText = `${value}`;
    }
  }
}

customElements.define('lap-button', lapButton);
