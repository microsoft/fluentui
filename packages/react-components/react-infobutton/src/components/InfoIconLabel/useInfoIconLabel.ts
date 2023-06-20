import * as React from 'react';
import { getNativeElementProps } from '@fluentui/react-utilities';
import type { InfoIconLabelProps, InfoIconLabelState } from './InfoIconLabel.types';

/**
 * Create the state required to render InfoIconLabel.
 *
 * The returned state can be modified with hooks such as useInfoIconLabelStyles_unstable,
 * before being passed to renderInfoIconLabel_unstable.
 *
 * @param props - props from this instance of InfoIconLabel
 * @param ref - reference to root HTMLElement of InfoIconLabel
 */
export const useInfoIconLabel_unstable = (
  props: InfoIconLabelProps,
  ref: React.Ref<HTMLElement>,
): InfoIconLabelState => {
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
