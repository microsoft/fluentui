import * as React from 'react';
import { getNativeElementProps } from '@fluentui/react-utilities';
import { RadioProps, RadioSlots, RadioState } from './Radio.types';

/**
 * Array of all shorthand properties listed in RadioShorthandProps
 */
export const radioShorthandProps: Array<keyof RadioSlots> = ['root'];

/**
 * Create the state required to render Radio.
 *
 * The returned state can be modified with hooks such as useRadioStyles,
 * before being passed to renderRadio.
 *
 * @param props - props from this instance of Radio
 * @param ref - reference to root HTMLElement of Radio
 * @param defaultProps - (optional) default prop values provided by the implementing type
 */
export const useRadio = (props: RadioProps, ref: React.Ref<HTMLElement>): RadioState => {
  const state: RadioState = {
    components: {
      root: 'span',
    },
    root: getNativeElementProps('span', { ref, ...props }),
  };

  return state;
};
