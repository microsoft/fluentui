import type { ComponentProps, ComponentState, Slot } from '@fluentui/react-utilities';
import { Label } from '@fluentui/react-label';

export type SpinnerSlots = {
  /**
   * The root of the Spinner.
   * The root slot receives the `className` and `style` specified directly on the `<Spinner>`.
   */
  root: Slot<'div'>;
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

type SpinnerCommons = {
  /**
   * The appearance of the Spinner. Defaults to primary
   */
  appearance?: 'primary' | 'inverted';

  /**
   * Where the label is positioned relative to the Spinner
   */
  labelPosition?: 'above' | 'below' | 'before' | 'after';

  /**
   * The size of the spinner. Defaults to medium
   */
  size?: 'tiny' | 'extra-small' | 'small' | 'medium' | 'large' | 'extra-large' | 'huge';

  /**
   * The status of the Spinner. Defaults to active
   */
  status?: 'active' | 'inactive';
};

/**
 * Spinner Props
 */
export type SpinnerProps = Omit<ComponentProps<SpinnerSlots>, 'size'> & Partial<SpinnerCommons>;

/**
 * State used in rendering Spinner
 */
export type SpinnerState = ComponentState<SpinnerSlots> & SpinnerCommons;
