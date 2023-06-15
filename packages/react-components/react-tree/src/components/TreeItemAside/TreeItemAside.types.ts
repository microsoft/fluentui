import { ButtonContextValue } from '@fluentui/react-button';
import type { ComponentProps, ComponentState, Slot } from '@fluentui/react-utilities';

export type TreeItemAsideSlots = {
  root: Slot<'div'>;
};

/**
 * TreeItemAside Props
 */
export type TreeItemAsideProps = ComponentProps<TreeItemAsideSlots> & {
  /**
   * boolean indicating if the aside content should behave as "actions"
   *
   * actionable elements are normally buttons, menus, or other focusable elements.
   * Those elements are only visibly available if the given tree item is currently active.
   */
  actions?: boolean;
  /**
   * Forces visibility of the aside content, even if they're actions
   */
  visible?: true;
};

/**
 * State used in rendering TreeItemAside
 */
export type TreeItemAsideState = ComponentState<TreeItemAsideSlots> & {
  actions: boolean;
  visible: boolean;
  buttonContextValue: ButtonContextValue;
};
