import type { ProgressBarBaseState } from '@fluentui/react-progress';

export type { ProgressBarSlots, ProgressBarBaseProps as ProgressBarProps } from '@fluentui/react-progress';

/**
 * State used in rendering ProgressBar
 */
export type ProgressBarState = ProgressBarBaseState & {
  root: {
    'data-indeterminate'?: string;
  };
};
