import { radioPickerCSSVars } from './useRadioPickerStyles.styles';
import type { RadioPickerProps, RadioPickerState } from './RadioPicker.types';

const { columnCountGrid, cellSize } = radioPickerCSSVars;

export const useRadioPickerState_unstable = (state: RadioPickerState, props: RadioPickerProps) => {
  const { columnCount = 2, size = 'medium', layout = 'row', shape = 'square' } = props;

  const sizeMap = {
    extraSmall: '20px',
    small: '24px',
    medium: '28px',
    large: '32px',
  };
  const rootVariables = {
    [columnCountGrid]: columnCount,
    [cellSize]: sizeMap[size],
  };

  // Root props
  state.root.style = {
    ...rootVariables,
    ...state.root.style,
  };

  return {
    ...state,
    layout,
    size,
    shape,
  };
};
