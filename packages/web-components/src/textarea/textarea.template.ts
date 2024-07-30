import { ElementViewTemplate, html, ref } from '@microsoft/fast-element';
import type { TextArea } from './textarea.js';

/**
 * Generates a template for the TextArea component.
 *
 * @public
 */
export function textAreaTemplate<T extends TextArea>(): ElementViewTemplate<T> {
  return html<T>`
    <template>
      <textarea
        ${ref('controlEl')}
        class="control"
        part="control"
        ?required="${x => x.required}"
        ?disabled="${x => x.disabled}"
        ?readonly="${x => x.readOnly}"
        ?spellcheck="${x => x.spellcheck}"
        autocomplete="${x => x.autocomplete}"
        maxlength="${x => x.maxLength}"
        minlength="${x => x.minLength}"
        placeholder="${x => x.placeholder}"
        @change="${x => x.handleControlChange()}"
        @select="${x => x.handleControlSelect()}"
        @input="${x => x.handleControlInput()}"
      ></textarea>
    </template>
  `;
}

/**
 * @internal
 */
export const template: ElementViewTemplate<TextArea> = textAreaTemplate();
