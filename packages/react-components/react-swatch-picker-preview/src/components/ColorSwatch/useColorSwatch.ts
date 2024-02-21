import * as React from 'react';
import { slot, useEventCallback, getPartitionedNativeProps } from '@fluentui/react-utilities';
import type { ColorSwatchProps, ColorSwatchState } from './ColorSwatch.types';
import { useFocusWithin } from '@fluentui/react-tabster';
import { useSwatchPickerContextValue_unstable } from '../../contexts/swatchPicker';
import { swatchCSSVars } from './useColorSwatchStyles.styles';

/**
 * Create the state required to render ColorSwatch.
 *
 * The returned state can be modified with hooks such as useColorSwatchStyles_unstable,
 * before being passed to renderColorSwatch_unstable.
 *
 * @param props - props from this instance of ColorSwatch
 * @param ref - reference to root HTMLButtonElement of ColorSwatch
 */
export const useColorSwatch_unstable = (
  props: ColorSwatchProps,
  ref: React.Ref<HTMLButtonElement>,
): ColorSwatchState => {
  const { color, value } = props;
  const layout = useSwatchPickerContextValue_unstable(ctx => ctx.layout);
  const size = useSwatchPickerContextValue_unstable(ctx => ctx.size);
  const shape = useSwatchPickerContextValue_unstable(ctx => ctx.shape);

  const requestSelectionChange = useSwatchPickerContextValue_unstable(ctx => ctx.requestSelectionChange);
  const selected = useSwatchPickerContextValue_unstable(ctx => ctx.selectedValue === value);

  const onClick = useEventCallback((event: React.MouseEvent<HTMLButtonElement>) =>
    requestSelectionChange(event, {
      selectedValue: value,
      selectedColor: color,
    }),
  );

  const role = layout === 'grid' ? 'gridcell' : 'radio';
  const a11yProps =
    layout === 'grid'
      ? {
          'aria-selected': selected,
        }
      : {
          'aria-checked': selected,
        };

  const nativeProps = getPartitionedNativeProps({
    props,
    primarySlotTagName: 'button',
    excludedPropNames: ['value', 'color', 'role'],
  });

  const rootVariables = {
    [swatchCSSVars.color]: color,
  };

  const root = slot.always(props.root, {
    defaultProps: {
      ref: useFocusWithin<HTMLDivElement>(),
      role: props.role ?? role,
      ...a11yProps,
      ...nativeProps.root,
    },
    elementType: 'div',
  });

  const button = slot.always(props.button, {
    defaultProps: {
      ref,
      type: 'button',
      onClick,
      ...nativeProps.primary,
    },
    elementType: 'button',
  });

  const state: ColorSwatchState = {
    components: {
      root: 'div',
      button: 'button',
    },
    root,
    button,
    size,
    shape,
    selected,
    color,
    value,
  };

  // Root props
  state.root.style = {
    ...rootVariables,
    ...state.root.style,
  };

  return state;
};
