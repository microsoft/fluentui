import type { ComponentProps, ComponentState, Slot } from '@fluentui/react-utilities';

export type ProgressBarSlots = {
  /**
   * The track behind the ProgressBar bar
   */
  root: NonNullable<Slot<'div'>>;
  /**
   * The filled portion of the ProgressBar bar. Animated in the indeterminate state, when no value is provided.
   */
  bar?: NonNullable<Slot<'div'>>;
};

// TODO #25997: Remove deprecated export before ProgressBar is released as stable
/** @deprecated renamed to ProgressBarSlots */
export type ProgressSlots = ProgressBarSlots;

/**
 * ProgressBar Props
 */
export type ProgressBarProps = Omit<ComponentProps<ProgressBarSlots>, 'size'> & {
  /**
   * The shape of the bar and track.
   * @default 'rounded'
   */
  shape?: 'rounded' | 'rectangular';
  /**
   * A decimal number between `0` and `1` (or between `0` and `max` if given),
   * which specifies how much of the task has been completed.
   *
   * If `undefined` (default), the ProgressBar will display an **indeterminate** state.
   */
  value?: number;
  /**
   * The maximum value, which indicates the task is complete.
   * The ProgressBar bar will be full when `value` equals `max`.
   * @default 1
   */
  max?: number;
  /**
   * The thickness of the ProgressBar bar
   * @default 'medium'
   */
  thickness?: 'medium' | 'large';

  /**
   * The status of the ProgressBar bar. Changes the color of the bar.
   */
  validationState?: 'success' | 'warning' | 'error';
};

// TODO #25997: Remove deprecated export before ProgressBar is released as stable
/** @deprecated renamed to ProgressBarProps */
export type ProgressProps = ProgressBarProps;

/**
 * State used in rendering ProgressBar
 */
export type ProgressBarState = ComponentState<ProgressBarSlots> &
  Required<Pick<ProgressBarProps, 'max' | 'shape' | 'thickness'>> &
  Pick<ProgressBarProps, 'value' | 'validationState'>;

// TODO #25997: Remove deprecated export before ProgressBar is released as stable
/** @deprecated renamed to ProgressBarState */
export type ProgressState = ProgressBarState;
