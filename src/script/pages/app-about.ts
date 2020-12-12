import { Router } from '@vaadin/router';
import { LitElement, css, html, customElement, internalProperty } from 'lit-element';
import { getStopDetails } from '../services/metro';


@customElement('app-about')
export class AppAbout extends LitElement {

  @internalProperty() details: any | null;
  @internalProperty() intID: string | null = null;

  static get styles() {
    return css`

      section {
        display: flex;
        flex-direction: column;
      }

      h2 {
        margin-bottom: 0;
        margin-top: 0;
      }

      h3 {
        margin-bottom: 0;
      }

      #detailsHeader {
        margin-bottom: 8px;
      }

      ul {
        margin-top: 0;
        margin-bottom: 4em;
        list-style: none;
        padding: 0;
      }

      li {
        background: #212121;
        border-radius: calc(var(--corner-radius) * 1px);
        box-shadow: 0 0 calc((var(--elevation) * 0.225px) + 2px) rgba(0, 0, 0, calc(0.11 * (2 - var(--background-luminance, 1)))), 0 calc(var(--elevation) * 0.4px) calc((var(--elevation) * 0.9px)) rgba(0, 0, 0, calc(0.13 * (2 - var(--background-luminance, 1))));
        padding: 12px;
        margin-top: 12px;
      }

      li h4 {
        margin-top: 0;
      }

      section span {
        margin-bottom: 6px;
      }

      #toolbar {
        position: fixed;
        bottom: 0;
        background: #181818cf;
        left: 0;
        right: 0;
        display: flex;
        justify-content: space-between;
        padding: 10px;
        backdrop-filter: blur(10px);
      }

      #toolbar #realTime {
        background: var(--accent-fill-rest);
      }
    `;
  }

  constructor() {
    super();
  }

  async firstUpdated() {
    const search = new URLSearchParams(location.search);
    this.intID = search.get('id');

    if (this.intID) {
      const detailsData = await getStopDetails(this.intID);
      console.log(detailsData);
      this.details = detailsData;
    }
  }

  goBack() {
    Router.go("/");
  }

  render() {
    return html`
      <div>
        ${
          this.details ? html`
            <h2>${this.details.stop.stopName}</h2>

            <section>
              <h3 id="detailsHeader">Details</h3>

              <span>Agency: ${this.details.stop.mainAgencyName}</span>
              <span>Type: ${this.details.stop.mainTransitType}</span>
            </section>

            <section>
              <h3>Lines</h3>

              <ul>
                ${
                  this.details.lineGroups.map((line: any) => {
                    if (line) {
                      return html`
                        <li>
                          <h4>${line.lineNumber}</h4>
                          <span>Destination: ${line.caption1}</span>
                        </li>
                      `
                    }
                    else {
                      return null;
                    }
                  })
                }
              </ul>
            </section>
            

          ` : null
        }

        <div id="toolbar">
          <fast-button @click="${() => this.goBack()}">Back</fast-button>
          <fast-anchor appearance="button" href="${`/realtime?id=${this.intID}`}" id="realTime">Real-Time Arrivals</fast-anchor>
        </div>
      </div>
    `;
  }
}