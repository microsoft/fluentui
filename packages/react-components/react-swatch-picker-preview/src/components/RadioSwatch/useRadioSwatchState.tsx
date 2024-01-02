import { radioCSSVars } from './useRadioSwatchStyles.styles';
import type { RadioSwatchProps, RadioSwatchState } from './RadioSwatch.types';

const { swatchColor } = radioCSSVars;

export const useRadioSwatchState_unstable = (state: RadioSwatchState, props: RadioSwatchProps) => {
  const { value = 'transparent' } = props;

  const rootVariables = {
    [swatchColor]: value,
  };
  // Root props
  state.root.style = {
    ...rootVariables,
    ...state.root.style,
  };

  return state;
};
