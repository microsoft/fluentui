import { Label } from '@fluentui/react-label';
import type { ComponentProps, ComponentState, Slot } from '@fluentui/react-utilities';

export type RadioSlots = {
  /**
   * The root element of the Radio.
   *
   * The root slot receives the `className` and `style` specified directly on the `<Radio>`.
   * All other native props will be applied to the primary slot: `input`
   */
  root: NonNullable<Slot<'span'>>;

  /**
   * The Radio's label.
   */
  label: Slot<typeof Label>;

  /**
   * Hidden input that handles the radio's functionality.
   *
   * This is the PRIMARY slot: all native properties specified directly on `<Radio>` will be applied to this slot,
   * except `className` and `style`, which remain on the root slot.
   */
  input: NonNullable<Slot<'input'>>;

  /**
   * Renders the radio, with the circle icon as its child when checked.
   */
  indicator: Slot<'div'>;
};

/**
 * Radio Props
 */
export type RadioProps = Omit<ComponentProps<Partial<RadioSlots>, 'input'>, 'size'> & {
  /**
   * The value of the RadioGroup when this Radio is selected.
   */
  value?: string;

  /**
   * The size of the radio indicator.
   *
   * @defaultvalue medium
   */
  size?: 'medium' | 'large';

  /**
   * The position of the label relative to the radio indicator.
   *
   * @defaultvalue after
   */
  labelPosition?: 'after' | 'below';
};

/**
 * State used in rendering Radio
 */
export type RadioState = ComponentState<RadioSlots> & Required<Pick<RadioProps, 'size' | 'labelPosition'>>;
