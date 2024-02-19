import * as React from 'react';
import type { ComponentProps, ComponentState, Slot, EventHandler, EventData } from '@fluentui/react-utilities';
import { SwatchPickerContextValue } from '../../contexts/swatchPicker';

export type SwatchPickerSlots = {
  root: Slot<'div'>;
};

export type SwatchPickerOnSelectionChangeData = EventData<'click', React.MouseEvent<HTMLButtonElement>> & {
  selectedValue: string;
  selectedColor: string;
};

/**
 * SwatchPicker Props
 */
export type SwatchPickerProps = ComponentProps<SwatchPickerSlots> & {
  /**
   * Default selected value
   */
  defaultSelectedValue?: string;

  /**
   * Triggers a callback when the value has been changed
   */
  onSelectionChange?: EventHandler<SwatchPickerOnSelectionChangeData>;

  /**
   * Controlled selected value
   */
  selectedValue?: string;

  /**
   * Swatch size
   * @defaultvalue 'medium'
   */
  size?: 'extraSmall' | 'small' | 'medium' | 'large';

  /**
   * Swatch shape
   * @defaultvalue 'square'
   */
  shape?: 'rounded' | 'square' | 'circular';
};

/**
 * State used in rendering SwatchPicker
 */
export type SwatchPickerState = ComponentState<SwatchPickerSlots> &
  SwatchPickerContextValue &
  Pick<SwatchPickerProps, 'size' | 'shape'>;
