import { ElementViewTemplate, html, ref } from '@microsoft/fast-element';
import type { TextArea } from './textarea.js';

/**
 * Generates a template for the TextInput component.
 *
 * @public
 */
export function textInputTemplate<T extends TextArea>(): ElementViewTemplate<T> {
  return html<T>`
    <template>
      <div class="placeholder" part="placeholder" aria-hidden="true">
        ${x => x.placeholder}
      </div>
      <div
        ${ref('textbox')}
        class="textbox"
        part="textbox"
        spellcheck="${x => (x.spellcheck ? 'true' : 'false')}"
        @focus="${x => x.handleTextboxFocus()}"
        @blur="${x => x.handleTextboxBlur()}"
      ></div>
    </template>
  `;
}

/**
 * @internal
 */
export const template: ElementViewTemplate<TextArea> = textInputTemplate();
