import type { DividerProps, DividerState } from '../../Divider';

export type { DividerSlots as NavDividerSlots } from '../../Divider';

/**
 * NavDivider Props
 */
export type NavDividerProps = Omit<DividerProps, 'vertical'>;

/**
 * State used in rendering NavDivider
 */
export type NavDividerState = DividerState;
