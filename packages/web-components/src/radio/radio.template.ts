import { ElementViewTemplate, html, slotted } from '@microsoft/fast-element';
import { staticallyCompose, whitespaceFilter } from '../utils/index.js';
import type { Radio, RadioOptions } from './radio.js';

export function radioTemplate<T extends Radio>(options: RadioOptions = {}): ElementViewTemplate<T> {
  return html<T>`
    <template
      role="radio"
      aria-checked="${x => x.checked}"
      aria-required="${x => x.required}"
      aria-disabled="${x => x.disabled}"
      @keypress="${(x, c) => x.keypressHandler(c.event as KeyboardEvent)}"
    >
      <div part="control" class="control">
        <slot name="checked-indicator"> ${staticallyCompose(options.checkedIndicator)} </slot>
      </div>
      <label
        part="label"
        class="${x => ['label', !x.defaultSlottedNodes?.length && 'label__hidden'].filter(Boolean).join(' ')}"
      >
        <slot
          ${slotted({
            property: 'defaultSlottedNodes',
            filter: whitespaceFilter,
          })}
        ></slot>
      </label>
    </template>
  `;
}

export const template: ElementViewTemplate<Radio> = radioTemplate({
  checkedIndicator: html`<div part="checked-indicator" class="checked-indicator"></div>`,
});
