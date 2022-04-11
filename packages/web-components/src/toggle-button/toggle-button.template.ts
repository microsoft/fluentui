import { html, ref, slotted } from '@microsoft/fast-element';
import { reflectAttributes } from '@microsoft/fast-foundation';
import type { ToggleButton } from './toggle-button';

/**
 * The template for the {@link @microsoft/fast-foundation#(Button:class)} component.
 * @public
 */
export const buttonTemplate = html<ToggleButton>`
  <button
    class="base"
    part="base"
    ?autofocus="${x => x.autofocus}"
    ?disabled="${x => x.disabled}"
    tabindex="${x => (x.disabledFocusable ? '0' : !!x.tabIndex || void 0)}"
    aria-disabled="${x => (x.disabledFocusable === true ? 'true' : x.ariaDisabled)}"
    ${reflectAttributes(
      'form',
      'formaction',
      'formenctype',
      'formmethod',
      'formnovalidate',
      'formtarget',
      'name',
      'type',
      'value',
      'aria-atomic',
      'aria-busy',
      'aria-controls',
      'aria-current',
      'aria-describedby',
      'aria-details',
      'aria-errormessage',
      'aria-expanded',
      'aria-flowto',
      'aria-haspopup',
      'aria-hidden',
      'aria-invalid',
      'aria-keyshortcuts',
      'aria-label',
      'aria-labelledby',
      'aria-live',
      'aria-owns',
      'aria-pressed',
      'aria-relevant',
      'aria-roledescription',
    )}
    @keypress="${(x, c) => x.keypressHandler(c.event as KeyboardEvent)}"
    @click="${(x, c) => x.clickHandler(c.event as MouseEvent)}"
    ${ref('control')}
  >
    <slot name="start"></slot>
    <slot ${slotted('defaultSlottedContent')}></slot>
    <slot name="end"></slot>
  </button>
`;
