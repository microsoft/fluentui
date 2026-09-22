import type {
  TabProps as TabBaseProps,
  TabState as TabBaseState,
} from '@fluentui/react-headless-components-preview/tab-list';
import type { TabListAppearance, TabListSize } from '../TabList/TabList.types';

export type { TabSlots, TabValue } from '@fluentui/react-headless-components-preview/tab-list';

export type TabProps = TabBaseProps;

export type TabState = TabBaseState & {
  appearance: TabListAppearance;
  size: TabListSize;
  contentReservedSpace?: TabBaseState['content'];
  components: TabBaseState['components'] & {
    contentReservedSpace: 'span';
  };
  root: TabBaseState['root'] & {
    'data-animate-indicator'?: string;
    'data-appearance': TabListAppearance;
    'data-orientation': 'horizontal' | 'vertical';
    'data-size': TabListSize;
  };
};
