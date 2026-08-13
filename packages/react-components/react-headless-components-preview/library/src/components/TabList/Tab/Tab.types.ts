export type { TabSlots, TabValue, TabBaseProps as TabProps } from '@fluentui/react-tabs';

import type { TabBaseState } from '@fluentui/react-tabs';

export type TabState = TabBaseState & {
  root: {
    focusgroupstart?: string;
    'data-icon-only'?: string;
    'data-selected'?: string;
    'data-disabled'?: string;
  };
};
