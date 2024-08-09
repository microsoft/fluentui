import * as React from 'react';
import type { ComponentProps, ComponentState, Slot, EventHandler, EventData } from '@fluentui/react-utilities';
import { ColorPickerContextValue } from '../../contexts/colorPicker';

export type ColorPickerOnSelectEventHandler = EventHandler<ColorPickerOnChangeData>;

export type ColorPickerOnChangeData = EventData<'change', React.ChangeEvent<HTMLInputElement>> & {
  hue?: number;
  saturation?: number;
  lightness?: number;
  alpha?: number;
  channel?: 'hue' | 'saturation' | 'lightness' | 'alpha';
  color?: string;
};

export type ColorPickerSlots = {
  root: Slot<'div'>;
};

/**
 * ColorPicker Props
 */
export type ColorPickerProps = ComponentProps<ColorPickerSlots> & {
  defaultColor?: string;
  color?: string;
  onChange?: EventHandler<ColorPickerOnChangeData>;
};

/**
 * State used in rendering ColorPicker
 */
export type ColorPickerState = ComponentState<ColorPickerSlots> & ColorPickerContextValue;
