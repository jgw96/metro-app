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

      fast-card .cardActions {
        display: flex;
        justify-content: flex-end;
        align-items: center;
        margin-top: 18px;
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

                    <div class="cardActions">
                      <fast-anchor .href="${`/about?id=${stop.id}`}" appearance="button">Details</fast-anchor>
                    </div>
                  </fast-card>
                `
            })
        }
      </ul>
    `;
  }
}