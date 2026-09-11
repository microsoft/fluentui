import type {
  ProgressBarProps as ProgressBarHeadlessProps,
  ProgressBarState as ProgressBarHeadlessState,
} from '@fluentui/react-headless-components-preview/progress-bar';

export type { ProgressBarSlots } from '@fluentui/react-headless-components-preview/progress-bar';

/** Fill colour of a determinate ProgressBar. An indeterminate bar always renders `'brand'`. */
export type ProgressBarColor = 'brand' | 'success' | 'warning' | 'error';

/** Corner treatment of the ProgressBar track. */
export type ProgressBarShape = 'rounded' | 'square';

/** Height of the ProgressBar track. */
export type ProgressBarThickness = 'medium' | 'large';

/**
 * Windmod ProgressBar props: the headless progress bar plus the look props the headless surface
 * deliberately omits (they exist purely to select styles).
 */
export type ProgressBarProps = ProgressBarHeadlessProps & {
  /** @default 'brand' */
  color?: ProgressBarColor;
  /** @default 'rounded' */
  shape?: ProgressBarShape;
  /** @default 'medium' */
  thickness?: ProgressBarThickness;
};

/** Windmod ProgressBar state: headless state plus the resolved look props. */
export type ProgressBarState = ProgressBarHeadlessState &
  Required<Pick<ProgressBarProps, 'color' | 'shape' | 'thickness'>>;
