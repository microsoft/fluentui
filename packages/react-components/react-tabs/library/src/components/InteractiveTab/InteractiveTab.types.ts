import type { ComponentProps, ComponentState, Slot } from '@fluentui/react-utilities';
import type { TabSlots, TabInternalProps, TabInternalState } from '../Tab/Tab.types';

export type InteractiveTabSlots = {
  /**
   * Root of the component.
   */
  root: Slot<'div'>;

  /**
   * button
   */
  button: NonNullable<TabSlots['root']>;

  contentBefore?: Slot<'span'>;

  contentAfter?: Slot<'span'>;
} & Omit<TabSlots, 'root'>;

export type InteractiveTabProps = Omit<ComponentProps<Partial<InteractiveTabSlots>, 'button'>, 'content'> &
  Pick<Partial<InteractiveTabSlots>, 'content'> &
  TabInternalProps;

export type InteractiveTabInternalSlots = InteractiveTabSlots & {
  contentReservedSpace?: Slot<'span'>;
};

/**
 * State used in rendering InteractiveTab
 */
export type InteractiveTabState = ComponentState<InteractiveTabInternalSlots> &
  Pick<InteractiveTabProps, 'value'> &
  Required<Pick<InteractiveTabProps, 'disabled'>> &
  TabInternalState;
