import { attr, booleanConverter } from '@microsoft/fast-element';
import { FASTTabs } from '@microsoft/fast-foundation';

/**
 * TabList extends FASTTabs and is used for constructing a fluent-tab-list custom html element.
 *
 * @class TabList component
 * @public
 */
export class TabList extends FASTTabs {
  // TODO: add TSDOC comments for each class member
  @attr appearance?: 'subtle' | 'transparent';

  @attr({ converter: booleanConverter })
  disabled?: boolean;

  @attr size?: 'small' | 'medium' | 'large';

  @attr({ attribute: 'reserve-selected-tab-space', converter: booleanConverter })
  reserveSelectedTabSpace?: boolean;

  activeidChanged(oldValue: string, newValue: string) {
    super.activeidChanged(oldValue, newValue);
    console.log('active id changed', this.activeid);

    // onLoad register all tabs
    // [{id, x, y, width, height}]
  }

  tabsChanged(): void {
    super.tabsChanged();
    this.registerTabData();
  }

  private registerTabData() {
    const tabData = this.tabs.map(tab => {
      const rect = tab.getBoundingClientRect();
      return {
        id: tab.id,
        x: rect.x,
        y: rect.y,
        height: rect.height,
        width: rect.width,
      };
    });
    this.dataset.tabs = JSON.stringify(tabData);
  }

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

  // TODO: figure out a way to create an active indicator that spans the correct width.
}
