import * as React from 'react';
import { getNativeElementProps } from '@fluentui/react-utilities';
import type { DialogHeaderProps, DialogHeaderState } from './DialogHeader.types';

/**
 * Create the state required to render DialogHeader.
 *
 * The returned state can be modified with hooks such as useDialogHeaderStyles_unstable,
 * before being passed to renderDialogHeader_unstable.
 *
 * @param props - props from this instance of DialogHeader
 * @param ref - reference to root HTMLElement of DialogHeader
 */
export const useDialogHeader_unstable = (props: DialogHeaderProps, ref: React.Ref<HTMLElement>): DialogHeaderState => {
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
