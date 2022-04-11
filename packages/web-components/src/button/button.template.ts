import { html, ref, slotted } from '@microsoft/fast-element';
import { reflectAttributes } from '@microsoft/fast-foundation';
import type { Button } from './button';

/**
 * The template for the {@link @microsoft/fast-foundation#(Button:class)} component.
 * @public
 */
export const buttonTemplate = html<Button>`
  <button
    class="base"
    part="base"
    ?autofocus="${x => x.autofocus}"
    ?disabled="${x => x.disabled}"
    tabindex="${x => (x.disabledFocusable ? '0' : void 0)}"
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
    ${ref('control')}
  >
    <slot name="start"></slot>
    <slot ${slotted('defaultSlottedContent')}></slot>
    <slot name="end"></slot>
  </button>
`;
