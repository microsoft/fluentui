import type * as React from 'react';
import type {
  Slot,
  ComponentProps,
  ComponentState,
  ExtractSlotProps,
  EventData,
  EventHandler,
} from '@fluentui/react-utilities';
import { ButtonContextValue } from '@fluentui/react-button';
import { Checkbox } from '@fluentui/react-checkbox';
import { Radio } from '@fluentui/react-radio';

export type TreeItemLayoutActionVisibilityChangeData = (
  | EventData<'mouseover' | 'mouseout', MouseEvent>
  | EventData<'focus' | 'blur', FocusEvent>
  | EventData<'blur', React.FocusEvent>
) & { visible: boolean };

export type TreeItemLayoutActionSlotProps = ExtractSlotProps<
  Slot<'div'> & {
    /**
     * Forces visibility of the aside/action content
     */
    visible?: boolean;
    onVisibilityChange?: EventHandler<TreeItemLayoutActionVisibilityChangeData>;
  }
>;

export type TreeItemLayoutSlots = {
  root: Slot<'div'>;
  /**
   * Content. Children of the root slot are automatically rendered here
   */
  main: NonNullable<Slot<'div'>>;
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
  /**
   * Aside content is normally used to render a badge or other non-actionable content
   * It is aria-hidden by default and is only meant to be used as visual aid.
   */
  aside?: Slot<'div'>;
  /**
   * Actionable elements are normally buttons, menus, or other focusable elements.
   * Those elements are only visibly available if the given tree item is currently active.
   *
   * `actions` and `aside` slots are positioned on the exact same spot,
   * so they won't be visible at the same time.
   * `aside` slot is visible by default meanwhile `actions` slot are only visible when the tree item is active.
   *
   * `actions` slot supports a `visible` prop to force visibility of the actions.
   */
  actions?: Slot<TreeItemLayoutActionSlotProps>;
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
