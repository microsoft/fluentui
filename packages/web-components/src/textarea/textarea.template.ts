import { ElementViewTemplate, html, ref } from '@microsoft/fast-element';
import type { TextArea } from './textarea.js';
import type { TextAreaOptions } from './textarea.options.js';

/**
 * Generates a template for the TextInput component.
 *
 * @public
 */
export function textInputTemplate<T extends TextArea>(options: TextAreaOptions = {}): ElementViewTemplate<T> {
  return html<T>`
    <template>
      <div ${ref('placeholderContainer')} class="placeholder" part="placeholder">${x => x.placeholder}</div>
      <div ${ref('textbox')} class="textbox"></div>
      <button
        ${ref('resizeHandle')}
        class="resize"
        part="resize"
        aria-hidden="true"
        tabindex="-1"
        disabled="${x => x.disabled}"
      ></button>
    </template>
  `;
}

/**
 * @internal
 */
export const template: ElementViewTemplate<TextArea> = textInputTemplate();
