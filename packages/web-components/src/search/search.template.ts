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
        <slot name="clear-button">
          <button
            class="clear-button ${x => (x.value ? '' : 'clear-button__hidden')}"
            part="clear-button"
            tabindex="-1"
            @click=${x => x.handleClearInput()}
          >
            <slot name="clear-glyph">
              <svg width="12" height="12" viewBox="0 0 12 12" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="m2.09 2.22.06-.07a.5.5 0 0 1 .63-.06l.07.06L6 5.29l3.15-3.14a.5.5 0 1 1 .7.7L6.71 6l3.14 3.15c.18.17.2.44.06.63l-.06.07a.5.5 0 0 1-.63.06l-.07-.06L6 6.71 2.85 9.85a.5.5 0 0 1-.7-.7L5.29 6 2.15 2.85a.5.5 0 0 1-.06-.63l.06-.07-.06.07Z"
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
