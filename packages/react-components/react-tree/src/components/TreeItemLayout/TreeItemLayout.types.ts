import type { ComponentProps, ComponentState, Slot } from '@fluentui/react-utilities';

export type TreeItemLayoutSlots = {
  root: Slot<'div'>;
};

/**
 * TreeItemLayout Props
 */
export type TreeItemLayoutProps = ComponentProps<TreeItemLayoutSlots>;

/**
 * State used in rendering TreeItemLayout
 */
export type TreeItemLayoutState = ComponentState<TreeItemLayoutSlots>;
