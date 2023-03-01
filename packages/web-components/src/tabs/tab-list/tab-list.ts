import { attr, booleanConverter } from '@microsoft/fast-element';
import { FASTTabs } from '@microsoft/fast-foundation';

/**
 * TabList extends FASTTabs and is used for constructing a fluent-tab-list custom html element.
 *
 * @class TabList component
 * @public
 */
export class TabList extends FASTTabs {
  constructor() {
    super();
  }
  @attr appearance?: 'subtle' | 'transparent';

  @attr({ converter: booleanConverter })
  disabled?: boolean;

  disabledChanged() {
    const tabs = this.querySelectorAll('fluent-tab');
    if (this.disabled === true) {
      tabs.forEach(function (tab) {
        tab.setAttribute('disabled', 'true');
      });
      window.setTimeout(() => (this.showActiveIndicator = true));
    } else {
      tabs.forEach(function (tab) {
        if (tab.hasAttribute('disabled')) {
          tab.removeAttribute('disabled');
        }
      });
    }
    this.hideActiveIndicator = false;
  }

  @attr size?: 'small' | 'medium' | 'large';

  @attr({ attribute: 'reserve-selected-tab-space', converter: booleanConverter })
  reserveSelectedTabSpace?: boolean;
}
