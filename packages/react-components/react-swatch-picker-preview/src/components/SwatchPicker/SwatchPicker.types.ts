import * as React from 'react';
import type { ComponentProps, ComponentState, Slot, EventHandler, EventData } from '@fluentui/react-utilities';
import { SwatchPickerContextValue } from '../../contexts/swatchPicker';

export type SwatchPickerSlots = {
  root: Slot<'div'>;
};

export type SwatchPickerOnSelectEventHandler = EventHandler<SwatchPickerOnSelectionChangeData>;

export type SwatchPickerOnSelectionChangeData = EventData<'click', React.MouseEvent<HTMLButtonElement>> & {
  selectedValue: string;
  selectedSwatch: string;
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
   * Whether SwatchPicker is row or grid
   */
  layout?: 'row' | 'grid';

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
  size?: 'extra-small' | 'small' | 'medium' | 'large';

  /**
   * Swatch shape
   * @defaultvalue 'square'
   */
  shape?: 'rounded' | 'square' | 'circular';

  /**
   * Spacing between swatches
   * @defaultvalue 'medium'
   */
  spacing?: 'small' | 'medium';
};

/**
 * State used in rendering SwatchPicker
 */
export type SwatchPickerState = ComponentState<SwatchPickerSlots> &
  SwatchPickerContextValue &
  Pick<SwatchPickerProps, 'layout' | 'size' | 'shape' | 'spacing'> & {
    isGrid: boolean;
  };
