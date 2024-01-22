import type { ComponentProps, ComponentState, Slot } from '@fluentui/react-utilities';
import type { RadioProps, RadioSlots } from '@fluentui/react-radio';

export type RadioSwatchSlots = Omit<RadioSlots, 'indicator' | 'label'> & {
  icon?: Slot<'span'>;
  swatch?: NonNullable<Slot<'span'>>;
};

/**
 * RadioSwatch Props
 */
export type RadioSwatchProps = ComponentProps<RadioSwatchSlots> &
  Omit<ComponentProps<Partial<RadioSwatchSlots>, 'input'>, 'onChange' | 'size'> &
  Omit<RadioProps, 'labelPosition'> & {
    size?: 'extraSmall' | 'small' | 'medium' | 'large';
    shape?: 'rounded' | 'square' | 'circular';
    label?: string;
  };

/**
 * State used in rendering RadioSwatch
 */
export type RadioSwatchState = ComponentState<RadioSwatchSlots> & Pick<RadioSwatchProps, 'value' | 'size' | 'shape'>;
// TODO: Remove semicolon from previous line, uncomment next line, and provide union of props to pick from RadioSwatchProps.
// & Required<Pick<RadioSwatchProps, 'propName'>>
