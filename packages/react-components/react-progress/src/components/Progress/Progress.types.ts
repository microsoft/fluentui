import type { ComponentProps, ComponentState, Slot } from '@fluentui/react-utilities';
import { Label } from '@fluentui/react-label';

export type ProgressSlots = {
  /**
   * The root of the Progress
   * The root slot receives the `className` and `style` specified directly on the `<Progress>`.
   */
  root: NonNullable<Slot<'div'>>;
  /**
   * The title of the Progress.
   * The label slot receives the styling related to the title associated with the Progress.
   */
  label?: Slot<typeof Label>;
  /**
   * The animated slot of the Progress
   * The indicator slot receives the styling related to the loading bar associated with the Progress
   */
  indicator?: NonNullable<Slot<'span'>>;
  /**
   * The description slot of the Progress
   * The description slot receives the styling related to the description associated with the Progress
   */
  description?: Slot<typeof Label>;
};

/**
 * Progress Props
 */
export type ProgressProps = Omit<ComponentProps<ProgressSlots>, 'size'> & {
  /**
   * The appearance of the Progress.
   * @default 'primary'
   */
  appearance?: 'primary' | 'inverted';
  /**
   * The height of the Progress bar
   * @default 'medium'
   */
  barThickness?: 'small' | 'medium' | 'large';
  /**
   * Whether the Progress is determinate or intedeterminate
   * @default 'false'
   */
  determinate?: boolean;
  /**
   * Percentage of the operation's completeness, numerically between 0 and 1. If this is not set,
   * the indeterminate progress animation will be shown instead.
   */
  percentComplete?: number;
};

/**
 * State used in rendering Progress
 */
export type ProgressState = ComponentState<ProgressSlots> &
  Required<Pick<ProgressProps, 'appearance' | 'barThickness' | 'determinate'>>;
