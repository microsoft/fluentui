import { attr, booleanConverter } from '@microsoft/fast-element';
import { FASTTabs } from '@microsoft/fast-foundation';

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

  @attr size?: 'small' | 'medium' | 'large';

  @attr({ attribute: 'reserve-selected-tab-space', converter: booleanConverter })
  reserveSelectedTabSpace?: boolean;
}
