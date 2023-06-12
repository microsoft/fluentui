import * as React from 'react';
import { getNativeElementProps } from '@fluentui/react-utilities';
import type { InfoButtonLabelProps, InfoButtonLabelState } from './InfoButtonLabel.types';

/**
 * Create the state required to render InfoButtonLabel.
 *
 * The returned state can be modified with hooks such as useInfoButtonLabelStyles_unstable,
 * before being passed to renderInfoButtonLabel_unstable.
 *
 * @param props - props from this instance of InfoButtonLabel
 * @param ref - reference to root HTMLElement of InfoButtonLabel
 */
export const useInfoButtonLabel_unstable = (
  props: InfoButtonLabelProps,
  ref: React.Ref<HTMLElement>,
): InfoButtonLabelState => {
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
