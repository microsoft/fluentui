import type { ComponentProps, ComponentState, Slot } from '@fluentui/react-utilities';

export type NavGroupSlots = {
  /**
   * Root of the component.
   */
  root: Slot<'button'>;

  // TODO - light this up when we get design spec
  // /**
  //  * Icon that renders before the content.
  //  */
  // icon?: Slot<'span'>;

  /**
   * Component children are placed in this slot
   * Avoid using the `children` property in this slot in favour of Component children whenever possible.
   */
  content: NonNullable<Slot<'span'>>;
};

export type NavGroupInternalSlots = NavGroupSlots & {
  contentReservedSpace?: Slot<'span'>;
};

/**
 * Any value that identifies a specific navGroup.
 */
export type NavGroupValue = unknown;

/**
 * navGroup Props
 */
export type NavGroupProps = ComponentProps<Partial<NavGroupSlots>> & {
  /**
   * The value that identifies this navGroup when selected.
   */
  value: NavGroupValue;
};

/**
 * State used in rendering NavGroup
 */
export type NavGroupState = ComponentState<NavGroupInternalSlots> &
  Pick<NavGroupProps, 'value'> & {
    /**
     * If this navGroup is selected
     */
    selected: boolean;
  };
