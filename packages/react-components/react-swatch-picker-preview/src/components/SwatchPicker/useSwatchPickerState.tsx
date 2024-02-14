import { swatchPickerCSSVars } from './useSwatchPickerStyles.styles';
import type { SwatchPickerProps, SwatchPickerState } from './SwatchPicker.types';

const { columnCountGrid, cellSize, gridGap } = swatchPickerCSSVars;

export const useSwatchPickerState_unstable = (state: SwatchPickerState, props: SwatchPickerProps) => {
  const { size = 'medium' } = props;

  const sizeMap = {
    extraSmall: '20px',
    small: '24px',
    medium: '28px',
    large: '32px',
  };

  const spacingMap = {
    small: '2px',
    medium: '4px',
  };

  const rootVariables = {
    [columnCountGrid]: 3,
    [cellSize]: sizeMap[size],
    [gridGap]: spacingMap.medium,
  };

  // Root props
  state.root.style = {
    ...rootVariables,
    ...state.root.style,
  };

  return state;
};
