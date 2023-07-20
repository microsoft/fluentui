import type { ComponentProps, ComponentState, Slot } from '@fluentui/react-utilities';
import { ButtonContextValue } from '@fluentui/react-button';
import { TreeItemSlotsContextValue } from '../../contexts/treeItemSlotsContext';

export type TreeItemLayoutSlots = {
  root: Slot<'div'>;
  /**
   * Content. Children of the root slot are automatically rendered here
   */
  content: NonNullable<Slot<'div'>>;
  /**
   * Icon slot that renders right before main content
   */
  iconBefore?: Slot<'div'>;
  /**
   * Icon slot that renders right after main content
   */
  iconAfter?: Slot<'div'>;
};

export type TreeItemLayoutInternalSlots = TreeItemLayoutSlots & TreeItemSlotsContextValue;

/**
 * TreeItemLayout Props
 */
export type TreeItemLayoutProps = ComponentProps<Partial<TreeItemLayoutSlots>>;

/**
 * State used in rendering TreeItemLayout
 */
export type TreeItemLayoutState = ComponentState<TreeItemLayoutInternalSlots> & {
  buttonContextValue: ButtonContextValue;
};
