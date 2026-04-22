import { attr } from '@microsoft/fast-element';
import { FocusGroup } from '@microsoft/focusgroup-polyfill/shadowless';
import type { Tab } from '../tab/tab.js';
import { ArrayItemCollection } from '../utils/focusgroup.js';
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

  private fg?: FocusGroup;

  private fgItems?: ArrayItemCollection<Tab>;

  disconnectedCallback() {
    this.fg?.disconnect();
    super.disconnectedCallback();
  }

  override tabsChanged(prev: Tab[] | undefined, next: Tab[] | undefined): void {
    super.tabsChanged(prev, next);

    this.fgItems ??= new ArrayItemCollection<Tab>(
      () => this.tabs?.filter(t => !t.disabled && !t.hidden) ?? [],
      () => this.activetab ?? null,
    );
    if (!this.fg) {
      this.fg = new FocusGroup(this, this.fgItems, {
        definition: {
          behavior: 'tablist',
          axis: undefined,
          memory: false,
          wrap: true,
        },
      });
    } else {
      this.fg.update();
    }
  }
}
