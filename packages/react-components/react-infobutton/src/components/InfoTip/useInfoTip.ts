import * as React from 'react';
import { getNativeElementProps } from '@fluentui/react-utilities';
import type { InfoTipProps, InfoTipState } from './InfoTip.types';

/**
 * Create the state required to render InfoTip.
 *
 * The returned state can be modified with hooks such as useInfoTipStyles_unstable,
 * before being passed to renderInfoTip_unstable.
 *
 * @param props - props from this instance of InfoTip
 * @param ref - reference to root HTMLElement of InfoTip
 */
export const useInfoTip_unstable = (props: InfoTipProps, ref: React.Ref<HTMLElement>): InfoTipState => {
  return {
    // TODO add appropriate props/defaults
    components: {
      // TODO add each slot's element type or component
      root: 'div',
    },
    // TODO add appropriate slots, for example:
    // mySlot: resolveShorthand(props.mySlot),
    root: getNativeElementProps('div', {
      ref,
      ...props,
    }),
  };
};
