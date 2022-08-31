import * as React from 'react';
import { getNativeElementProps } from '@fluentui/react-utilities';
import type { DialogTitleProps, DialogTitleState } from './DialogTitle.types';
import { useARIAButtonShorthand } from '@fluentui/react-aria';
import { useDialogContext_unstable } from '../../contexts/dialogContext';
import { Dismiss24Regular } from '@fluentui/react-icons';

/**
 * Create the state required to render DialogTitle.
 *
 * The returned state can be modified with hooks such as useDialogTitleStyles_unstable,
 * before being passed to renderDialogTitle_unstable.
 *
 * @param props - props from this instance of DialogTitle
 * @param ref - reference to root HTMLElement of DialogTitle
 */
export const useDialogTitle_unstable = (props: DialogTitleProps, ref: React.Ref<HTMLElement>): DialogTitleState => {
  const { as = 'div', closeButton } = props;
  const modalType = useDialogContext_unstable(ctx => ctx.modalType);

  return {
    components: {
      root: 'div',
      closeButton: 'button',
    },
    root: getNativeElementProps(as, {
      ref,
      id: useDialogContext_unstable(ctx => ctx.dialogTitleID),
      ...props,
    }),
    closeButton: useARIAButtonShorthand(closeButton, {
      required: modalType === 'non-modal',
      defaultProps: {
        type: 'button', // This is added because the default for type is 'submit'
        'aria-label': 'close', // TODO: find a better way to add internal labels
        children: <Dismiss24Regular />,
      },
    }),
  };
};
