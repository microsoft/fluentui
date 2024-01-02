import * as React from 'react';
import { getIntrinsicElementProps, slot } from '@fluentui/react-utilities';
import type { RadioPickerProps, RadioPickerState } from './RadioPicker.types';
import { RadioGroup } from '@fluentui/react-radio';
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
  const { layout = 'row', columnCount = 2 } = props;
  const focusAttributes = useArrowNavigationGroup({
    circular: true,
    axis: layout === 'row' ? 'both' : 'grid-linear',
    memorizeCurrent: true,
  });

  console.log(columnCount);

  const state = {
    components: {
      root: RadioGroup,
    },
    root: slot.always(
      getIntrinsicElementProps('div', {
        ref,
        ...focusAttributes,
        ...props,
      }),
      { elementType: 'div' },
    ),
    layout,
    columnCount,
  };

  useRadioPickerState_unstable(state, props);

  return state;
};
