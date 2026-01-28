import * as React from 'react';
import { getIntrinsicElementProps, slot } from '@fluentui/react-utilities';
import { DialogContentProps, DialogContentState } from './DialogContent.types';

/**
 * Create the state required to render DialogBody.
 *
 * The returned state can be modified with hooks such as useDialogBodyStyles_unstable,
 * before being passed to renderDialogBody_unstable.
 *
 * @param props - props from this instance of DialogBody
 * @param ref - reference to root HTMLDivElement of DialogBody
 */
export const useDialogContent_unstable = (
  props: DialogContentProps,
  ref: React.Ref<HTMLDivElement>,
): DialogContentState => {
  return {
    components: {
      root: 'div',
    },
    root: slot.always(
      getIntrinsicElementProps(props.as ?? 'div', {
        ref: ref as React.Ref<HTMLDivElement>,
        tabIndex: 0,
        ...props,
      }),
      { elementType: 'div' },
    ),
  };
};
