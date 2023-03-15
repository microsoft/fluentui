import { attr } from '@microsoft/fast-element';
import { FASTTabs } from '@microsoft/fast-foundation';
import { Tab } from '../index.js';
import { TabsAppearance, TabsSize } from './tabs.options.js';

export interface TabData {
  id: string;
  x: number;
  y: number;
  height: number;
  width: number;
}

/**
 * TabList extends FASTTabs and is used for constructing a fluent-tab-list custom html element.
 *
 * @class TabList component
 * @public
 */
export class Tabs extends FASTTabs {
  @attr
  public appearance?: TabsAppearance = TabsAppearance.transparent;

  @attr({ mode: 'boolean' })
  public disabled?: boolean;

  @attr
  public size?: TabsSize = 'medium';

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
      const tabs = this.tabs as Tab[];
      const activeTab = tabs.filter(tab => tab.id === this.activeid)[0] || this.tabs[0];
      const activeRect = activeTab?.getBoundingClientRect();
      const parentRect = this.getBoundingClientRect();

      const activeTabData = {
        id: activeTab.id,
        x: activeRect.x - parentRect.x,
        y: activeRect.y - parentRect.y,
        height: activeRect.height,
        width: activeRect.width,
      } as TabData;

      tabs.forEach((tab: Tab) => {
        tab.activeTab = activeTabData;
        tab.isHorizontal = this.orientation === 'horizontal';
        tab.parentX = this.getBoundingClientRect().x;
        tab.parentY = this.getBoundingClientRect().y;
        if (!tab.previousActiveTab) {
          tab.previousActiveTab = activeTabData;
        }
      });
    }
  }
}
