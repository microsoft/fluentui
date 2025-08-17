import type { ComponentProps, ComponentState, Slot } from '@fluentui/react-utilities';
import { MenuGridCellProps } from './../MenuGridCell/MenuGridCell.types';

export type MenuGridRowSlots = {
  root: Slot<'div'>;

  /**
   * Icon slot rendered as cell before content cell
   */
  iconCell?: Slot<MenuGridCellProps>;

  /**
   * Component children are placed in this slot
   * Avoid using the `children` property in this slot in favour of Component children whenever possible
   */
  contentCell?: Slot<MenuGridCellProps>;

  /**
   * Additional descriptor to main content that creates a multiline layout
   */
  subText?: Slot<'span'>;

  /**
   * Second action slot rendered as cell after content cell
   */
  secondActionCell?: Slot<MenuGridCellProps>;

  /**
   * Third action slot rendered as cell after second action cell
   */
  thirdActionCell?: Slot<MenuGridCellProps>;
};

export type MenuGridRowProps = ComponentProps<Partial<MenuGridRowSlots>>;

export type MenuGridRowState = ComponentState<MenuGridRowSlots>;
