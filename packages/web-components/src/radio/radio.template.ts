import { type ElementViewTemplate, html } from '@microsoft/fast-element';
import { staticallyCompose } from '../utils/index.js';
import type { Radio } from './radio.js';
import type { RadioOptions } from './radio.options.js';

const checkedIndicator = html.partial(/* html */ `
    <span part="checked-indicator" class="checked-indicator" role="presentation"></span>
`);

/**
 * Generates a template for the {@link (Radio:class)} component.
 *
 * @param options - Radio configuration options
 * @public
 */
export function radioTemplate<T extends Radio>(options: RadioOptions = {}): ElementViewTemplate<T> {
  return html<T>`
    <template
      @click="${(x, c) => x.clickHandler(c.event as MouseEvent)}"
      @keydown="${(x, c) => x.keydownHandler(c.event as KeyboardEvent)}"
      @keyup="${(x, c) => x.keyupHandler(c.event as KeyboardEvent)}"
    >
      <slot name="checked-indicator">${staticallyCompose(options.checkedIndicator)}</slot>
    </template>
  `;
}

/**
 * Template for the Radio component
 *
 * @public
 */
export const template: ElementViewTemplate<Radio> = radioTemplate({ checkedIndicator });
