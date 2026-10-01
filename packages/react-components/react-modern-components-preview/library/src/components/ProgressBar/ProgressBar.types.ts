import type { MotionSlotProps } from '@fluentui/react-motion';
import type { Slot } from '@fluentui/react-utilities';
import type {
  ProgressBarProps as ProgressBarBaseProps,
  ProgressBarState as ProgressBarBaseState,
} from '@fluentui/react-headless-components-preview/progress-bar';
export type { ProgressBarSlots } from '@fluentui/react-headless-components-preview/progress-bar';

export type ProgressBarProps = ProgressBarBaseProps & {
  /**
   * The shape of the bar and track.
   *
   * @default 'rounded'
   */
  shape?: 'rounded' | 'square';

  /**
   * The thickness of the bar and track.
   *
   * @default 'medium'
   */
  thickness?: 'medium' | 'large';

  /**
   * The status color of a determinate ProgressBar.
   *
   * @default 'brand'
   */
  color?: 'brand' | 'success' | 'warning' | 'error';

  /**
   * Motion slot for the indeterminate animation. Pass `null` to disable the animation.
   */
  indeterminateMotion?: Slot<MotionSlotProps>;
};

export type ProgressBarState = ProgressBarBaseState & {
  shape: NonNullable<ProgressBarProps['shape']>;
  thickness: NonNullable<ProgressBarProps['thickness']>;
  color: NonNullable<ProgressBarProps['color']>;
  indeterminateMotion?: MotionSlotProps;
  root: ProgressBarBaseState['root'] & {
    'data-shape': NonNullable<ProgressBarProps['shape']>;
    'data-thickness': NonNullable<ProgressBarProps['thickness']>;
    'data-color': NonNullable<ProgressBarProps['color']>;
    'data-transition'?: '';
  };
};
