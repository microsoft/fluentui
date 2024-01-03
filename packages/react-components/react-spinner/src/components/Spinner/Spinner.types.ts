import type { ComponentProps, ComponentState, Slot } from '@fluentui/react-utilities';
import { Label } from '@fluentui/react-label';

export type SpinnerSlots = {
  /**
   * The root of the Spinner.
   * The root slot receives the `className` and `style` specified directly on the `<Spinner>`.
   */
  root: NonNullable<Slot<'div'>>;
  /**
   * The slot for the animated svg.
   * The spinner slot receives the `className` and `style` that handles the spinning animation.
   * An svg is also rendered as a child of this slot
   */
  spinner?: Slot<'span'>;
  /**
   * The label of the Slider.
   * The label slot receives the styling related to the text associated with the Spinner.
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
 * State used in rendering Spinner
 */
export type SpinnerState = ComponentState<SpinnerSlots> &
  Required<Pick<SpinnerProps, 'appearance' | 'delay' | 'labelPosition' | 'size'>> & {
    /**
     * Should the spinner be rendered in the DOM
     */
    shouldRenderSpinner: boolean;
  };
