import type { DividerProps } from '../../Divider';

export type { DividerSlots as NavDividerSlots, DividerState as NavDividerState } from '../../Divider';

/**
 * NavDivider Props
 */
export type NavDividerProps = Omit<DividerProps, 'vertical'>;
