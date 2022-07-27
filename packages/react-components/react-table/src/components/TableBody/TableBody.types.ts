import type { ComponentProps, ComponentState, Slot } from '@fluentui/react-utilities';

export type TableBodySlots = {
  root: Slot<'tbody', 'div'>;
};

/**
 * TableBody Props
 */
export type TableBodyProps = ComponentProps<TableBodySlots>;

/**
 * State used in rendering TableBody
 */
export type TableBodyState = ComponentState<TableBodySlots>;
