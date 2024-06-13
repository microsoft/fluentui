import type { ComponentProps, ComponentState, Slot } from '@fluentui/react-utilities';
import { SwatchPickerProps } from '../SwatchPicker/SwatchPicker.types';

export type ImageSwatchSlots = {
  root: Slot<'button'>;
};

/**
 * ImageSwatch Props
 */
export type ImageSwatchProps = ComponentProps<ImageSwatchSlots> &
  Pick<SwatchPickerProps, 'size' | 'shape'> & {
    /**
     * Swatch color
     */
    src: string;

    /**
     * Swatch value
     */
    value: string;
  };

/**
 * State used in rendering ImageSwatch
 */
export type ImageSwatchState = ComponentState<ImageSwatchSlots> &
  Pick<ImageSwatchProps, 'color' | 'size' | 'shape' | 'value'> & {
    selected: boolean;
  };
