import * as React from 'react';
import { useControllableState, useEventCallback, mergeCallbacks } from '@fluentui/react-utilities';
// import { useFluent_unstable as useFluent } from '@fluentui/react-shared-contexts';
import { swatchCSSVars } from './useColorSwatchStyles.styles';
import type { ColorSwatchProps, ColorSwatchState } from './ColorSwatch.types';
import { calculateContrastRatioFromHex } from '../../utils/calculateContrastRatio';
import { Color } from '../../contexts/picker';

const { swatchColor, swatchBorderColor, swatchStateColor } = swatchCSSVars;

export const useColorSwatchState_unstable = <T extends Color>(state: ColorSwatchState, props: ColorSwatchProps<T>) => {
  const { hex, selected, defaultSelected } = props;

  // TODO get theme color - needs background
  // const contrastRatio = calculateContrastRatioFromHex('#fafafa', color.hex);
  // const contrastBorderColor = contrastRatio < 3 ? '#000' : 'transparent';
  // const contrastStateColor = contrastRatio < 3 ? '#000' : '#fff';

  const [selectedValue, setSelectedValue] = useControllableState({
    state: selected,
    defaultState: defaultSelected,
    initialState: false,
  });

  // const onSelectClick = React.useCallback(
  //   ev => {
  //     if (!disabled) {
  //       // && !disabledFocusable
  //       if (ev.defaultPrevented) {
  //         return;
  //       }
  //       setSelectedValue(selectedValue);
  //     }
  //   },
  //   [selectedValue, disabled, setSelectedValue], //disabledFocusable,
  // );

  const rootVariables = {
    [swatchColor]: hex || '#000',
    [swatchBorderColor]: '#fff', //contrastBorderColor,
    [swatchStateColor]: '#fff', //contrastStateColor,
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
      // 'aria-selected': selectedValue,
      // onClick: useEventCallback(
      //   mergeCallbacks(onClick as React.MouseEventHandler<HTMLButtonElement | HTMLAnchorElement>, onSelectClick),
      // ),
    },
  };
};
