import type { ComponentProps, ComponentState, Slot } from '@fluentui/react-utilities';

export type TableHeaderSlots = {
  root: Slot<'thead', 'div'>;
};

/**
 * TableHeader Props
 */
export type TableHeaderProps = ComponentProps<TableHeaderSlots> & {};

/**
 * State used in rendering TableHeader
 */
export type TableHeaderState = ComponentState<TableHeaderSlots>;
