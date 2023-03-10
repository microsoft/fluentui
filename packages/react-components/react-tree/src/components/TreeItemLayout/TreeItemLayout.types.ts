import type { ComponentProps, ComponentState, Slot } from '@fluentui/react-utilities';
import { TreeItemContextValue } from '../../contexts/treeItemContext';

export type TreeItemLayoutSlots = {
  root: Slot<'div'>;
  /**
   * Icon slot that renders right before main content
   */
  iconBefore?: Slot<'span'>;
  /**
   * Icon slot that renders right after main content
   */
  iconAfter?: Slot<'span'>;
  aside?: Slot<'span'>;
};

/**
 * TreeItemLayout Props
 */
export type TreeItemLayoutProps = ComponentProps<Partial<TreeItemLayoutSlots>>;

/**
 * State used in rendering TreeItemLayout
 */
export type TreeItemLayoutState = ComponentState<TreeItemLayoutSlots> & TreeItemContextValue;
