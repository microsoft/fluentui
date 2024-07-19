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
      <div ${ref('placeholderContainer')} class="placeholder" part="placeholder" style="${x => x.sizeStyles}">
        ${x => x.placeholder}
      </div>
      <div
        ${ref('textbox')}
        class="textbox"
        part="textbox"
        style="${x => x.sizeStyles}"
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
