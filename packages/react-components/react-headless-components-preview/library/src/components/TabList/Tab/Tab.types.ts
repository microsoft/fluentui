export type { TabSlots, TabValue } from '@fluentui/react-tabs';

import type { TabBaseProps, TabBaseState } from '@fluentui/react-tabs';

export type TabProps = TabBaseProps;

export type TabState = TabBaseState & {
  root: {
    focusgroupstart?: string;
    'data-icon-only'?: '';
    'data-selected'?: '';
  };
};
