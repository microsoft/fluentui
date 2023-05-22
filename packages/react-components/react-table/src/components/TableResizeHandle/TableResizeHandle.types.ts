import type { ComponentProps, ComponentState, Slot } from '@fluentui/react-utilities';

export type TableResizeHandleSlots = {
  root: NonNullable<Slot<'div'>>;
};

/**
 * TableResizeHandle Props
 */
export type TableResizeHandleProps = ComponentProps<Partial<TableResizeHandleSlots>>;

/**
 * State used in rendering TableResizeHandle
 */
export type TableResizeHandleState = ComponentState<TableResizeHandleSlots>;
