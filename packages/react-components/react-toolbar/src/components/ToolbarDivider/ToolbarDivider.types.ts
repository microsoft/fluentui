import type { ComponentProps, ComponentState } from '@fluentui/react-utilities';
import { DividerSlots, DividerState } from '@fluentui/react-divider';

/**
 * ToolbarDivider Props
 */
export type ToolbarDividerProps = ComponentProps<Partial<DividerSlots>>;

/**
 * State used in rendering ToolbarDivider
 */
export type ToolbarDividerState = ComponentState<Partial<DividerSlots>> & DividerState;
