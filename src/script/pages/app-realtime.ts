import { Router } from "@vaadin/router";
import {
  LitElement,
  css,
  html,
  customElement,
  internalProperty,
} from "lit-element";
import { getRealTime } from "../services/metro";

@customElement("app-realtime")
export class AppRealtime extends LitElement {
  @internalProperty() details: any | null;
  @internalProperty() loading: boolean = true;
  @internalProperty() stopID: string | null = null;

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
        box-shadow: 0 0 calc((var(--elevation) * 0.225px) + 2px)
            rgba(0, 0, 0, calc(0.11 * (2 - var(--background-luminance, 1)))),
          0 calc(var(--elevation) * 0.4px) calc((var(--elevation) * 0.9px))
            rgba(0, 0, 0, calc(0.13 * (2 - var(--background-luminance, 1))));
        padding: 12px;
        margin-top: 12px;

        display: flex;
        flex-direction: column;
      }

      li h4 {
        margin-top: 0;
      }

      li span {
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
        margin-left: 6px;
      }

      #none {
        display: flex;
        flex-direction: column;
        align-items: center;
      }

      #none h2 {
          margin-bottom: 2em;
      }

      #none img {
          width: 100%;
      }

      fast-progress-ring {
        margin-top: 0;
        margin-bottom: 0;
      }

      @media(min-width: 800px) {
        ul {
          display: grid;
          grid-template-columns: auto auto auto;
          grid-gap: 10px;
        }
      }

      @media(min-width: 900px) {
          #none img {
              height: 20em;
          }
      }

      @media(prefers-color-scheme: light) {
        li {
          color: black;
          background: white;
        }

        #toolbar {
          background: white;
        }
      }
    `;
  }

  constructor() {
    super();
  }

  async firstUpdated() {
    this.loading = true;

    const search = new URLSearchParams(location.search);
    this.stopID = search.get("id");

    if (this.stopID) {
      const detailsData = await getRealTime(this.stopID);
      console.log(detailsData);
      this.details = detailsData;

      this.kickOffLiveUpdates();
    }

    this.loading = false;
  }

  kickOffLiveUpdates() {
    setInterval(() => {
      (window as any).requestIdleCallback(async () => {
        if (this.stopID) {
          const detailsData = await getRealTime(this.stopID);
          console.log(detailsData);
          this.details = detailsData;
        }
      })
    }, 60000)
  }

  goBack() {
    const search = new URLSearchParams(location.search);
    const id = search.get("id");

    Router.go(`/about?id=${id}`);
  }

  render() {
    return html`
      <div>
        ${this.details && this.details.length > 0
        ? html`
              <ul>
                ${this.details.map((data: any) => {
          return html`
                    <li>
                      <h4>${data.line.lineNumber}</h4>

                      <span>Headed to ${data.line.lineDestination}</span>

                      <span>${data.arrivalMinutes} minutes away</span>
                    </li>
                  `;
        })}
              </ul>
            `
        : !this.loading ? html`<div id="none">
              <h2>No arrivals soon</h2>

              <img src="/assets/bus.svg" alt="image of bus">
          </div>` : null}

        <div id="toolbar">
          <fast-button @click="${() => this.goBack()}">Back</fast-button>

          <fast-progress-ring></fast-progress-ring>
        </div>
      </div>
    `;
  }
}
