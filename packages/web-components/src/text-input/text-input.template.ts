import { ElementViewTemplate, html, ref, slotted } from '@microsoft/fast-element';
import { endSlotTemplate, startSlotTemplate } from '../patterns/index.js';
import { whitespaceFilter } from '../utils/index.js';
import type { TextFieldOptions, TextInput } from './text-input.js';

export function textFieldTemplate<T extends TextInput>(options: TextFieldOptions = {}): ElementViewTemplate<T> {
  return html<T>`
    <label
      part="label"
      for="control"
      class="${x => (x.defaultSlottedNodes && x.defaultSlottedNodes.length ? 'label' : 'label label__hidden')}"
    >
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
        @input="${x => x.handleTextInput()}"
        @change="${x => x.handleChange()}"
        ?autofocus="${x => x.autofocus}"
        ?disabled="${x => x.disabled}"
        list="${x => x.list}"
        maxlength="${x => x.maxlength}"
        name="${x => x.name}"
        minlength="${x => x.minlength}"
        pattern="${x => x.pattern}"
        placeholder="${x => x.placeholder}"
        ?readonly="${x => x.readOnly}"
        ?required="${x => x.required}"
        size="${x => x.size}"
        ?spellcheck="${x => x.spellcheck}"
        :value="${x => x.value}"
        type="${x => x.type}"
        aria-atomic="${x => x.ariaAtomic}"
        aria-busy="${x => x.ariaBusy}"
        aria-controls="${x => x.ariaControls}"
        aria-current="${x => x.ariaCurrent}"
        aria-describedby="${x => x.ariaDescribedby}"
        aria-details="${x => x.ariaDetails}"
        aria-disabled="${x => x.ariaDisabled}"
        aria-errormessage="${x => x.ariaErrormessage}"
        aria-flowto="${x => x.ariaFlowto}"
        aria-haspopup="${x => x.ariaHaspopup}"
        aria-hidden="${x => x.ariaHidden}"
        aria-invalid="${x => x.ariaInvalid}"
        aria-keyshortcuts="${x => x.ariaKeyshortcuts}"
        aria-label="${x => x.ariaLabel}"
        aria-labelledby="${x => x.ariaLabelledby}"
        aria-live="${x => x.ariaLive}"
        aria-owns="${x => x.ariaOwns}"
        aria-relevant="${x => x.ariaRelevant}"
        aria-roledescription="${x => x.ariaRoledescription}"
        ${ref('control')}
      />
      ${endSlotTemplate(options)}
    </div>
  `;
}

/**
 * @internal
 */
export const template: ElementViewTemplate<TextInput> = textFieldTemplate();
