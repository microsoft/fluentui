import * as React from 'react';
import { getIntrinsicElementProps, slot } from '@fluentui/react-utilities';
import type { RadioPickerProps, RadioPickerState } from './RadioPicker.types';
import { RadioGroup } from '@fluentui/react-radio';

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
  return {
    components: {
      root: RadioGroup,
    },
    root: slot.always(
      getIntrinsicElementProps('div', {
        ref,
        ...props,
      }),
      { elementType: 'div' },
    ),
  };
};
