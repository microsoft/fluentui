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
   * The bar slot receives the styling related to the loading bar associated with the Progress
   */
  bar?: NonNullable<Slot<'span'>>;
  /**
   * The track slot of the Progress
   * The track slot receives the styling related to the loading bar track associated with the Progress
   */
  track?: NonNullable<Slot<'span'>>;
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
   * The thickness of the Progress bar
   * @default 'default'
   */
  barThickness?: 'default' | 'large';
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
  Required<Pick<ProgressProps, 'barThickness' | 'determinate'>>;
