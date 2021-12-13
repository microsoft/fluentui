import { html, ref, slotted } from '@microsoft/fast-element';
import type { ViewTemplate } from '@microsoft/fast-element';
import {
  ElementDefinitionContext,
  endSlotTemplate,
  Search,
  SearchOptions,
  startSlotTemplate,
  whitespaceFilter,
} from '@microsoft/fast-foundation';

/**
 * @public
 */
export const searchTemplate: (context: ElementDefinitionContext, definition: SearchOptions) => ViewTemplate<Search> = (
  context: ElementDefinitionContext,
  definition: SearchOptions,
) => html`
  <template
    class="
            ${x => (x.readOnly ? 'readonly' : '')}
        "
  >
    <label
      part="label"
      for="control"
      class="${x => (x.defaultSlottedNodes && x.defaultSlottedNodes.length ? 'label' : 'label label__hidden')}"
    >
      <slot ${slotted({ property: 'defaultSlottedNodes', filter: whitespaceFilter })}></slot>
    </label>
    <div class="root" part="root" ${ref('root')}>
      ${startSlotTemplate(context, definition)}
      <div class="input-wrapper" part="input-wrapper">
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
          minlength="${x => x.minlength}"
          pattern="${x => x.pattern}"
          placeholder="${x => x.placeholder}"
          ?readonly="${x => x.readOnly}"
          ?required="${x => x.required}"
          size="${x => x.size}"
          ?spellcheck="${x => x.spellcheck}"
          :value="${x => x.value}"
          type="search"
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
        <slot name="close-button">
          <button
            class="clear-button ${x => (x.value ? '' : 'clear-button__hidden')}"
            part="clear-button"
            tabindex="-1"
            @click=${x => x.handleClearInput()}
          >
            <slot name="close-glyph">
              <svg width="9" height="9" viewBox="0 0 9 9" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M0.146447 0.146447C0.338683 -0.0478972 0.645911 -0.0270359 0.853553 0.146447L4.5 3.793L8.14645 0.146447C8.34171 -0.0488155 8.65829 -0.0488155 8.85355 0.146447C9.04882 0.341709 9.04882 0.658291 8.85355 0.853553L5.207 4.5L8.85355 8.14645C9.05934 8.35223 9.03129 8.67582 8.85355 8.85355C8.67582 9.03129 8.35409 9.02703 8.14645 8.85355L4.5 5.207L0.853553 8.85355C0.658291 9.04882 0.341709 9.04882 0.146447 8.85355C-0.0488155 8.65829 -0.0488155 8.34171 0.146447 8.14645L3.793 4.5L0.146447 0.853553C-0.0268697 0.680237 -0.0457894 0.34079 0.146447 0.146447Z"
                />
              </svg>
            </slot>
          </button>
        </slot>
      </div>
      ${endSlotTemplate(context, definition)}
    </div>
  </template>
`;
