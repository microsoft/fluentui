import type { ComponentProps, ComponentState, ExtractSlotProps, Slot } from '@fluentui/react-utilities';
import { ButtonContextValue } from '@fluentui/react-button';
import { Checkbox } from '@fluentui/react-checkbox';
import { Radio } from '@fluentui/react-radio';

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
  /**
   * Expand icon slot,
   * by default renders a chevron icon to indicate opening and closing
   */
  expandIcon?: Slot<'div'>;
  aside?: Slot<'div'>;
  /**
   * actionable elements are normally buttons, menus, or other focusable elements.
   * Those elements are only visibly available if the given tree item is currently active.
   */
  actions?: Slot<
    ExtractSlotProps<
      Slot<'div'> & {
        /**
         * Forces visibility of the aside/action content
         */
        visible?: boolean;
      }
    >
  >;
  selector?: Slot<typeof Checkbox> | Slot<typeof Radio>;
};

/**
 * TreeItemLayout Props
 */
export type TreeItemLayoutProps = ComponentProps<Partial<TreeItemLayoutSlots>>;

/**
 * State used in rendering TreeItemLayout
 */
export type TreeItemLayoutState = ComponentState<TreeItemLayoutSlots> & {
  buttonContextValue: ButtonContextValue;
};
