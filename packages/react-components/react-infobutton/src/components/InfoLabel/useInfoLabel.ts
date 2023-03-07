import * as React from 'react';
import { getNativeElementProps } from '@fluentui/react-utilities';
import type { InfoLabelProps, InfoLabelState } from './InfoLabel.types';

/**
 * Create the state required to render InfoLabel.
 *
 * The returned state can be modified with hooks such as useInfoLabelStyles_unstable,
 * before being passed to renderInfoLabel_unstable.
 *
 * @param props - props from this instance of InfoLabel
 * @param ref - reference to root HTMLElement of InfoLabel
 */
export const useInfoLabel_unstable = (props: InfoLabelProps, ref: React.Ref<HTMLElement>): InfoLabelState => {
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
