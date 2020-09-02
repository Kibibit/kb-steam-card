import { LitElement, html, customElement, CSSResult, TemplateResult, css, PropertyDeclarations } from 'lit-element';

import * as packageDetails from '../package.json';

console.info(
  `%c  KB-STEAM-CARD \n%c  ${packageDetails.version}   `,
  'color: orange; font-weight: bold; background: black',
  'color: white; font-weight: bold; background: dimgray',
);

(window as any).customCards = (window as any).customCards || [];
(window as any).customCards.push({
  type: 'kb-steam-card',
  name: 'kb Steam Card',
  description: 'A card to show Steam integrations',
});

import { format } from 'timeago.js';

@customElement('kb-steam-card')
class KbSteamCard extends LitElement {
  hass;
  config;
  static get properties(): PropertyDeclarations {
    return {
      hass: {},
      config: {},
    };
  }

  render(): TemplateResult {
    return html`
      <ha-card>
        ${this.config.entity
          ? this.createEntityCard(this.hass.states[this.config.entity])
          : this.createEntitiesCard(this.config.entities)}
      </ha-card>
    `;
  }

  setConfig(config): void {
    if (!config.entities && !config.entity) {
      throw new Error('You need to define either a single entity or an entities field');
    }
    this.config = config;
  }

  // The height of your card. Home Assistant uses this to automatically
  // distribute all cards over the available columns.
  getCardSize(): number {
    return this.config.entities ? this.config.entities.length + 1 : 2;
  }

  _toggle(state): void {
    this.hass.callService('homeassistant', 'toggle', {
      entity_id: state.entity_id,
    });
  }

  createEntitiesCard(entities): TemplateResult[] {
    return [
      html`
        <div class="card-header"><div class="name">Steam Friends</div></div>
      `,
      ...entities.map((ent, index) => {
        const entity = this.hass.states[ent];
        return entity
          ? html`
              <div class="kb-steam-multi ${index === entities.length - 1 ? 'kb-last' : ''} ${entity.state}">
                <div class="kb-steam-user">
                  <img src="${entity.attributes.entity_picture}" class="kb-steam-avatar" />
                  <div class="kb-steam-username">${entity.attributes.friendly_name}</div>
                </div>
                <div class="kb-steam-value">-</div>
              </div>
            `
          : html`
              <div class="not-found">Entity ${ent} not found.</div>
            `;
      }),
    ];
  }

  createEntityCard(entity): TemplateResult {
    console.log(entity);
    return html`
      <div class="kb-steam-username">
        ${this.config.friendly_name ? this.config.friendly_name : entity.attributes.friendly_name}
      </div>
      ${this.renderUserAvatar(entity)}
      <div class="kb-steam-online-status">${entity.state}</div>
      <div class="kb-steam-level">
        <span class="kb-steam-level-text-container">
          <span class="kb-steam-level-text">${entity.attributes.level}</span>
        </span>
        <ha-icon icon="mdi:shield"></ha-icon>
      </div>
      <div class="kb-steam-last-online">
        <span>
          <ha-icon icon="mdi:clock-outline"></ha-icon>
          ${entity.state === 'online' ? 'Online Since' : 'Last Online'}
        </span>
        <span>
          ${this.formatLastOnline(entity.attributes.last_online)}
        </span>
      </div>
      ${this.renderCurrentlyPlayingGame(entity)}
    `;
  }

  formatLastOnline(lastOnline): string {
    return format(new Date(lastOnline));
  }

  renderUserAvatar(entity): TemplateResult {
    return entity.attributes.entity_picture
      ? html`
          <img src="${entity.attributes.entity_picture}" class="kb-steam-avatar" />
        `
      : html`
          <ha-icon icon="${entity.attributes.icon}" class="kb-steam-avatar"></ha-icon>
        `;
  }

  renderCurrentlyPlayingGame(entity): TemplateResult {
    const currentlyPlayingGame = entity.attributes.game;

    return currentlyPlayingGame
      ? html`
          <div class="kb-steam-now-playing">
            <div class="label">Now Playing</div>
            <div class="game-title">${entity.attributes.game}</div>
            <img class="game-img" src="${entity.attributes.game_image_header}" />
          </div>
        `
      : html``;
  }

  static get styles(): CSSResult {
    return css`
      /* :host {
      } */

      .card-header {
        width: 100%;
        padding-top: 8px;
        padding-bottom: 8px;
      }

      .not-found {
        background-color: yellow;
        font-family: sans-serif;
        font-size: 14px;
        padding: 8px;
      }

      ha-card {
        padding: 16px;
        display: flex;
        flex-direction: column;
        align-items: center;
      }

      .kb-steam-avatar {
        border-radius: 50%;
        width: 40px;
        height: 40px;
        margin: 8px;
      }

      ha-icon.kb-steam-avatar {
        display: flex;
        align-items: center;
        justify-content: center;
        background: rgba(0, 0, 0, 0.8);
      }

      .kb-steam-level {
        position: relative;
        margin: 16px;
      }

      .kb-steam-level > .kb-steam-level-text-container {
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        display: flex;
        justify-content: center;
        /* align-items: center; */
        margin-top: 2px;
        color: var(--secondary-background-color);
        z-index: 2;
        /* fix for font */
        transform: translateY(1px);
      }

      .kb-steam-last-online {
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: space-between;
      }

      .kb-steam-now-playing {
        width: 100%;
        overflow: hidden;
        margin-top: 2em;
      }

      .kb-steam-now-playing > .game-title {
        font-size: 1.7em;
        margin: 0.2em 0 1.5em;
      }

      .kb-steam-now-playing > .game-img {
        width: 100%;
        height: auto;
      }

      .kb-steam-multi {
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin: 0 0 8px;
        position: relative;
      }

      .kb-steam-multi .kb-steam-user {
        display: flex;
        align-items: center;
      }

      .kb-steam-multi .kb-steam-avatar {
        margin: 0 16px 0 0;
      }

      .kb-steam-multi::before {
        z-index: 1;
        position: absolute;
        bottom: 0;
        left: 2em;
        width: 1em;
        height: 1em;
        border-radius: 50%;
        background: #646464;
        background-image: radial-gradient(top, #616161 0%, #616161 20%, #535353 60%);
        content: '';
      }

      .kb-steam-multi.online::before,
      .kb-steam-multi.snooze::before {
        box-shadow: 0 0 1em #1c1c17, 0 0 1em #ff4242;
        background: #ff4f4f;
      }

      .kb-last {
        margin-bottom: 0;
      }
    `;
  }
}
