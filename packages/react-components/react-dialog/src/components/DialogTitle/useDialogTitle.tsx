import * as React from 'react';
import { getNativeElementProps, slot } from '@fluentui/react-utilities';
import type { DialogTitleProps, DialogTitleState } from './DialogTitle.types';
import { useDialogContext_unstable } from '../../contexts/dialogContext';
import { Dismiss24Regular } from '@fluentui/react-icons';
import { DialogTrigger } from '../DialogTrigger/DialogTrigger';
import { useDialogTitleInternalStyles } from './useDialogTitleStyles.styles';

const defaultRootComponentType = 'h2';
const defaultActionComponentType = 'div';

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
  const { as = defaultRootComponentType, action } = props;
  const modalType = useDialogContext_unstable(ctx => ctx.modalType);
  const internalStyles = useDialogTitleInternalStyles();

  return {
    root: slot<DialogTitleProps>(
      getNativeElementProps(as, {
        ref,
        id: useDialogContext_unstable(ctx => ctx.dialogTitleId),
        ...props,
      }),
      { componentType: defaultRootComponentType, required: true },
    ),
    action: slot(action, {
      componentType: defaultActionComponentType,
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
              <Dismiss24Regular />
            </button>
          </DialogTrigger>
        ),
      },
    }),
  };
};
