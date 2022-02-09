import * as React from 'react';
import { getNativeElementProps } from '@fluentui/react-utilities';
import type { DialogProps, DialogState } from './Dialog.types';

/**
 * Create the state required to render Dialog.
 *
 * The returned state can be modified with hooks such as useDialogStyles_unstable,
 * before being passed to renderDialog_unstable.
 *
 * @param props - props from this instance of Dialog
 * @param ref - reference to root HTMLElement of Dialog
 */
export const useDialog_unstable = (props: DialogProps, ref: React.Ref<HTMLElement>): DialogState => {
  return {
    // TODO add appropriate props/defaults
    components: {
      // TODO add slot types here if needed (div is the default)
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
