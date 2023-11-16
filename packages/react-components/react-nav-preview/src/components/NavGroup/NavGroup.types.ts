import type { ComponentProps, ComponentState, Slot } from '@fluentui/react-utilities';
import { NavGroupValue } from '../NavContext.types';

export type NavGroupSlots = {
  /**
   * Root of the component.
   */
  root: Slot<'button'>;

  /**
   * Icon that renders before the content.
   */
  icon?: Slot<'span'>;

  /**
   * Component children are placed in this slot
   * Avoid using the `children` property in this slot in favour of Component children whenever possible.
   */
  content: NonNullable<Slot<'span'>>;

  // TODO: build out
  // Size: 'small' | 'medium' | 'large';
};

export type NavGroupInternalSlots = NavGroupSlots & {
  contentReservedSpace?: Slot<'span'>;
};

/**
 * Tab Props
 */
export type NavGroupProps = ComponentProps<Partial<NavGroupSlots>> & {
  /**
   * The value that identifies this tab when selected.
   */
  value: NavGroupValue;
};

/**
 * State used in rendering Tab
 */
export type NavGroupState = ComponentState<NavGroupInternalSlots> &
  Pick<NavGroupProps, 'value'> & {
    /**
     * If this tab is selected
     */
    selected: boolean;
  };
