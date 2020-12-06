import { LitElement, css, html, customElement, property } from 'lit-element';


@customElement('stop-list')
export class StopList extends LitElement {

  @property({ type: Array }) stops: any[] = [];

  static get styles() {
    return css`
      ul {
        list-style-type: none;
        list-style: none;
        margin: 0;
        padding: 0;
      }

      fast-card {
          margin-bottom: 12px;
          padding: 12px;
      }

      fast-card h3 {
          margin-top: 0;
          margin-bottom: 0;
      }
    `;
  }

  constructor() {
    super();
  }

  firstUpdated() {
      console.log(this.stops);
  }

  render() {
    return html`
      <h2>Nearby Stops</h2>

      <ul>
        ${
            this.stops?.map((stop) => {
                return html`
                  <fast-card>
                    <h3>${stop.objectDetails.stopName}</h3>
                  </fast-card>
                `
            })
        }
      </ul>
    `;
  }
}