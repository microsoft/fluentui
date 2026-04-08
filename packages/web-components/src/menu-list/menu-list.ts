import { Updates } from '@microsoft/fast-element';
import { polyfill as focusgroupPolyfill } from '@microsoft/focusgroup-polyfill';
import { BaseMenuList } from './menu-list.base.js';

/**
 * A Menu List Custom HTML Element.
 * Implements the {@link https://www.w3.org/TR/wai-aria-1.1/#menu | ARIA menu }.
 *
 * @tag fluent-menu-list
 *
 * @slot - The default slot for the menu items
 *
 * @public
 */
export class MenuList extends BaseMenuList {
  /** @internal */
  public connectedCallback() {
    super.connectedCallback();

    Updates.enqueue(() => {
      focusgroupPolyfill(this);
    });
  }
}
