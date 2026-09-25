import type {
  TabListProps as TabListBaseProps,
  TabListState as TabListBaseState,
} from '@fluentui/react-headless-components-preview/tab-list';

export type { TabListSlots } from '@fluentui/react-headless-components-preview/tab-list';

export type TabListAppearance = 'transparent' | 'subtle' | 'subtle-circular' | 'filled-circular';
export type TabListSize = 'small' | 'medium' | 'large';

export type TabListProps = TabListBaseProps & {
  /** The visual appearance applied to each contained tab. */
  appearance?: TabListAppearance;

  /** Keeps tab labels the same width between selected and unselected states. */
  reserveSelectedTabSpace?: boolean;

  /** The size applied to each contained tab. */
  size?: TabListSize;
};

export type TabListState = TabListBaseState &
  Required<Pick<TabListProps, 'appearance' | 'reserveSelectedTabSpace' | 'size'>> & {
    root: TabListBaseState['root'] & {
      'data-appearance': TabListAppearance;
      'data-size': TabListSize;
    };
  };

export type TabListVisualContextValue = Required<
  Pick<TabListProps, 'appearance' | 'reserveSelectedTabSpace' | 'size'>
> &
  Pick<TabListState, 'getRegisteredTabs'>;
