export type { TabSlots, TabValue, TabBaseProps as TabProps } from '@fluentui/react-tabs';

import type { TabBaseState } from '@fluentui/react-tabs';

export type TabState = TabBaseState & {
  root: {
    /**
     * Present when the tab renders only an icon; omitted otherwise.
     */
    'data-icon-only'?: string;
    /**
     * Present when the tab is selected; omitted otherwise.
     */
    'data-selected'?: string;
    'data-disabled'?: string;
  };
};
