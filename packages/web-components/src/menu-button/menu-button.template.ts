import { html, ref, slotted } from '@microsoft/fast-element';
import { reflectAttributes } from '@microsoft/fast-foundation';
import type { Button } from '../button/button';

/* eslint-disable */
/**
 * TODO: Look to reuse the template where possible
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
    <slot name="end">
      <svg width="1em" height="1em" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <path
          d="M15.85 7.65c.2.2.2.5 0 .7l-5.46 5.49a.55.55 0 01-.78 0L4.15 8.35a.5.5 0 11.7-.7L10 12.8l5.15-5.16c.2-.2.5-.2.7 0z"
        ></path>
      </svg>
    </slot>
  </button>
`;
/* eslint-enable */
