import type { ComponentProps, ComponentState, Slot } from '@fluentui/react-utilities';
import { TableContextValue } from '../Table/Table.types';

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
export type TableHeaderState = ComponentState<TableHeaderSlots> & Pick<TableContextValue, 'noNativeElements'>;
