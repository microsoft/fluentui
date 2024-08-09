import type { ComponentProps, ComponentState, Slot } from '@fluentui/react-utilities';
import type { TabSlots, TabInternalProps, TabInternalSlots, TabInternalState } from '../Tab';

export type InteractiveTabSlots = {
  /**
   * Root of the component.
   */
  root: NonNullable<Slot<'div'>>;

  /**
   * The button that represents the tab.
   * This is the element that will be focused when the tab is selected.
   **/
  button: NonNullable<TabSlots['root']>;

  /**
   * Element before the button, within the tab
   **/
  contentBefore?: Slot<'span'>;

  /**
   * Element after the button, within the tab
   **/
  contentAfter?: Slot<'span'>;
} & Omit<TabSlots, 'root'>;

export type InteractiveTabProps = ComponentProps<Partial<InteractiveTabSlots>, 'button'> & TabInternalProps;

export type InteractiveTabInternalSlots = InteractiveTabSlots & Omit<TabInternalSlots, 'root'>;

/**
 * State used in rendering InteractiveTab
 */
export type InteractiveTabState = ComponentState<InteractiveTabInternalSlots> &
  Pick<InteractiveTabProps, 'value'> &
  Required<Pick<InteractiveTabProps, 'disabled'>> &
  TabInternalState;
