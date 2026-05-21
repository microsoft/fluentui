import type { DividerSlots, DividerProps, DividerState } from '../../Divider';

export type NavDividerSlots = DividerSlots;

/**
 * NavDivider Props
 */
export type NavDividerProps = Omit<DividerProps, 'vertical'>;

/**
 * State used in rendering NavDivider
 */
export type NavDividerState = DividerState;
