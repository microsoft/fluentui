import type { ComponentProps, ComponentState, Slot } from '@fluentui/react-utilities';
import { SwatchPickerContextValue, DefaultColor } from '../../contexts/swatchPicker';

export type SwatchPickerSlots = {
  root: Slot<'div'>;
};

export type SwatchPickerModel<ColorT> = {
  selected?: ColorT;
  preview?: ColorT;
};

/**
 * SwatchPicker Props
 */
export type SwatchPickerProps<ColorT = DefaultColor> = ComponentProps<SwatchPickerSlots> & {
  layout?: 'grid' | 'row';
  size?: 'extraSmall' | 'small' | 'medium' | 'large';

  columnCount?: number;
  shape?: 'rounded' | 'square' | 'circular';

  /**
   * Event rised when user previews a color
   */
  onColorPreview?: (model: SwatchPickerModel<ColorT>) => void;

  /**
   * Event rised when user selects a color
   */
  onColorSelect?: (model: SwatchPickerModel<ColorT>) => void;
};

/**
 * State used in rendering SwatchPicker
 */
export type SwatchPickerState<T = DefaultColor> = ComponentState<SwatchPickerSlots> &
  SwatchPickerContextValue<T> &
  Pick<SwatchPickerProps, 'layout' | 'columnCount' | 'size' | 'shape'>;
// TODO: Remove semicolon from previous line, uncomment next line, and provide union of props to pick from SwatchPickerProps.
// & Required<Pick<SwatchPickerProps, 'propName'>>
