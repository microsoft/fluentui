import { attr } from '@microsoft/fast-element';
import { FASTTabs } from '@microsoft/fast-foundation';
import { TabData, TabListAppearance, TabListSize } from './tabs.options.js';

/**
 * TabList extends FASTTabs and is used for constructing a fluent-tab-list custom html element.
 *
 * @class TabList component
 * @public
 */
export class Tabs extends FASTTabs {
  @attr
  public appearance?: TabListAppearance = TabListAppearance.transparent;

  @attr({ mode: 'boolean' })
  public disabled?: boolean;

  @attr
  public size?: TabListSize = 'medium';

  @attr({ attribute: 'reserve-selected-tab-space', mode: 'boolean' })
  public reserveSelectedTabSpace?: boolean;

  public activeidChanged(oldValue: string, newValue: string) {
    super.activeidChanged(oldValue, newValue);
    this.setTabData();
  }

  public tabsChanged(): void {
    super.tabsChanged();
    this.setTabData();
  }

  private setTabData(): void {
    if (this.tabs && this.tabs.length > 0) {
      const activeTab = this.tabs.filter(tab => tab.id === this.activeid)[0] || this.tabs[0];
      const activeRect = activeTab?.getBoundingClientRect();
      const parentRect = this.getBoundingClientRect();

      this.tabs.forEach(tab => {
        tab.dataset.activeTab = JSON.stringify({
          id: activeTab.id,
          x: activeRect.x - parentRect.x,
          y: activeRect.y - parentRect.y,
          height: activeRect.height,
          width: activeRect.width,
        } as TabData);
      });
    }
  }
}
