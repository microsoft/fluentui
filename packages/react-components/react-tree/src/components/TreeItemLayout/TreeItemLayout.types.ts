import type { ComponentProps, ComponentState, Slot } from '@fluentui/react-utilities';
import { ButtonContextValue } from '@fluentui/react-button';
import { TreeItemSlots } from '../TreeItem/TreeItem.types';

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

export type TreeItemLayoutInternalSlots = TreeItemLayoutSlots & Pick<TreeItemSlots, 'actions' | 'aside' | 'expandIcon'>;

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
