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
  columnCount?: number;

  defaultSelectedValue?: string;

  layout?: 'grid' | 'row';

  responsive?: boolean;

  /**
   * Event rised when user selects a color
   */
  onColorChange?: (event: SwatchPickerSelectEvent, data: SwatchPickerSelectData) => void;

  size?: 'extraSmall' | 'small' | 'medium' | 'large';

  shape?: 'rounded' | 'square' | 'circular';

  spacing?: 'small' | 'medium';

  selectedValue?: string;
};

/**
 * State used in rendering SwatchPicker
 */
export type SwatchPickerState = ComponentState<SwatchPickerSlots> &
  SwatchPickerContextValue &
  Pick<SwatchPickerProps, 'layout' | 'columnCount' | 'size' | 'shape' | 'spacing' | 'responsive'>;
