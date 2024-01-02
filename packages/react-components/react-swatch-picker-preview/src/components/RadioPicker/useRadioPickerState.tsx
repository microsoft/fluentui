import { radioPickerCSSVars } from './useRadioPickerStyles.styles';
import type { RadioPickerProps, RadioPickerState } from './RadioPicker.types';

const { columnCountGrid } = radioPickerCSSVars;

export const useRadioPickerState_unstable = (state: RadioPickerState, props: RadioPickerProps) => {
  const { columnCount } = props;

  console.log(columnCount);
  const rootVariables = {
    [columnCountGrid]: 3, //columnCount,
  };
  // Root props
  state.root.style = {
    ...rootVariables,
    ...state.root.style,
  };

  return state;
};
