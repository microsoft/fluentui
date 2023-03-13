import { attr, booleanConverter } from '@microsoft/fast-element';
import { FASTTabs } from '@microsoft/fast-foundation';

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
export class TabList extends FASTTabs {
  @attr appearance?: 'subtle' | 'transparent';

  @attr({ converter: booleanConverter })
  disabled?: boolean;

  @attr size?: 'small' | 'medium' | 'large' = 'medium';

  @attr({ attribute: 'reserve-selected-tab-space', converter: booleanConverter })
  reserveSelectedTabSpace?: boolean;

  activeidChanged(oldValue: string, newValue: string) {
    super.activeidChanged(oldValue, newValue);
    this.setTabData();
  }

  tabsChanged(): void {
    super.tabsChanged();
    this.setTabData();
  }

  private setTabData(): void {
    if (this.tabs && this.tabs.length > 0 && this.activeid) {
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
        });
      });
    }
  }

  // Remove this method after updates to Fast Tabs Control are completed
  disabledChanged() {
    const tabs = this.querySelectorAll('fluent-tab');

    if (this.disabled === true) {
      tabs.forEach(function (tab, index) {
        tab.setAttribute('disabled', 'true');
      });

      /* 
      after setting all tabs to disabled the FAST tabs control 
      sets showActiveIndicator to false. Fluent guidelines have the tab indicator always showing if the tab is active.
      This setTimeout is not good code, but runs after the FAST control sets showActiveIndicator to false
      */
      setTimeout(() => {
        this.showActiveIndicator = true;
        tabs[0].ariaSelected = 'true';
      }, 1);
    } else {
      tabs.forEach(function (tab) {
        if (tab.hasAttribute('disabled')) {
          tab.removeAttribute('disabled');
        }
      });
    }
  }
}
