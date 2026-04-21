import { attr } from '@microsoft/fast-element';
import type { FocusGroupItemCollection } from '@microsoft/focusgroup-polyfill/focusgroup-items.js';
import { FocusGroup } from '@microsoft/focusgroup-polyfill/focusgroup-shadowless.js';
import type { Tab } from '../tab/tab.js';
import { isTab } from '../tab/tab.options.js';
import { ItemCollection } from '../utils/focusgroup.js';
import { waitForConnectedDescendants } from '../utils/request-idle-callback.js';
import { BaseTablist } from './tablist.base.js';
import { TablistAppearance, type TablistSize } from './tablist.options.js';

/**
 * A Tablist component.
 *
 * @tag fluent-tablist
 *
 * @public
 */
export class Tablist extends BaseTablist {
  /**
   * appearance
   * There are two modes of appearance: transparent and subtle.
   */
  @attr
  public appearance?: TablistAppearance = TablistAppearance.transparent;

  /**
   * size
   * defaults to medium.
   * Used to set the size of all the tab controls, which effects text size and margins. Three sizes: small, medium and large.
   */
  @attr
  public size?: TablistSize;

  private fg!: FocusGroup;

  private fgItems!: FocusGroupItemCollection;

  connectedCallback() {
    super.connectedCallback();

    waitForConnectedDescendants(this, () => {
      this.fg = new FocusGroup(this, this.fgItems);
    });
  }

  disconnectedCallback() {
    this.fg?.disconnect();
    super.disconnectedCallback();
  }

  override tabsChanged(prev: Tab[] | undefined, next: Tab[] | undefined): void {
    super.tabsChanged(prev, next);

    this.fgItems ??= new ItemCollection(this, el => isTab(el) && !el.disabled);
    this.fg?.update();
  }
}
