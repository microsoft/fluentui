import * as React from 'react';
import { useControllableState, useEventCallback, mergeCallbacks } from '@fluentui/react-utilities';
// import { useFluent_unstable as useFluent } from '@fluentui/react-shared-contexts';
import { swatchCSSVars } from './useColorSwatchStyles.styles';
import type { ColorSwatchProps, ColorSwatchState } from './ColorSwatch.types';
import { calculateContrastRatio, calculateRelativeLuminance, hexToRgb } from '../../utils/calculateContrastRatio';

const { swatchColor } = swatchCSSVars;

// TODO get theme color - needs background
function getContrastRatio(color1: string, color2: string) {
  const backgroundColor = hexToRgb(color1).replace('rgb(', '').replace(')', '').split(',');
  const swatchColor = hexToRgb(color2).replace('rgb(', '').replace(')', '').split(',');

  const l1 = calculateRelativeLuminance(backgroundColor[0], backgroundColor[1], backgroundColor[2]);
  const l2 = calculateRelativeLuminance(swatchColor[0], swatchColor[1], swatchColor[2]);
  return calculateContrastRatio(l1, l2).toFixed(2);
}

export const useColorSwatchState_unstable = (state: ColorSwatchState, props: ColorSwatchProps) => {
  const { value = '#fff', selected, defaultSelected, disabled } = props;
  const { onClick } = state.root;

  console.log(value);
  const contrastRatio = getContrastRatio('#fafafa', value);
  console.log(contrastRatio);

  const [selectedValue, setSelectedValue] = useControllableState({
    state: selected,
    defaultState: defaultSelected,
    initialState: false,
  });

  const onSelectClick = React.useCallback(
    ev => {
      if (!disabled) {
        // && !disabledFocusable
        if (ev.defaultPrevented) {
          return;
        }
        setSelectedValue(selectedValue);
      }
    },
    [selectedValue, disabled, setSelectedValue], //disabledFocusable,
  );

  const rootVariables = {
    [swatchColor]: value,
  };
  // Root props
  state.root.style = {
    ...rootVariables,
    ...state.root.style,
  };

  return {
    ...state,
    selected: selectedValue,

    root: {
      ...state.root,
      'aria-selected': selectedValue,
      onClick: useEventCallback(
        mergeCallbacks(onClick as React.MouseEventHandler<HTMLButtonElement | HTMLAnchorElement>, onSelectClick),
      ),
    },
  };
};
