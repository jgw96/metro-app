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

      fast-card .cardActions fast-anchor {
        background-color: var(--accent-fill-rest);
      }

      #loadingCard h3 fast-skeleton {
        height: 2em;
      }

      #loadingCard .cardActions fast-skeleton {
        height: 2em;
        width: 4em;
      }

      @media(prefers-color-scheme: light) {
          fast-card {
            background: white;
          }
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

      ${this.stops.length > 0 ? html`<ul>
        ${this.stops?.map((stop) => {
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
      </ul>` : html`<ul>
        <fast-card id="loadingCard">
          <h3><fast-skeleton shimmer shape="rect"></fast-skeleton></h3>

          <div class="cardActions">
            <fast-skeleton shimmer shape="rect"></fast-skeleton>
          </div>
        </fast-card>

        <fast-card id="loadingCard">
          <h3><fast-skeleton shimmer shape="rect"></fast-skeleton></h3>

          <div class="cardActions">
            <fast-skeleton shimmer shape="rect"></fast-skeleton>
          </div>
        </fast-card>

        <fast-card id="loadingCard">
          <h3><fast-skeleton shimmer shape="rect"></fast-skeleton></h3>

          <div class="cardActions">
            <fast-skeleton shimmer shape="rect"></fast-skeleton>
          </div>
        </fast-card>
      </ul>`}
    `;
  }
}