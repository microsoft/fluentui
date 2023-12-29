import * as React from 'react';
import { useControllableState, useEventCallback, mergeCallbacks } from '@fluentui/react-utilities';
// import { useFluent_unstable as useFluent } from '@fluentui/react-shared-contexts';
import { swatchCSSVars } from './useImageSwatchStyles.styles';
import type { ImageSwatchProps, ImageSwatchState } from './ImageSwatch.types';

const { swatchImage } = swatchCSSVars;

export const useColorSwatchState_unstable = (state: ImageSwatchState, props: ImageSwatchProps) => {
  const { value = 'transparent', selected, defaultSelected, disabled } = props;
  const { onClick } = state.root;

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
    [swatchImage]: value,
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
