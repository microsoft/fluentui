import * as React from 'react';
import { useControllableState, useEventCallback, mergeCallbacks } from '@fluentui/react-utilities';
// import { useFluent_unstable as useFluent } from '@fluentui/react-shared-contexts';
import { swatchCSSVars } from './useColorSwatchStyles.styles';
import type { ColorSwatchProps, ColorSwatchState } from './ColorSwatch.types';
import { calculateContrastRatioFromHex } from '../../utils/calculateContrastRatio';

const { swatchColor, swatchBorderColor, swatchStateColor } = swatchCSSVars;

export const useColorSwatchState_unstable = (state: ColorSwatchState, props: ColorSwatchProps) => {
  const { value = '#fff', selected, defaultSelected, disabled } = props;
  const { onClick } = state.root;

  // TODO get theme color - needs background
  const contrastRatio = calculateContrastRatioFromHex('#fafafa', value);
  const contrastBorderColor = contrastRatio < 3 ? '#000' : 'transparent';
  const contrastStateColor = contrastRatio < 3 ? '#000' : '#fff';

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
