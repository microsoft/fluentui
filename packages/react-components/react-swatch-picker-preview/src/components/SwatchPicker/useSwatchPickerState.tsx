import { swatchPickerCSSVars } from './useSwatchPickerStyles.styles';
import type { SwatchPickerProps, SwatchPickerState } from './SwatchPicker.types';

const { columnCountGrid, cellSize, gridGap } = swatchPickerCSSVars;

export const useSwatchPickerState_unstable = (state: SwatchPickerState, props: SwatchPickerProps<T>) => {
  const { columnCount = 2, size = 'medium' } = props;

  const sizeMap = {
    extraSmall: '20px',
    small: '24px',
    medium: '28px',
    large: '32px',
  };
  const rootVariables = {
    [columnCountGrid]: columnCount,
    [cellSize]: sizeMap[size],
    [gridGap]: '4px',
  };

  // Root props
  state.root.style = {
    ...rootVariables,
    ...state.root.style,
  };

  return state;
};
