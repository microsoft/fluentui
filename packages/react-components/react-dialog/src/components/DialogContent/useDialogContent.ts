import * as React from 'react';
import { getNativeElementProps } from '@fluentui/react-utilities';
import { useDialogContext_unstable } from '../../contexts';
import { DialogContentProps, DialogContentState } from './DialogContent.types';

/**
 * Create the state required to render DialogBody.
 *
 * The returned state can be modified with hooks such as useDialogBodyStyles_unstable,
 * before being passed to renderDialogBody_unstable.
 *
 * @param props - props from this instance of DialogBody
 * @param ref - reference to root HTMLElement of DialogBody
 */
export const useDialogContent_unstable = (
  props: DialogContentProps,
  ref: React.Ref<HTMLElement>,
): DialogContentState => {
  const dialogContentId = useDialogContext_unstable(ctx => ctx.dialogContentId);
  return {
    components: {
      root: 'div',
    },
    root: getNativeElementProps(props.as ?? 'div', {
      ref,
      id: dialogContentId,
      ...props,
    }),
  };
};
