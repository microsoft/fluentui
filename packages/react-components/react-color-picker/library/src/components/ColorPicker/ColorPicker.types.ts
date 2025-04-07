import * as React from 'react';
import type { ComponentProps, ComponentState, Slot, EventHandler, EventData } from '@fluentui/react-utilities';
import { ColorPickerContextValue } from '../../contexts/colorPicker';
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

/**
 * State used in rendering ColorPicker
 */
export type ColorPickerState = ComponentState<ColorPickerSlots> & ColorPickerContextValue;
