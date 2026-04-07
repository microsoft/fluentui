'use client';

import * as React from 'react';
import { getIntrinsicElementProps, slot } from '@fluentui/react-utilities';
import type { DialogTitleProps, DialogTitleState } from './DialogTitle.types';
import { useDialogContext_unstable } from '../../contexts/dialogContext';
import { Dismiss16Regular } from '@fluentui/react-icons';
import { Button } from '@fluentui/react-button';
import { DialogTrigger } from '../DialogTrigger/DialogTrigger';

/**
 * Create the state required to render DialogTitle.
 *
 * The returned state can be modified with hooks such as useDialogTitleStyles_unstable,
 * before being passed to renderDialogTitle_unstable.
 *
 * @param props - props from this instance of DialogTitle
 * @param ref - reference to root HTMLElement of DialogTitle
 */
export const useDialogTitle_unstable = (props: DialogTitleProps, ref: React.Ref<HTMLDivElement>): DialogTitleState => {
  const { action, closeButton: closeButtonProps, ...restProps } = props;
  const modalType = useDialogContext_unstable(ctx => ctx.modalType);

  return {
    components: {
      root: 'h2',
      action: 'div',
    },
    root: slot.always(
      getIntrinsicElementProps('h2', {
        ref,
        id: useDialogContext_unstable(ctx => ctx.dialogTitleId),
        ...restProps,
      }),
      { elementType: 'h2' },
    ),
    action: slot.optional(action, {
      renderByDefault: modalType === 'non-modal',
      defaultProps: {
        children: (
          <DialogTrigger disableButtonEnhancement action="close">
            <Button
              appearance="transparent"
              aria-label="close"
              icon={<Dismiss16Regular />}
              size="small"
              {...closeButtonProps}
            />
          </DialogTrigger>
        ),
      },
      elementType: 'div',
    }),
  };
};
