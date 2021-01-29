import { LitElement, css, html, customElement, property } from "lit-element";

@customElement("app-header")
export class AppHeader extends LitElement {
  @property({ type: String }) title: string = "Metro";

  static get styles() {
    return css`
      header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding-left: 16px;
        padding-right: 16px;
        background: rgba(24, 24, 24, 0.81);
        backdrop-filter: blur(10px);
        color: white;
        height: 3.6em;

        position: sticky;
        top: 0;
      }

      header h1 {
        margin-top: 0;
        margin-bottom: 0;
        font-size: 20px;
        font-weight: bold;
      }

      ion-icon {
        font-size: 1.8em;
      }

      @media (prefers-color-scheme: dark) {
        position: sticky;
        top: 0;
        background: rgba(24, 24, 24, 0.81);
        backdrop-filter: blur(10px);
      }

      @media (prefers-color-scheme: light) {
        header h1 {
          color: #c01754;
        }

        header {
          background: white;
        }

        fast-button ion-icon {
          color: black;
        }
      }
    `;
  }

  constructor() {
    super();
  }

  async share() {
    if (navigator.share) {
      try {
        await navigator.share({
          title: "Metro",
          text: "Check this out",
          url: location.href,
        });
      }
      catch (err) {
        console.error("Sharing failed", err);
      }
    }
  }

  render() {
    return html`
      <header>
        <h1>${this.title}</h1>

        <fast-button @click="${() => this.share()}" appearance="stealth">
          <ion-icon name="share-outline"></ion-icon>
        </fast-button>
      </header>
    `;
  }
}
