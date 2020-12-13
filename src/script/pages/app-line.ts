import { Router } from "@vaadin/router";
import {
  LitElement,
  css,
  html,
  customElement,
  internalProperty,
} from "lit-element";
import { getLineDetails } from "../services/metro";

@customElement("app-line")
export class AppLine extends LitElement {
  @internalProperty() details: any | null;
  @internalProperty() loading: boolean = true;
  @internalProperty() lineID: string | null = null;

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
    this.lineID = search.get("id");

    if (this.lineID) {
      const detailsData = await getLineDetails(this.lineID);
      console.log(detailsData);
      this.details = detailsData;
    }

    this.loading = false;
  }

  goBack() {
    Router.go(`/`);
  }

  render() {
    return html`
    <div>
      ${this.details ? html`
          <section>
            <h2>Lines</h2>

            <ul>
              ${this.details.lines.map((line: any) => {
      if (line) {
        return html`
                      <li>
                        <h4>${line.lineNumber}</h4>
                        <span>Destination: ${line.lineDestination}</span>
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
          

        ` : html`
        <h2><fast-skeleton shimmer shape="rect"></fast-skeleton></h2>

        <section>
            <h3 id="detailsHeader"><fast-skeleton shimmer shape="rect"></fast-skeleton></h3>

            <span><fast-skeleton shimmer shape="rect"></fast-skeleton></span>
            <span><fast-skeleton shimmer shape="rect"></fast-skeleton></span>
          </section>
        `
      }

      <div id="toolbar">
        <fast-button @click="${() => this.goBack()}">Back</fast-button>
      </div>
    </div>
  `;
  }
}
