import * as React from 'react';
import { getIntrinsicElementProps, slot } from '@fluentui/react-utilities';
import type { DialogTitleProps, DialogTitleState } from './DialogTitle.types';
import { useDialogContext_unstable } from '../../contexts/dialogContext';
import { Dismiss20Regular } from '@fluentui/react-icons';
import { DialogTrigger } from '../DialogTrigger/DialogTrigger';
import { useDialogTitleInternalStyles } from './useDialogTitleStyles.styles';

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
  const { action } = props;
  const modalType = useDialogContext_unstable(ctx => ctx.modalType);
  const internalStyles = useDialogTitleInternalStyles();

  return {
    components: {
      root: 'h2',
      action: 'div',
    },
    root: slot.always(
      getIntrinsicElementProps('h2', {
        ref,
        id: useDialogContext_unstable(ctx => ctx.dialogTitleId),
        ...props,
      }),
      { elementType: 'h2' },
    ),
    action: slot.optional(action, {
      renderByDefault: modalType === 'non-modal',
      defaultProps: {
        children: (
          <DialogTrigger disableButtonEnhancement action="close">
            <button
              type="button"
              className={internalStyles}
              // TODO: find a better way to add internal labels
              aria-label="close"
            >
              <Dismiss20Regular />
            </button>
          </DialogTrigger>
        ),
      },
      elementType: 'div',
    }),
  };
};
