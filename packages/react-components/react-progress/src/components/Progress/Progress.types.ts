import type { ComponentProps, ComponentState, Slot } from '@fluentui/react-utilities';

export type ProgressSlots = {
  root: Slot<'div'>;
};

/**
 * Progress Props
 */
export type ProgressProps = ComponentProps<ProgressSlots> & {};

/**
 * State used in rendering Progress
 */
export type ProgressState = ComponentState<ProgressSlots>;
// TODO: Remove semicolon from previous line, uncomment next line, and provide union of props to pick from ProgressProps
// & Required<Pick<ProgressProps, 'propName'>>
