import * as React from 'react';
import { getNativeElementProps } from '@fluentui/react-utilities';
import { RadioProps, RadioState, RadioRender } from './Radio.types';

/**
 * Create the state required to render Radio.
 *
 * The returned state can be modified with hooks such as useRadioStyles_unstable,
 * before being passed to renderRadio_unstable.
 *
 * @param props - props from this instance of Radio
 * @param ref - reference to root HTMLElement of Radio
 */
export const useRadio_unstable = (props: RadioProps, ref: React.Ref<HTMLElement>): [RadioState, RadioRender] => {
  const state: RadioState = {
    components: {
      root: 'span',
    },
    root: getNativeElementProps('span', { ref, ...props }),
  };

  return state;
};
