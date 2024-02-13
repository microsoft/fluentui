import * as React from 'react';
import type { ComponentProps, ComponentState, Slot } from '@fluentui/react-utilities';
import { SwatchPickerContextValue } from '../../contexts/swatchPicker';

export type SwatchPickerSlots = {
  root: Slot<'div'>;
};

export type SwatchPickerSelectEvent = React.MouseEvent | React.KeyboardEvent | React.ChangeEvent;

export type SwatchPickerSelectData = {
  selectedValue: string;
};

export type SwatchPickerSelectEventHandler = (event: SwatchPickerSelectEvent, data: SwatchPickerSelectData) => void;

/**
 * SwatchPicker Props
 */
export type SwatchPickerProps = ComponentProps<SwatchPickerSlots> & {
  /**
   * Event rised when user selects a color
   */
  // eslint-disable-next-line @nx/workspace-consistent-callback-type -- can't change type of existing callback
  onColorChange?: SwatchPickerSelectEventHandler;

  size?: 'extraSmall' | 'small' | 'medium' | 'large';

  shape?: 'rounded' | 'square' | 'circular';

  selectedValue?: string;
};

/**
 * State used in rendering SwatchPicker
 */
export type SwatchPickerState = ComponentState<SwatchPickerSlots> &
  SwatchPickerContextValue &
  Pick<SwatchPickerProps, 'size' | 'shape'>;
