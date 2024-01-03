import * as React from 'react';
import { getIntrinsicElementProps, slot } from '@fluentui/react-utilities';
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
  const { layout = 'row' } = props;
  const focusAttributes = useArrowNavigationGroup({
    circular: true,
    axis: layout === 'row' ? 'both' : 'grid-linear',
    memorizeCurrent: true,
  });

  const state: RadioPickerState = {
    components: {
      root: 'div' as const,
    },
    root: slot.always(
      getIntrinsicElementProps('div', {
        ref,
        ...focusAttributes,
        ...props,
      }),
      { elementType: 'div' },
    ),
  };

  useRadioPickerState_unstable(state, props);

  return state;
};
