import * as React from 'react';
import { slotFromProps, slotFromShorthand } from '@fluentui/react-utilities';
import type { DialogTitleProps, DialogTitleSlots, DialogTitleState } from './DialogTitle.types';
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
  const { as = 'h2', action } = props;
  const modalType = useDialogContext_unstable(ctx => ctx.modalType);
  const internalStyles = useDialogTitleInternalStyles();
  const dialogTitleId = useDialogContext_unstable(ctx => ctx.dialogTitleId);

  return {
    components: { root: 'div', action: 'div' },
    root: slotFromProps<DialogTitleSlots>(props, {
      ref,
      elementType: as,
      defaultProps: { id: dialogTitleId },
    }),
    action: slotFromShorthand(action, {
      elementType: 'div',
      required: modalType === 'non-modal',
      defaultProps: {
        children: (
          <DialogTrigger disableButtonEnhancement action="close">
            <button
              type="button"
              className={internalStyles.button}
              // TODO: find a better way to add internal labels
              aria-label="close"
            >
              <Dismiss20Regular />
            </button>
          </DialogTrigger>
        ),
      },
    }),
  };
};
