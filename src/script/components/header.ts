import { LitElement, css, html, customElement, property } from 'lit-element';


@customElement('app-header')
export class AppHeader extends LitElement {

  @property({ type: String }) title: string = 'Metro';

  static get styles() {
    return css`
      header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding-left: 16px;
        padding-right: 16px;
        background: var(--app-color-primary);
        color: white;
        height: 3.6em;
      }

      header h1 {
        margin-top: 0;
        margin-bottom: 0;
        font-size: 20px;
        font-weight: bold;
      }

      @media(prefers-color-scheme: light) {
        header h1 {
          color: #c01754;
        }

        header {
          background: white;
        }
      }
    `;
  }

  constructor() {
    super();
  }

  render() {
    return html`
      <header>
        <h1>${this.title}</h1>
      </header>
    `;
  }
}