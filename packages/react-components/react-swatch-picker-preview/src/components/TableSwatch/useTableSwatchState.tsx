// import * as React from 'react';
// import { useControllableState, useEventCallback, mergeCallbacks } from '@fluentui/react-utilities';
// import { useFluent_unstable as useFluent } from '@fluentui/react-shared-contexts';
// import { tdCSSVars } from './useTableSwatchStyles.styles';
import type { TableSwatchProps, TableSwatchState } from './TableSwatch.types';
// import { calculateContrastRatio, calculateRelativeLuminance, hexToRgb } from '../../utils/calculateContrastRatio';

// const { cellColor } = tdCSSVars;

// TODO get theme color - needs background
// function getContrastRatio(color1: string, color2: string) {
//   const backgroundColor = hexToRgb(color1).replace('rgb(', '').replace(')', '').split(',');
//   const swatchColor2 = hexToRgb(color2).replace('rgb(', '').replace(')', '').split(',');

//   const l1 = calculateRelativeLuminance(Number(backgroundColor[0]), Number(backgroundColor[1]), Number(backgroundColor[2]));
//   const l2 = calculateRelativeLuminance(Number(swatchColor2[0]), Number(swatchColor2[1]), Number(swatchColor2[2]));
//   return calculateContrastRatio(l1, l2).toFixed(2);
// }

export const useTableSwatchState_unstable = (state: TableSwatchState, props: TableSwatchProps) => {
  // const { value = '#fff', selected } = props;
  // const { onClick } = state.root;

  // const contrastRatio = getContrastRatio('#fafafa', value);

  // const [selectedValue, setSelectedValue] = useControllableState({
  //   state: selected,
  //   // defaultState: defaultSelected,
  //   initialState: false,
  // });

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

  // const rootVariables = {
  //   [cellColor]: value,
  // };
  // Root props
  // state.root.style = {
  //   ...rootVariables,
  //   ...state.root.style,
  // };

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
