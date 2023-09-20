import type { ComponentProps, ComponentState } from '@fluentui/react-utilities';
import { RadioGroupSlots, RadioGroupState, RadioGroupProps } from '@fluentui/react-components';

/**
 * Data shared between SwatchPicker components
 */
export type SwatchPickerContextValue = Pick<SwatchPickerProps, 'shape' | 'size' | 'selectedId'>;

export type SwatchPickerContextValues = {
  swatchPicker: SwatchPickerContextValue;
};

export type SwatchPickerSlots = RadioGroupSlots;

/**
 * SwatchPicker Props
 */
export type SwatchPickerProps = ComponentProps<SwatchPickerSlots> &
  Omit<RadioGroupProps, 'layout'> & {
    layout?: 'row' | 'grid';
    shape?: 'circular' | 'square';
    size?: 'small' | 'medium' | 'large';
    selectedId?: number | string;
  };

/**
 * State used in rendering SwatchPicker
 */
export type SwatchPickerState = ComponentState<SwatchPickerSlots> &
  Omit<RadioGroupState, keyof RadioGroupSlots | 'components'> &
  Required<Pick<SwatchPickerProps, 'onChange' | 'layout' | 'size' | 'shape'>> &
  Partial<Omit<SwatchPickerProps, 'onChange' | 'layout' | 'size' | 'shape'>>;
