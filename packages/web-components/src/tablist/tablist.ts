import { attr } from '@microsoft/fast-element';
import { FocusGroup } from '@microsoft/focusgroup-polyfill/focusgroup.js';
import { type FocusGroupItemCollection, FocusGroupMutateEvent } from '@microsoft/focusgroup-polyfill/shadowless';
import type { Tab } from '../tab/tab.js';
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

  /** @private */
  fg!: FocusGroup;

  /** @private */
  fgItems!: FocusGroupItemCollection;

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

    if (!this.fgItems && this.tabs?.length) {
      this.fgItems = new ItemCollection({ owner: this, list: this.tabs });
    }

    // if (prev && next) {
    // 	const removedNodes = prev?.filter((tab) => !next?.includes(tab)) ?? [];
    // 	console.log(removedNodes);
    // 	if (removedNodes.length) {
    // 		this.fgItems.dispatchEvent(
    // 			new FocusGroupMutateEvent({
    // 				removedNodes,
    // 			}),
    // 		);
    // 	}
    // }
  }
}
