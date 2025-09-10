import { type ElementViewTemplate, html, ref, slotted } from '@microsoft/fast-element';
import type { TextArea } from './textarea.js';

/**
 * Generates a template for the TextArea component.
 *
 * @public
 */
export function textAreaTemplate<T extends TextArea>(): ElementViewTemplate<T> {
  return html<T>`
    <template>
      <label ${ref('labelEl')} for="control" part="label">
        <slot name="label" ${slotted('labelSlottedNodes')}></slot>
      </label>
      <div class="root" part="root">
        <textarea
          ${ref('controlEl')}
          id="control"
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
      </div>
      <div hidden>
        <slot ${slotted('defaultSlottedNodes')}></slot>
      </div>
    </template>
  `;
}

/**
 * @internal
 */
export const template: ElementViewTemplate<TextArea> = textAreaTemplate();
