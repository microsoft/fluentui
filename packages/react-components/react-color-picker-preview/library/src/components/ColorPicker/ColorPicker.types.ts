import * as React from 'react';
import type { ComponentProps, ComponentState, Slot, EventHandler, EventData } from '@fluentui/react-utilities';
import { ColorPickerContextValue } from '../../contexts/colorPicker';

export type ColorPickerOnChangeData = EventData<'change', React.ChangeEvent<HTMLInputElement>> & {
  color: string;
};

export type ColorPickerSlots = {
  root: Slot<'div'>;
};

/**
 * ColorPicker Props
 */
export type ColorPickerProps = ComponentProps<ColorPickerSlots> & {
  /**
   * Selected color.
   */
  color: string;

  /**
   * Callback for when the user changes the color.
   */
  onColorChange?: EventHandler<ColorPickerOnChangeData>;
};

/**
 * State used in rendering ColorPicker
 */
export type ColorPickerState = ComponentState<ColorPickerSlots> & ColorPickerContextValue;
