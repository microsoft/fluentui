import * as React from 'react';
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
   * A circle outline, with a filled circle icon inside when the Radio is checked.
   */
  indicator: NonNullable<Slot<'div'>>;
};

/**
 * Radio Props
 */
export type RadioProps = Omit<ComponentProps<Partial<RadioSlots>, 'input'>, 'onChange' | 'size'> & {
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

  /**
   * Callback when this Radio is selected in its group.
   *
   * **Note:** `onChange` is NOT called when this Radio is deselected.
   * Use RadioGroup's `onChange` event to determine when the selection in the group changes.
   */
  onChange?: (ev: React.ChangeEvent<HTMLInputElement>, data: RadioOnChangeData) => void;
};

/**
 * Data for the onChange event for Radio.
 */
export type RadioOnChangeData = {
  /**
   * The value prop of this Radio item.
   */
  value: string;
};

/**
 * State used in rendering Radio
 */
export type RadioState = ComponentState<RadioSlots> & Required<Pick<RadioProps, 'labelPosition'>>;
