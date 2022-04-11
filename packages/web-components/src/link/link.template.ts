import { html, ref } from '@microsoft/fast-element';
import { reflectAttributes } from '@microsoft/fast-foundation';
import type { Link } from './link';

/**
 * The template for the link component.
 * @public
 */
export const linkTemplate = html<Link>`
  <a
    class="base"
    part="base"
    download="${x => x.download}"
    tabindex="${x => (x.disabledFocusable ? '0' : x.disabled ? '-1' : !!x.tabIndex || void 0)}"
    aria-disabled="${x => x.disabled || x.disabledFocusable || x.ariaDisabled}"
    ${reflectAttributes(
      'href',
      'hreflang',
      'ping',
      'referrerpolicy',
      'rel',
      'target',
      'type',
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
      'aria-relevant',
      'aria-roledescription',
    )}
    @click="${(x, c) => x.handleDisabledClick(c.event as MouseEvent)}"
    @keydown="${(x, c) => x.handleDisabledKeydown(c.event as KeyboardEvent)}"
    ${ref('control')}
  >
    <slot></slot>
  </a>
`;
