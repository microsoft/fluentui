import * as React from 'react';
import { getNativeElementProps } from '@fluentui/react-utilities';
import type { DialogFooterProps, DialogFooterState } from './DialogFooter.types';

/**
 * Create the state required to render DialogFooter.
 *
 * The returned state can be modified with hooks such as useDialogFooterStyles_unstable,
 * before being passed to renderDialogFooter_unstable.
 *
 * @param props - props from this instance of DialogFooter
 * @param ref - reference to root HTMLElement of DialogFooter
 */
export const useDialogFooter_unstable = (props: DialogFooterProps, ref: React.Ref<HTMLElement>): DialogFooterState => {
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
