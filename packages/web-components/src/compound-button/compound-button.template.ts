import { html, ref } from '@microsoft/fast-element';
import { reflectAttributes } from '@microsoft/fast-foundation';
import type { CompoundButton } from './compound-button';

/**
 * The template for the Compound Button component.
 * @public
 */
export const compoundButtonTemplate = html<CompoundButton>`
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
    ${ref('control')}
  >
    <slot name="start"></slot>
    <span class="content" part="content">
      <slot></slot>
      <slot name="description"></slot>
    </span>
    <slot name="end"></slot>
  </button>
`;
