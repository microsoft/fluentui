import type { ComponentProps, ComponentState, Slot } from '@fluentui/react-utilities';

export type NavCategoryItemSlots = {
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

/**
 * Any value that identifies a specific CategoryItem.
 */
export type NavCategoryItemValue = unknown;

/**
 * navCategoryItem Props
 */
export type NavCategoryItemProps = ComponentProps<Partial<NavCategoryItemSlots>> & {
  /**
   * The value that identifies this navCategoryItem when selected.
   */
  value: NavCategoryItemValue;
};

/**
 * State used in rendering NavCategoryItem
 */
export type NavCategoryItemState = ComponentState<NavCategoryItemSlots> &
  Pick<NavCategoryItemProps, 'value'> & {
    /**
     * If this navCategoryItem is selected
     */
    selected: boolean;
  };
