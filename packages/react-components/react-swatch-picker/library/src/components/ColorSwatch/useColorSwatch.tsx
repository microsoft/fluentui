import * as React from 'react';
import { slot, useEventCallback, getIntrinsicElementProps, mergeCallbacks } from '@fluentui/react-utilities';
import type { ColorSwatchProps, ColorSwatchState } from './ColorSwatch.types';
import { useSwatchPickerContextValue_unstable } from '../../contexts/swatchPicker';
import { swatchCSSVars } from './useColorSwatchStyles.styles';
import { ProhibitedFilled } from '@fluentui/react-icons';
import { tokens } from '@fluentui/react-theme';

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
  const { borderColor, color, disabled, disabledIcon, icon, value, onClick, size, shape, style, ...rest } = props;
  const _size = useSwatchPickerContextValue_unstable(ctx => ctx.size);
  const _shape = useSwatchPickerContextValue_unstable(ctx => ctx.shape);
  const isGrid = useSwatchPickerContextValue_unstable(ctx => ctx.isGrid);

  const requestSelectionChange = useSwatchPickerContextValue_unstable(ctx => ctx.requestSelectionChange);
  const selected = useSwatchPickerContextValue_unstable(ctx => ctx.selectedValue === value);

  const onColorSwatchClick = useEventCallback(
    mergeCallbacks(onClick, (event: React.MouseEvent<HTMLButtonElement>) =>
      requestSelectionChange(event, {
        selectedValue: value,
        selectedSwatch: color,
      }),
    ),
  );

  const rootVariables = {
    [swatchCSSVars.color]: color,
    [swatchCSSVars.borderColor]: borderColor ?? tokens.colorTransparentStroke,
  };

  const role = isGrid ? 'gridcell' : 'radio';
  const ariaSelected = isGrid
    ? {
        'aria-selected': selected,
      }
    : { 'aria-checked': selected };

  const iconShorthand = slot.optional(icon, { elementType: 'span' });
  const disabledIconShorthand = slot.optional(disabledIcon, {
    defaultProps: {
      children: <ProhibitedFilled />,
    },
    renderByDefault: true,
    elementType: 'span',
  });

  return {
    components: {
      root: 'button',
      icon: 'span',
      disabledIcon: 'span',
    },
    root: slot.always(
      getIntrinsicElementProps('button', {
        ref,
        role,
        ...ariaSelected,
        onClick: onColorSwatchClick,
        type: 'button',
        disabled,
        ...rest,
        style: {
          ...rootVariables,
          ...style,
        },
      }),
      { elementType: 'button' },
    ),
    icon: iconShorthand,
    disabledIcon: disabledIconShorthand,
    disabled,
    size: size ?? _size,
    shape: shape ?? _shape,
    selected,
    color,
    value,
  };
};
