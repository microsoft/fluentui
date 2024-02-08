// import * as React from 'react';
import { swatchCSSVars } from './useColorSwatchStyles.styles';
import type { ColorSwatchProps, ColorSwatchState } from './ColorSwatch.types';
import { calculateContrastRatioFromHex } from '../../utils/calculateContrastRatio';
// import { ThemeContext_unstable as ThemeContext } from '@fluentui/react-shared-contexts';
// import { tokens } from '@fluentui/react-components';

const { swatchColor, swatchBorderColor, swatchStateColor } = swatchCSSVars;

export const useColorSwatchState_unstable = (state: ColorSwatchState, props: ColorSwatchProps) => {
  const { color = '' } = props;

  // const context = React.useContext(ThemeContext) ?? {};
  // TODO - use this color - context.colorNeutralForeground1

  const contrastRatio = calculateContrastRatioFromHex('#fafafa', color); // tokens.colorNeutralForeground1 - for focus white border

  const _stateColor = props.contrastStateColor ?? '#000';
  const _borderColor = props.contrastBorderColor ?? '#000';

  const contrastBorderColor = contrastRatio < 3 ? _borderColor : 'transparent';
  const contrastStateColor = contrastRatio < 3 ? _stateColor : '#fff';

  const rootVariables = {
    [swatchColor]: color || '#000',
    [swatchBorderColor]: contrastBorderColor,
    [swatchStateColor]: contrastStateColor,
  };
  // Root props
  state.root.style = {
    ...rootVariables,
    ...state.root.style,
  };
};
