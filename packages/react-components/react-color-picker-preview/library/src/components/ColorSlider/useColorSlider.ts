import * as React from 'react';
import { tinycolor } from '@ctrl/tinycolor';
import {
  getPartitionedNativeProps,
  useId,
  slot,
  clamp,
  useControllableState,
  useEventCallback,
} from '@fluentui/react-utilities';
import { colorSliderCSSVars } from './useColorSliderStyles.styles';
import { useFluent_unstable as useFluent } from '@fluentui/react-shared-contexts';
import type { ColorSliderProps, ColorSliderState } from './ColorSlider.types';
import { useColorPickerContextValue_unstable } from '../../contexts/colorPicker';
import { MIN, HUE_MAX as MAX } from '../../utils/constants';
import { getPercent } from '../../utils/getPercent';

/**
 * Create the state required to render ColorSlider.
 *
 * The returned state can be modified with hooks such as useColorSliderStyles_unstable,
 * before being passed to renderColorSlider_unstable.
 *
 * @param props - props from this instance of ColorSlider
 * @param ref - reference to root HTMLInputElement of ColorSlider
 */
export const useColorSlider_unstable = (
  props: ColorSliderProps,
  ref: React.Ref<HTMLInputElement>,
): ColorSliderState => {
  'use no memo';

  const { dir } = useFluent();
  const onChangeFromContext = useColorPickerContextValue_unstable(ctx => ctx.requestChange);
  const colorFromContext = useColorPickerContextValue_unstable(ctx => ctx.color);
  const nativeProps = getPartitionedNativeProps({
    props,
    primarySlotTagName: 'input',
    excludedPropNames: ['onChange'],
  });

  const {
    color,
    onChange = onChangeFromContext,
    vertical,
    // Slots
    root,
    input,
    rail,
    thumb,
  } = props;

  const _color = colorFromContext || color;
  const hsvColor = tinycolor(_color).toHsv();

  const [currentValue, setCurrentValue] = useControllableState({
    state: hsvColor.h,
    initialState: 0,
  });
  const clampedValue = clamp(currentValue, MIN, MAX);
  const valuePercent = getPercent(clampedValue, MIN, MAX);

  const inputOnChange = input?.onChange;

  const _onChange: React.ChangeEventHandler<HTMLInputElement> = useEventCallback(event => {
    const newValue = Number(event.target.value);
    const newColor = tinycolor({ ...hsvColor, h: newValue }).toRgbString();
    setCurrentValue(clamp(newValue, MIN, MAX));
    inputOnChange?.(event);
    onChange?.(event, { type: 'change', event, color: newColor });
    onChangeFromContext(event, {
      color: newColor,
    });
  });

  const rootVariables = {
    [colorSliderCSSVars.sliderDirectionVar]: vertical ? '180deg' : dir === 'ltr' ? '-90deg' : '90deg',
    [colorSliderCSSVars.sliderProgressVar]: `${valuePercent}%`,
    [colorSliderCSSVars.thumbColorVar]: `hsl(${clampedValue}, 100%, 50%)`,
  };

  const state: ColorSliderState = {
    vertical,
    components: {
      input: 'input',
      rail: 'div',
      root: 'div',
      thumb: 'div',
    },
    root: slot.always(root, {
      defaultProps: nativeProps.root,
      elementType: 'div',
    }),
    input: slot.always(input, {
      defaultProps: {
        id: useId('slider-', props.id),
        ref,
        min: MIN,
        max: MAX,
        ...nativeProps.primary,
        type: 'range',
      },
      elementType: 'input',
    }),
    rail: slot.always(rail, { elementType: 'div' }),
    thumb: slot.always(thumb, { elementType: 'div' }),
  };

  // Root props
  state.root.style = {
    ...rootVariables,
    ...state.root.style,
  };

  // Input Props
  state.input.value = clampedValue;
  state.input.onChange = _onChange;
  return state;
};
