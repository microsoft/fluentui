import { html } from '@microsoft/fast-element';
import { Switch } from './switch.js';

export const template = html`
  <template
    role="switch"
    aria-checked="${(attr: Switch) => attr.isChecked}"
    aria-disabled="${(attr: Switch) => attr.isDisabled}"
    tabindex="${(attr: Switch) => (attr.isDisabled ? null : 0)}"
    @keypress="${(x, c) => x.keypressHandler(c.event as KeyboardEvent)}"
    @click="${(x, c) => x.clickHandler(c.event as MouseEvent)}"
  >
    <div class="dcs-switch-container" part="container">
      <label part="label" class="dcs-switch-label">
        <slot></slot>
      </label>
      <div style="display: flex; align-items:center;">
        <input
          tabindex="-1"
          type="checkbox"
          ?checked="${(attr: Switch) => attr.isChecked}"
          ?disabled="${(attr: Switch) => attr.isDisabled}"
        />
        <span class="track"></span>
        <div class="message-container" part="message">
          <span class="checked-message" part="checked-message">
            <slot name="checked-message"></slot>
          </span>
          <span class="unchecked-message" part="unchecked-message">
            <slot name="unchecked-message"></slot>
          </span>
          <span class="static-message" part="static-message">
            <slot name="static-message"></slot>
          </span>
        </div>
      </div>
    </div>
  </template>
`;
