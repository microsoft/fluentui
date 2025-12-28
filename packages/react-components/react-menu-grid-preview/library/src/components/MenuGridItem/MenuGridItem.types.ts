import type { ComponentProps, ComponentState, Slot } from '@fluentui/react-utilities';
import { MenuGridCellProps } from './../MenuGridCell/MenuGridCell.types';
import { MenuGridRowProps } from './../MenuGridRow/MenuGridRow.types';

export type MenuGridItemSlots = {
  root: Slot<MenuGridRowProps>;

  /**
   * Icon slot rendered as cell before content cell
   */
  icon?: Slot<MenuGridCellProps>;

  /**
   * Component children are placed in this slot
   * Avoid using the `children` property in this slot in favour of Component children whenever possible
   */
  content?: Slot<MenuGridCellProps>;

  /**
   * Additional descriptor to main content that creates a multiline layout
   */
  subText?: Slot<'span'>;

  /**
   * Firstd sub-action slot rendered as cell after content cell
   */
  firstSubAction?: Slot<MenuGridCellProps>;

  /**
   * Second sub-action slot rendered as cell after first sub-action cell
   */
  secondSubAction?: Slot<MenuGridCellProps>;
};

export type MenuGridItemProps = ComponentProps<Partial<MenuGridItemSlots>>;

export type MenuGridItemState = ComponentState<MenuGridItemSlots>;
