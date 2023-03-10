import * as React from 'react';
import { getNativeElementProps } from '@fluentui/react-utilities';
import type { DialogBodyProps, DialogBodyState } from './DialogBody.types';

/**
 * Create the state required to render DialogBody.
 *
 * The returned state can be modified with hooks such as useDialogBodyStyles_unstable,
 * before being passed to renderDialogBody_unstable.
 *
 * @param props - props from this instance of DialogBody
 * @param ref - reference to root HTMLElement of DialogBody
 */
export const useDialogBody_unstable = (props: DialogBodyProps, ref: React.Ref<HTMLElement>): DialogBodyState => {
  return {
    components: {
      root: 'div',
    },
    root: getNativeElementProps(props.as ?? 'div', {
      ref,
      ...props,
    }),
  };
};
