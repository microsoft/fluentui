import type { ElementViewTemplate } from '@microsoft/fast-element';
import { html, ref, slotted } from '@microsoft/fast-element';
import { endSlotTemplate, startSlotTemplate } from '../patterns/index.js';
import { whitespaceFilter } from '../utils/index.js';
import type { TextInput } from './text-input.js';
import type { TextInputOptions } from './text-input.options.js';

/**
 * Generates a template for the TextInput component.
 *
 * @public
 */
export function textInputTemplate<T extends TextInput>(options: TextInputOptions = {}): ElementViewTemplate<T> {
  return html<T>`
    <template
      @beforeinput="${(x, c) => x.beforeinputHandler(c.event as InputEvent)}"
      @focusin="${(x, c) => x.focusinHandler(c.event as FocusEvent)}"
      @keydown="${(x, c) => x.keydownHandler(c.event as KeyboardEvent)}"
    >
      <label part="label" for="control" class="label" ${ref('controlLabel')}>
        <slot
          ${slotted({
            property: 'defaultSlottedNodes',
            filter: whitespaceFilter,
          })}
        ></slot>
      </label>
      <div class="root" part="root">
        ${startSlotTemplate(options)}
        <input
          class="control"
          part="control"
          id="control"
          @change="${(x, c) => x.changeHandler(c.event as InputEvent)}"
          @input="${(x, c) => x.inputHandler(c.event as InputEvent)}"
          ?autofocus="${x => x.autofocus}"
          autocomplete="${x => x.autocomplete}"
          ?disabled="${x => x.disabled}"
          list="${x => x.list}"
          maxlength="${x => x.maxlength}"
          minlength="${x => x.minlength}"
          ?multiple="${x => x.multiple}"
          name="${x => x.name}"
          pattern="${x => x.pattern}"
          placeholder="${x => x.placeholder}"
          ?readonly="${x => x.readOnly}"
          ?required="${x => x.required}"
          size="${x => x.size}"
          spellcheck="${x => x.spellcheck}"
          type="${x => x.type}"
          value="${x => x.initialValue}"
          ${ref('control')}
        />
        ${endSlotTemplate(options)}
      </div>
    </template>
  `;
}

/**
 * @internal
 */
export const template: ElementViewTemplate<TextInput> = textInputTemplate();
