import { Router } from '@vaadin/router';
import { LitElement, css, html, customElement, property } from 'lit-element';

declare var atlas: any;

@customElement('stop-list')
export class StopList extends LitElement {

  @property({ type: Array }) stops: any[] = [];

  static get styles() {
    return css`
      h2 {
        font-size: 2em;
      }
      
      ul {
        list-style-type: none;
        list-style: none;
        margin: 0;
        padding: 0;
      }

      ul fast-card:nth-child(-n+8) {
        animation-name: slidein;
        animation-duration: 300ms;
      }

      fast-card {
          margin-bottom: 12px;
          padding: 12px;
          width: 100%;

          cursor: pointer;
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
        background: var(--accent-fill-rest);
      }

      fast-card .details {
        
      }

      /*fast-card .cardActions fast-anchor {
        background-color: var(--accent-fill-rest);
      }*/

      #loadingCard h3 fast-skeleton {
        height: 2em;
      }

      #loadingCard .cardActions fast-skeleton {
        height: 2em;
        width: 4em;
      }

      @keyframes slidein {
        from {
          transform: translateY(20px);
          opacity: 0;
        }
        to {
          transform: translateY(0);
          opacity: 1;
        }
      }

      @media(prefers-color-scheme: light) {
          fast-card {
            background: white;
          }
      }

      @media(min-width: 800px) {
        ul {
          display: grid;
          grid-template-columns: auto auto auto;
          grid-gap: 10px;
        }
      }
    `;
  }

  constructor() {
    super();
  }

  async firstUpdated() {
    console.log(this.stops);
  }

  doDetails(route: string) {
    Router.go(route);
  }

  render() {
    return html`

      <h2>Nearby Stops</h2>

      ${this.stops.length > 0 ? html`<ul>
        ${this.stops?.map((stop) => {
      return html`
                  <fast-card @click="${() => this.doDetails(`/about?id=${stop.id}`)}">
                    <h3>${stop.objectDetails.stopName}</h3>

                    <p class="details">Agency: ${stop.objectDetails.mainAgencyName}</p>

                    <div class="cardActions">
                      <fast-anchor .href="${`/about?id=${stop.id}`}">Details</fast-anchor>
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