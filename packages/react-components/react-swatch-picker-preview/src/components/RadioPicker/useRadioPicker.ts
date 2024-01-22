import * as React from 'react';
import { getIntrinsicElementProps, slot, useId, useEventCallback, isHTMLElement } from '@fluentui/react-utilities';
import type { RadioPickerProps, RadioPickerState } from './RadioPicker.types';
import { useRadioPickerState_unstable } from './useRadioPickerState';
import { useArrowNavigationGroup } from '@fluentui/react-tabster';

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
    axis: 'grid-linear',
    memorizeCurrent: true,
  });

  const newProps = {
    ...props,
    ...(layout === 'grid' ? focusAttributes : {}),
  };

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
      ...slot.always(getIntrinsicElementProps('div', newProps, /*excludedPropNames:*/ ['onChange', 'name']), {
        elementType: 'div',
      }),
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
  };

  useRadioPickerState_unstable(state, props);

  return state;
  // return useRadioPickerState_unstable(state, props);
};
