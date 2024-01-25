import { radioCSSVars } from './useRadioSwatchStyles.styles';
import type { RadioSwatchProps, RadioSwatchState } from './RadioSwatch.types';
import { calculateContrastRatioFromHex } from '../../utils/calculateContrastRatio';

const { swatchColor, stateColor, borderColor } = radioCSSVars;

export const useRadioSwatchState_unstable = (state: RadioSwatchState, props: RadioSwatchProps) => {
  const { value = 'transparent' } = props;
  const contrastRatio = calculateContrastRatioFromHex('#fafafa', value);
  const _stateColor = props.contrastStateColor ?? '#000';
  const _borderColor = props.contrastBorderColor ?? '#000';

  const contrastBorderColor = contrastRatio < 3 ? _borderColor : 'transparent';
  const contrastStateColor = contrastRatio < 3 ? _stateColor : '#fff';

  const rootVariables = {
    [swatchColor]: value,
    [stateColor]: contrastStateColor,
    [borderColor]: contrastBorderColor,
  };
  // Root props
  state.root.style = {
    ...rootVariables,
    ...state.root.style,
  };

  return state;
};
