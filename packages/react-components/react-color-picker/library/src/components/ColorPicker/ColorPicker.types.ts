import type * as React from 'react';
import type { ComponentProps, ComponentState, Slot, EventHandler, EventData } from '@fluentui/react-utilities';
import type { ColorPickerContextValue } from '../../contexts/colorPicker';
import type { HsvColor } from '../../types/color';

export type ColorPickerOnChangeData = EventData<'change', React.ChangeEvent<HTMLInputElement>> & {
  color: HsvColor;
};

export type ColorPickerSlots = {
  root: Slot<'div'>;
};

/**
 * ColorPicker Props
 */
export type ColorPickerProps = Omit<ComponentProps<Partial<ColorPickerSlots>>, 'color'> & {
  /**
   * Selected color.
   */
  color?: HsvColor;

  /**
   * Callback for when the user changes the color.
   */
  onColorChange?: EventHandler<ColorPickerOnChangeData>;

  /**
   * ColorPicker shape
   * @defaultvalue 'rounded'
   */
  shape?: 'rounded' | 'square';
};

/** ColorPicker Base Props */
export type ColorPickerBaseProps = Omit<ColorPickerProps, 'shape'>;

/**
 * State used in rendering ColorPicker
 */
export type ColorPickerState = ComponentState<ColorPickerSlots> & ColorPickerContextValue;

/** State used in rendering unstyled ColorPicker */
export type ColorPickerBaseState = Omit<ColorPickerState, 'shape'>;
