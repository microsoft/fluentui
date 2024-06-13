import { ElementViewTemplate, html } from '@microsoft/fast-element';
import { staticallyCompose } from '../utils/index.js';
import { Switch, SwitchOptions } from './switch.js';

export function switchTemplate<T extends Switch>(options: SwitchOptions = {}): ElementViewTemplate<T> {
  return html<T>`
    <template
      tabindex="${x => (!x.disabled ? 0 : void 0)}"
      @click="${(x, c) => x.clickHandler(c.event as MouseEvent)}"
      @input="${(x, c) => x.inputHandler(c.event as Event)}"
      @keydown="${(x, c) => x.keydownHandler(c.event as KeyboardEvent)}"
      @keyup="${(x, c) => x.keyupHandler(c.event as KeyboardEvent)}"
    >
      <slot name="switch">${staticallyCompose(options.switch)}</slot>
    </template>
  `;
}

export const template: ElementViewTemplate<Switch> = switchTemplate({
  switch: `<span class="checked-indicator" part="checked-indicator"></span>`,
});
