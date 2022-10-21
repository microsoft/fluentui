import type { ComponentProps, ComponentState, Slot } from '@fluentui/react-utilities';

export type ProgressSlots = {
  /**
   * The track behind the progress bar
   */
  root: NonNullable<Slot<'div'>>;
  /**
   * The filled portion of the progress bar. Animated in the indeterminate state, when no value is provided.
   */
  bar?: NonNullable<Slot<'div'>>;
};

/**
 * Progress Props
 */
export type ProgressProps = Omit<ComponentProps<ProgressSlots>, 'size'> & {
  /**
   * The shape of the bar and track.
   * @default 'rounded'
   */
  shape?: 'rounded' | 'rectangular';
  /**
   * A decimal number between `0` and `1` (or between `0` and `max` if given),
   * which specifies how much of the task has been completed.
   *
   * If `undefined` (default), the Progress will display an **indeterminate** state.
   */
  value?: number;
  /**
   * The maximum value, which indicates the task is complete.
   * The progress bar will be full when `value` equals `max`.
   * @default 1
   */
  max?: number;
  /**
   * The thickness of the Progress bar
   * @default 'medium'
   */
  thickness?: 'medium' | 'large';

  /**
   * The status of the progress bar. Changes the color of the bar.
   */
  validationState?: 'success' | 'warning' | 'error';
};

/**
 * State used in rendering Progress
 */
export type ProgressState = ComponentState<ProgressSlots> &
  Required<Pick<ProgressProps, 'max' | 'shape' | 'thickness'>> &
  Pick<ProgressProps, 'value' | 'validationState'>;
