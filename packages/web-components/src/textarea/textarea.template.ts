import { ElementViewTemplate, html, ref, slotted } from '@microsoft/fast-element';
import { whitespaceFilter } from '../utils/whitespace-filter.js';
import type { TextArea } from './textarea.js';
import type { TextAreaOptions } from './textarea.options.js';

/**
 * Generates a template for the TextInput component.
 *
 * @public
 */
export function textInputTemplate<T extends TextArea>(options: TextAreaOptions = {}): ElementViewTemplate<T> {
  return html<T>`
    <template @beforeinput="${(x, c) => x.beforeinputHandler(c.event as InputEvent)}">
      <div ${ref('textbox')} class="textbox"></div>
      <div class="placeholder" part="placeholder">${x => x.placeholder}</div>
    </template>
  `;
}

/**
 * @internal
 */
export const template: ElementViewTemplate<TextArea> = textInputTemplate();
