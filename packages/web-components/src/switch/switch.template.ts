import { ElementViewTemplate, html, slotted } from '@microsoft/fast-element';
import { staticallyCompose } from '../utils/index.js';
import { Switch, SwitchOptions } from './switch.js';

export function switchTemplate<T extends Switch>(options: SwitchOptions = {}): ElementViewTemplate<T> {
  return html<T>`
    <template
      role="switch"
      aria-checked="${x => x.checked}"
      aria-disabled="${x => x.disabled}"
      aria-readonly="${x => x.readOnly}"
      tabindex="${x => (x.disabled ? null : 0)}"
      @keypress="${(x, c) => x.keypressHandler(c.event as KeyboardEvent)}"
      @click="${(x, c) => x.clickHandler(c.event as MouseEvent)}"
    >
      <label
        part="label"
        class="${x => (x.defaultSlottedNodes && x.defaultSlottedNodes.length ? 'label' : 'label label__hidden')}"
      >
        <slot ${slotted('defaultSlottedNodes')}></slot>
      </label>
      <div part="switch" class="switch">
        <slot name="switch">${staticallyCompose(options.switch)}</slot>
      </div>
    </template>
  `;
}

export const template: ElementViewTemplate<Switch> = switchTemplate({
  switch: `<span class="checked-indicator" part="checked-indicator"></span>`,
});
