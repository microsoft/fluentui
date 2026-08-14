export type { TabSlots, TabValue } from '@fluentui/react-tabs';

import type { TabBaseProps, TabBaseState } from '@fluentui/react-tabs';

export type TabProps = TabBaseProps;

export type TabState = TabBaseState & {
  root: {
    'data-icon-only'?: string;
    'data-selected'?: string;
    'data-disabled'?: string;
  };
};
