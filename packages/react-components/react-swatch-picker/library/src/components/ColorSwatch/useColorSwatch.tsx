'use client';

import * as React from 'react';
import { slot, useEventCallback, getIntrinsicElementProps, mergeCallbacks } from '@fluentui/react-utilities';
import type {
  ColorSwatchBaseProps,
  ColorSwatchBaseState,
  ColorSwatchProps,
  ColorSwatchState,
} from './ColorSwatch.types';
import { useSwatchPickerContextValue_unstable } from '../../contexts/swatchPicker';
import { ProhibitedFilled } from '@fluentui/react-icons';
import { swatchCSSVars } from './ColorSwatch.constants';

/**
 * Create the basee state required to render unstyled ColorSwatch.
 *
 * The returned state can be modified with hooks before being passed to renderColorSwatch_unstable.
 *
 * @param props - props from this instance of ColorSwatch
 * @param ref - reference to root HTMLButtonElement of ColorSwatch
 */
export const useColorSwatchBase_unstable = (
  props: ColorSwatchBaseProps,
  ref: React.Ref<HTMLButtonElement>,
): ColorSwatchBaseState => {
  const { borderColor, color, disabled, disabledIcon, icon, value, onClick, style, ...rest } = props;
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
    [swatchCSSVars.borderColor]: borderColor,
  };

  const role = isGrid ? 'gridcell' : 'radio';
  const ariaSelected = isGrid
    ? {
        'aria-selected': selected,
      }
    : { 'aria-checked': selected };

  const iconShorthand = slot.optional(icon, { elementType: 'span' });
  const disabledIconShorthand = slot.optional(disabledIcon, {
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
    selected,
    color,
    value,
  };
};

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
  const sizeFromContext = useSwatchPickerContextValue_unstable(ctx => ctx.size);
  const shapeFromContext = useSwatchPickerContextValue_unstable(ctx => ctx.shape);
  const { size = sizeFromContext, shape = shapeFromContext, disabledIcon, ...rest } = props;

  const baseState = useColorSwatchBase_unstable(rest, ref);

  return {
    ...baseState,
    size,
    shape,
    disabledIcon: slot.optional(disabledIcon, {
      defaultProps: {
        ...baseState.disabledIcon,
        children: <ProhibitedFilled />,
      },
      renderByDefault: true,
      elementType: 'span',
    }),
  };
};
