import { Label } from '@fluentui/react-label';
import type { ComponentProps, ComponentState, Slot } from '@fluentui/react-utilities';

export type RadioSlots = {
  /**
   * The root element of the Radio.
   *
   * The root slot receives the `className` and `style` specified directly on the `<Radio>`.
   * All other native props will be applied to the primary slot: `input`
   */
  root: Slot<'span'>;

  /**
   * The Radio's label.
   */
  label: Slot<typeof Label> | null;

  /**
   * Hidden input that handles the radio's functionality.
   *
   * This is the PRIMARY slot: all native properties specified directly on `<Radio>` will be applied to this slot,
   * except `className` and `style`, which remain on the root slot.
   */
  input: Slot<'input'>;

  /**
   * A circle outline, with a filled circle icon inside when the Radio is checked.
   */
  indicator: Slot<'div'>;
};

/**
 * Radio Props
 */
export type RadioProps = Omit<ComponentProps<Partial<RadioSlots>, 'input'>, 'size'> & {
  /**
   * The value of the RadioGroup when this Radio item is selected.
   */
  value?: string;

  /**
   * The position of the label relative to the radio indicator.
   *
   * This defaults to `after` unless the Radio is inside a RadioGroup with `layout="horizontalStacked"`,
   * in which case it defaults to `below`.
   *
   * @defaultvalue after
   */
  labelPosition?: 'after' | 'below';

  /**
   * Disable this Radio item.
   */
  disabled?: boolean;
};

/**
 * State used in rendering Radio
 */
export type RadioState = ComponentState<RadioSlots> & Required<Pick<RadioProps, 'labelPosition'>>;
