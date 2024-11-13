import * as React from 'react';
import type { ComponentProps, ComponentState, Slot, EventHandler, EventData } from '@fluentui/react-utilities';
import { ColorPickerContextValue } from '../../contexts/colorPicker';

export type ColorPickerOnChangeData = EventData<'change', React.ChangeEvent<HTMLInputElement>> & {
  color: HsvColor;
};

export type ColorPickerSlots = {
  root: Slot<'div'>;
};

export type HsvColor = {
  h: number;
  s: number;
  v: number;
  a?: number;
};

/**
 * ColorPicker Props
 */
export type ColorPickerProps = ComponentProps<Omit<ColorPickerSlots, 'color'>> & {
  /**
   * Selected color.
   */
  color: HsvColor;

  /**
   * Callback for when the user changes the color.
   */
  onColorChange?: EventHandler<ColorPickerOnChangeData>;
};

/**
 * State used in rendering ColorPicker
 */
export type ColorPickerState = ComponentState<ColorPickerSlots> & ColorPickerContextValue;
