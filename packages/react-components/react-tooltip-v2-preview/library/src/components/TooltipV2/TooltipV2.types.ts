import type { ComponentProps, ComponentState, Slot } from '@fluentui/react-utilities';

export type TooltipV2Slots = {
  root: Slot<'div'>;
};

/**
 * TooltipV2 Props
 */
export type TooltipV2Props = ComponentProps<TooltipV2Slots> & {};

/**
 * State used in rendering TooltipV2
 */
export type TooltipV2State = ComponentState<TooltipV2Slots>;
// TODO: Remove semicolon from previous line, uncomment next line, and provide union of props to pick from TooltipV2Props.
// & Required<Pick<TooltipV2Props, 'propName'>>
