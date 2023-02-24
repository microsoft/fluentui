import { attr, booleanConverter } from '@microsoft/fast-element';
import { FASTTabs } from '@microsoft/fast-foundation';

/**
 * TabList extends FASTTabs and is used for constructing a fluent-tab-list custom html element.
 *
 * @class TabList component
 * @public
 */
export class TabList extends FASTTabs {
  /**
   * appearance - html attribute
   * @type {"subtle" | "transparent"}
   * @public
   * */
  @attr appearance?: 'subtle' | 'transparent';

  @attr disabled?: boolean;

  @attr size?: 'small' | 'medium' | 'large';

  @attr({ converter: booleanConverter })
  vertical?: boolean;
  verticalChanged() {
    if (this.vertical) {
      this.orientation = 'vertical';
    } else {
      this.orientation = 'horizontal';
    }
  }

  @attr({ attribute: 'reserve-selected-tab-space', converter: booleanConverter })
  reserveSelectedTabSpace?: boolean;

  @attr({ attribute: 'selected-value' })
  selectedValue?: unknown;

  @attr({ attribute: 'default-selected-value' })
  defaultSelectedValue?: unknown;
}
