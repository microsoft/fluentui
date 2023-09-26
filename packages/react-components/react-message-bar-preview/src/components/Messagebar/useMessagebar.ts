import * as React from 'react';
import { getNativeElementProps, slot } from '@fluentui/react-utilities';
import type { MessagebarProps, MessagebarState } from './Messagebar.types';

/**
 * Create the state required to render Messagebar.
 *
 * The returned state can be modified with hooks such as useMessagebarStyles_unstable,
 * before being passed to renderMessagebar_unstable.
 *
 * @param props - props from this instance of Messagebar
 * @param ref - reference to root HTMLElement of Messagebar
 */
export const useMessagebar_unstable = (props: MessagebarProps, ref: React.Ref<HTMLElement>): MessagebarState => {
  return {
    // TODO add appropriate props/defaults
    components: {
      // TODO add each slot's element type or component
      root: 'div',
    },
    // TODO add appropriate slots, for example:
    // mySlot: resolveShorthand(props.mySlot),
    root: slot.always(
      getNativeElementProps('div', {
        ref,
        ...props,
      }),
      { elementType: 'div' },
    ),
  };
};
