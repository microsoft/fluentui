import * as React from 'react';
import { useSwatchColorPikerCell_unstable } from './useSwatchColorPikerCell';
import { renderSwatchColorPikerCell_unstable } from './renderSwatchColorPikerCell';
import { useSwatchColorPikerCellStyles_unstable } from './useSwatchColorPikerCellStyles.styles';
import type { SwatchColorPikerCellProps } from './SwatchColorPikerCell.types';
import type { ForwardRefComponent } from '@fluentui/react-utilities';

/**
 * SwatchColorPikerCell component - TODO: add more docs
 */
export const SwatchColorPikerCell: ForwardRefComponent<SwatchColorPikerCellProps> = React.forwardRef((props, ref) => {
  const state = useSwatchColorPikerCell_unstable(props, ref);

  useSwatchColorPikerCellStyles_unstable(state);
  return renderSwatchColorPikerCell_unstable(state);
});

SwatchColorPikerCell.displayName = 'SwatchColorPikerCell';
