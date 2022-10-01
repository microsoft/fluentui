import type { ComponentProps, ComponentState, Slot } from '@fluentui/react-utilities';

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
  label?: Slot<'span'>;
  /**
   * The animated slot of the Progress
   * The bar slot receives the styling related to the loading bar associated with the Progress
   */
  bar?: NonNullable<Slot<'div'>>;
  /**
   * The track slot of the Progress
   * The track slot receives the styling related to the loading bar track associated with the Progress
   */
  track?: NonNullable<Slot<'div'>>;
  /**
   * The description slot of the Progress
   * The description slot receives the styling related to the description associated with the Progress
   */
  description?: Slot<'span'>;
};

/**
 * Progress Props
 */
export type ProgressProps = Omit<ComponentProps<ProgressSlots>, 'size'> & {
  /**
   * Prop to set whether the Progress is determinate or indeterminate
   * @default false
   */
  indeterminate?: boolean;
  /**
   * Percentage of the operation's completeness, numerically between 0 and 100.
   */
  percentComplete?: number;
  /**
   * The thickness of the Progress bar
   * @default 'medium'
   */
  thickness?: 'medium' | 'large';
};

/**
 * State used in rendering Progress
 */
export type ProgressState = ComponentState<ProgressSlots> &
  Required<Pick<ProgressProps, 'indeterminate' | 'percentComplete' | 'thickness'>>;
