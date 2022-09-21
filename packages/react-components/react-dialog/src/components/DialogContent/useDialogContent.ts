import * as React from 'react';
import { getNativeElementProps } from '@fluentui/react-utilities';
import type { DialogContentProps, DialogContentState } from './DialogContent.types';

/**
 * Create the state required to render DialogContent.
 *
 * The returned state can be modified with hooks such as useDialogContentStyles_unstable,
 * before being passed to renderDialogContent_unstable.
 *
 * @param props - props from this instance of DialogContent
 * @param ref - reference to root HTMLElement of DialogContent
 */
export const useDialogContent_unstable = (
  props: DialogContentProps,
  ref: React.Ref<HTMLElement>,
): DialogContentState => {
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
