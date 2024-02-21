import * as React from 'react';
import { slot, useEventCallback, getPartitionedNativeProps } from '@fluentui/react-utilities';
import type { ColorSwatchProps, ColorSwatchState } from './ColorSwatch.types';
import { useFocusWithin } from '@fluentui/react-tabster';
import { useSwatchPickerContextValue_unstable } from '../../contexts/swatchPicker';
import { swatchCSSVars } from './useColorSwatchStyles.styles';
import { calculateContrastRatioFromHex } from '../../utils/calculateContrastRatio';

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
  const { color, value, icon, disabled } = props;
  const iconShorthand = slot.optional(icon, { elementType: 'span' });
  const size = useSwatchPickerContextValue_unstable(ctx => ctx.size);
  const shape = useSwatchPickerContextValue_unstable(ctx => ctx.shape);
  const _role = useSwatchPickerContextValue_unstable(ctx => ctx.layout) === 'grid' ? 'gridcell' : 'radio';

  const disabledIcon = slot.optional(props.disabledIcon, {
    renderByDefault: true,
    defaultProps: {
      // children: <Prohibited20Filled />,
    },
    elementType: 'span',
  });

  const requestSelectionChange = useSwatchPickerContextValue_unstable(ctx => ctx.requestSelectionChange);
  const selected = useSwatchPickerContextValue_unstable(ctx => ctx.selectedValue === value);

  const onClick = useEventCallback((event: React.MouseEvent<HTMLButtonElement>) =>
    requestSelectionChange(event, {
      selectedValue: value,
      selectedColor: color,
    }),
  );

  const nativeProps = getPartitionedNativeProps({
    props,
    primarySlotTagName: 'button',
    excludedPropNames: ['value', 'color'],
  });

  const contrastRatio = calculateContrastRatioFromHex('#fafafa', color); // tokens.colorNeutralForeground1 - for focus white border

  const _stateColor = props.contrastStateColor ?? '#000';
  const _borderColor = props.contrastBorderColor ?? '#000';

  const contrastBorderColor = contrastRatio < 3 ? _borderColor : 'transparent';
  const contrastStateColor = contrastRatio < 3 ? _stateColor : '#fff';

  const rootVariables = {
    [swatchCSSVars.color]: color,
    [swatchCSSVars.swatchBorderColor]: contrastBorderColor,
    [swatchCSSVars.swatchStateColor]: contrastStateColor,
  };

  const root = slot.always(props.root, {
    defaultProps: {
      ref: useFocusWithin<HTMLDivElement>(),
      role: _role,
      'aria-selected': selected,
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
      icon: 'span',
      disabledIcon: 'span',
    },
    icon: iconShorthand,
    disabledIcon,
    disabled,
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
