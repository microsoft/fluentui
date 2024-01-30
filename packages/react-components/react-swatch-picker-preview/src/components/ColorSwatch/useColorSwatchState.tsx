import * as React from 'react';
import { useControllableState, useEventCallback, mergeCallbacks } from '@fluentui/react-utilities';
// import { useFluent_unstable as useFluent } from '@fluentui/react-shared-contexts';
import { swatchCSSVars } from './useColorSwatchStyles.styles';
import type { ColorSwatchProps, ColorSwatchState } from './ColorSwatch.types';
import { calculateContrastRatioFromHex } from '../../utils/calculateContrastRatio';
import { Color } from '../../contexts/picker';

const { swatchColor, swatchBorderColor, swatchStateColor } = swatchCSSVars;

export const useColorSwatchState_unstable = <T extends Color>(state: ColorSwatchState, props: ColorSwatchProps<T>) => {
  const { hex, selected } = props;
  const contrastRatio = calculateContrastRatioFromHex('#fafafa', hex);

  const _stateColor = props.contrastStateColor ?? '#000';
  const _borderColor = props.contrastBorderColor ?? '#000';

  const contrastBorderColor = contrastRatio < 3 ? _borderColor : 'transparent';
  const contrastStateColor = contrastRatio < 3 ? _stateColor : '#fff';

  const rootVariables = {
    [swatchColor]: hex || '#000',
    [swatchBorderColor]: contrastBorderColor,
    [swatchStateColor]: contrastStateColor,
  };
  // Root props
  state.root.style = {
    ...rootVariables,
    ...state.root.style,
  };

  return {
    ...state,
    // selected: selectedValue,

    root: {
      ...state.root,
      'aria-selected': selected,
      // onClick: useEventCallback(
      //   mergeCallbacks(onClick as React.MouseEventHandler<HTMLButtonElement | HTMLAnchorElement>, onSelectClick),
      // ),
    },
  };
};
