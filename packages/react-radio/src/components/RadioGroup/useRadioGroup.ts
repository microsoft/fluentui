import * as React from 'react';
import { getNativeElementProps } from '@fluentui/react-utilities';
import { RadioGroupProps, RadioGroupState } from './RadioGroup.types';

/**
 * Create the state required to render RadioGroup.
 *
 * The returned state can be modified with hooks such as useRadioGroupStyles_unstable,
 * before being passed to renderRadioGroup_unstable.
 *
 * @param props - props from this instance of RadioGroup
 * @param ref - reference to root HTMLElement of RadioGroup
 */
export const useRadioGroup_unstable = (props: RadioGroupProps, ref: React.Ref<HTMLElement>): RadioGroupState => {
  const state: RadioGroupState = {
    components: {
      root: 'span',
    },
    root: getNativeElementProps('span', { ref, ...props }),
  };

  return state;
};
