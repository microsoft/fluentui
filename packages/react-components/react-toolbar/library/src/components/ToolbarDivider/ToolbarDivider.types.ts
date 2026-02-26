import type { ComponentProps, ComponentState } from '@fluentui/react-utilities';
import type { DividerSlots, DividerState } from '@fluentui/react-divider';

/**
 * ToolbarDivider Props
 */
export type ToolbarDividerProps = ComponentProps<Partial<DividerSlots>> & {
  /**
   * A divider can be horizontal or vertical (default).
   *
   * @default true
   */
  vertical?: boolean;
};

export type ToolbarDividerBaseProps = ToolbarDividerProps;

/**
 * State used in rendering ToolbarDivider
 */
export type ToolbarDividerState = ComponentState<Partial<DividerSlots>> & DividerState;

export type ToolbarDividerBaseState = Omit<ToolbarDividerState, 'appearance'>;
