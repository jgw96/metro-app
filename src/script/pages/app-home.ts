import { LitElement, css, html, customElement, internalProperty } from 'lit-element';

// For more info on the @pwabuilder/pwainstall component click here https://github.com/pwa-builder/pwa-install
import '@pwabuilder/pwainstall';
import { getNearbyStops } from '../services/metro';

import '../components/stop-list';
import { getLocation, getSavedLoc } from '../utils/location';

@customElement('app-home')
export class AppHome extends LitElement {

  @internalProperty() gotLocation: boolean = false;
  @internalProperty() location: string | null = null;
  @internalProperty() nearbyStops: any[] | null = null;

  static get styles() {
    return css`
      #welcomeBar {
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        text-align: center;
      }

      #welcomeBar fast-card {
        margin-bottom: 12px;
      }

      #welcomeCard, #infoCard {
        padding: 18px;
        padding-top: 0px;
      }

      #welcomeBar fast-button {
        background: #c01754;
      }

      pwa-install {
        position: absolute;
        bottom: 16px;
        right: 16px;

        --install-button-color: var(--accent-fill-rest);
      }

      button {
        cursor: pointer;
      }

      @media(min-width: 1200px) {
        #welcomeCard, #infoCard {
          width: 40%;
        }
      }

      @media(screen-spanning: single-fold-vertical) {
        #welcomeBar {
          flex-direction: row;
          align-items: flex-start;
          justify-content: space-between;
        }

        #welcomeCard {
          margin-right: 64px;
        }
      }
    `;
  }

  constructor() {
    super();
  }

  async firstUpdated() {
    const loc = getSavedLoc();

    const geoPerm = await navigator.permissions.query({ name: 'geolocation' })
    if (geoPerm.state === "granted") {
      await this.setLocation();
    }
    else if (loc) {
      this.gotLocation = true;
      this.location = loc;

      await this.getNearby();
    }
  }

  async setLocation() {
    const locData = await getLocation();

    if (locData) {
      this.gotLocation = true;
      this.location = locData;

      await this.getNearby();
    }
  }

  async getNearby() {
    if (this.location) {
      const stops = await getNearbyStops(this.location);
      console.log('stops', stops)

      if (stops && stops.length > 0) {
        this.nearbyStops = [...stops];
      }
    }
  }

  share() {
    if ((navigator as any).share) {
      (navigator as any).share({
        title: 'PWABuilder pwa-starter',
        text: 'Check out the PWABuilder pwa-starter!',
        url: 'https://github.com/pwa-builder/pwa-starter',
      })
    }
  }

  render() {
    return html`
      <div>
      
        ${!this.gotLocation ? html`<div id="welcomeBar">
          <h2>Allow location access to find your local transit options</h2>
          <fast-button @click="${() => this.setLocation()}">Get My Location</fast-button>
        </div>` : this.nearbyStops ? html`<stop-list .stops="${this.nearbyStops}"></stop-list>` : html`<stop-list></stop-list>`}
      
        <pwa-install>Install Metro</pwa-install>
      </div>
    `;
  }
}