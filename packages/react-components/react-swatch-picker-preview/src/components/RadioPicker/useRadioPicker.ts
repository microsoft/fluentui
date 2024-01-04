import * as React from 'react';
import { getIntrinsicElementProps, slot, useId, useEventCallback, isHTMLElement } from '@fluentui/react-utilities';
import type { RadioPickerProps, RadioPickerState } from './RadioPicker.types';
import { useArrowNavigationGroup } from '@fluentui/react-tabster';
import { useRadioPickerState_unstable } from './useRadioPickerState';
/**
 * Create the state required to render RadioPicker.
 *
 * The returned state can be modified with hooks such as useRadioPickerStyles_unstable,
 * before being passed to renderRadioPicker_unstable.
 *
 * @param props - props from this instance of RadioPicker
 * @param ref - reference to root HTMLDivElement of RadioPicker
 */
export const useRadioPicker_unstable = (props: RadioPickerProps, ref: React.Ref<HTMLDivElement>): RadioPickerState => {
  const generatedName = useId('radiogroup-');
  const {
    name = generatedName,
    value,
    defaultValue,
    disabled,
    layout = 'row',
    onChange,
    required,
    shape = 'square',
    size = 'medium',
    columnCount = 2,
  } = props;

  const focusAttributes = useArrowNavigationGroup({
    circular: true,
    axis: layout === 'row' ? 'both' : 'grid-linear',
    memorizeCurrent: true,
  });

  const state: RadioPickerState = {
    layout,
    shape,
    columnCount,
    size,
    name,
    value,
    defaultValue,
    disabled,
    required,
    components: {
      root: 'div' as const,
    },
    root: {
      ref,
      role: 'radiogroup',
      ...slot.always(getIntrinsicElementProps('div', props, /*excludedPropNames:*/ ['onChange', 'name']), {
        elementType: 'div',
      }),
      // ...focusAttributes,
      onChange: useEventCallback(ev => {
        if (
          onChange &&
          isHTMLElement(ev.target, { constructorName: 'HTMLInputElement' }) &&
          ev.target.type === 'radio'
        ) {
          onChange(ev, { value: ev.target.value });
        }
      }),
    },
    // root: slot.always(
    //   getIntrinsicElementProps('div', {
    //     ref,
    //     ...focusAttributes,
    //     ...props,
    //   }),

    //   { elementType: 'div' },
    // ),
  };

  useRadioPickerState_unstable(state, props);

  return state;
  // return useRadioPickerState_unstable(state, props);
};
