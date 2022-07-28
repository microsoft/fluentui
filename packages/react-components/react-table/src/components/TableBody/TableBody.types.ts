import * as React from 'react';
import type { ComponentProps, ComponentState, Slot } from '@fluentui/react-utilities';

export type TableBodySlots = {
  root: Slot<'tbody', 'div'>;
};

/**
 * TableBody Props
 */
export type TableBodyProps = ComponentProps<TableBodySlots> & {
  children?: React.ReactNode | ((items: unknown) => React.ReactNode);
};

/**
 * State used in rendering TableBody
 */
export type TableBodyState = ComponentState<TableBodySlots>;
