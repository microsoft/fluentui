import type { ComponentProps, ComponentState, Slot } from '@fluentui/react-utilities';

export type ProgressSlots = {
  /**
   * The root of the Progress. This slot will also function as the Progress's track
   * The root slot receives the `className` and `style` specified directly on the `<Progress>`.
   */
  root: NonNullable<Slot<'div'>>;
  /**
   * The animated slot of the Progress
   * The bar slot receives the styling related to the loading bar associated with the Progress
   */
  bar?: NonNullable<Slot<'div'>>;
};

/**
 * Progress Props
 */
export type ProgressProps = Omit<ComponentProps<ProgressSlots>, 'size'> & {
  /**
   * Percentage of the operation's completeness of the determinate progress
   * in decimal format, numerically between 0 and 1.
   */
  value?: number;
  /**
   * Max value of the determinate progress.
   * @default 1
   */
  max?: number;
  /**
   * The thickness of the Progress bar
   * @default 'medium'
   */
  thickness?: 'medium' | 'large';
};

/**
 * State used in rendering Progress
 */
export type ProgressState = ComponentState<ProgressSlots> & Required<Pick<ProgressProps, 'max' | 'thickness'>> & Pick<ProgressProps, 'value'>;
