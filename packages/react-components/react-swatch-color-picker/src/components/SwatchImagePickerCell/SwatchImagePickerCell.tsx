import * as React from 'react';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import { useSwatchImagePickerCell_unstable } from './useSwatchImagePickerCell';
import { renderSwatchImagePickerCell_unstable } from './renderSwatchImagePickerCell';
import { useSwatchImagePickerCellStyles_unstable } from './useSwatchImagePickerCellStyles.styles';
import type { SwatchImagePickerCellProps } from './SwatchImagePickerCell.types';

/**
 * SwatchImagePickerCell component - TODO: add more docs
 */
export const SwatchImagePickerCell: ForwardRefComponent<SwatchImagePickerCellProps> = React.forwardRef((props, ref) => {
  const state = useSwatchImagePickerCell_unstable(props, ref);

  useSwatchImagePickerCellStyles_unstable(state);
  return renderSwatchImagePickerCell_unstable(state);
});

SwatchImagePickerCell.displayName = 'SwatchImagePickerCell';
