import * as React from 'react';
import type { ComponentProps, ComponentState, Slot } from '@fluentui/react-utilities';
import { SwatchPickerContextValue } from '../../contexts/swatchPicker';

export type SwatchPickerSlots = {
  root: Slot<'div'>;
};

export type SwatchPickerOnSelectionChangeEvent = React.MouseEvent | React.KeyboardEvent | React.ChangeEvent;

export type SwatchPickerOnSelectionChangeData = {
  selectedValue: string;
  selectedColor: string;
};

export type SwatchPickerSelectEventHandler = (
  event: SwatchPickerOnSelectionChangeEvent,
  data: SwatchPickerOnSelectionChangeData,
) => void;

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
  // eslint-disable-next-line @nx/workspace-consistent-callback-type -- can't change type of existing callback
  onSelectionChange?: SwatchPickerSelectEventHandler;

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
