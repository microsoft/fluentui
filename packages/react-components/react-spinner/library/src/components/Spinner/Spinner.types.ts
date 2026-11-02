import type { ComponentProps, ComponentState, Slot } from '@fluentui/react-utilities';
import type { Label } from '@fluentui/react-label';

export type SpinnerSlots = {
  /**
   * The root of the Spinner.
   * The root slot receives the `className` and `style` specified directly on the `<Spinner>`.
   */
  root: NonNullable<Slot<'div', 'span'>>;

  /**
   * The animated spinning ring.
   */
  spinner?: Slot<'span'>;

  /**
   * The part of the spinner that rotates.
   */
  spinnerTail?: NonNullable<Slot<'span'>>;

  /**
   * An optional label for the Spinner.
   */
  label?: Slot<typeof Label>;
};

/**
 * Spinner Props
 */
export type SpinnerProps = Omit<ComponentProps<SpinnerSlots>, 'size'> & {
  /**
   * The appearance of the Spinner.
   * @default 'primary'
   */
  appearance?: 'primary' | 'inverted';

  /**
   * Time in milliseconds after component mount before spinner is visible.
   * @default 0
   */
  delay?: number;

  /**
   * Where the label is positioned relative to the Spinner
   * @default 'after'
   */
  labelPosition?: 'above' | 'below' | 'before' | 'after';

  /**
   * The size of the spinner.
   * @default 'medium'
   */
  size?: 'extra-tiny' | 'tiny' | 'extra-small' | 'small' | 'medium' | 'large' | 'extra-large' | 'huge';
};

/**
 * Spinner base props, excluding design-related props like appearance and size.
 */
export type SpinnerBaseProps = Omit<SpinnerProps, 'appearance' | 'size'>;

/**
 * State used in rendering Spinner
 */
export type SpinnerState = ComponentState<SpinnerSlots> &
  Required<Pick<SpinnerProps, 'appearance' | 'delay' | 'labelPosition' | 'size'>> & {
    /**
     * Should the spinner be rendered in the DOM
     */
    shouldRenderSpinner: boolean;
  };

/**
 * Spinner base state, excluding design-related state like appearance and size.
 */
export type SpinnerBaseState = Omit<SpinnerState, 'appearance' | 'size'>;
