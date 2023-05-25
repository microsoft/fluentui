import type { ComponentProps, ComponentState, Slot } from '@fluentui/react-utilities';

export type TreeItemLayoutSlots = {
  root: Slot<'div'>;
  /**
   * Expand icon slot,
   * by default renders a chevron icon to indicate opening and closing
   */
  expandIcon?: Slot<'div'>;
  /**
   * Icon slot that renders right before main content
   */
  iconBefore?: Slot<'div'>;
  /**
   * Icon slot that renders right after main content
   */
  iconAfter?: Slot<'div'>;
};

/**
 * TreeItemLayout Props
 */
export type TreeItemLayoutProps = ComponentProps<Partial<TreeItemLayoutSlots>>;

/**
 * State used in rendering TreeItemLayout
 */
export type TreeItemLayoutState = ComponentState<TreeItemLayoutSlots>;
