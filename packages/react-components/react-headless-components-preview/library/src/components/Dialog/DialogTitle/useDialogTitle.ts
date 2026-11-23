'use client';

import type * as React from 'react';
import { slot } from '@fluentui/react-utilities';
import { useDialogContext } from '../dialogContext';
import type { DialogTitleProps, DialogTitleState } from './DialogTitle.types';

/**
 * Create the state required to render DialogTitle.
 *
 * Sets `id` to the dialog's generated title id so that `DialogSurface`
 * can reference it via `aria-labelledby` for accessible naming.
 *
 * @param props - props from this instance of DialogTitle
 * @param ref - reference to root HTMLHeadingElement of DialogTitle
 */
export const useDialogTitle = (props: DialogTitleProps, ref: React.Ref<HTMLHeadingElement>): DialogTitleState => {
  const { dialogTitleId } = useDialogContext();

  return {
    components: { root: 'h2' },
    root: slot.always(
      {
        ref,
        ...props,
        // Must match aria-labelledby in DialogSurface for accessible naming
        id: dialogTitleId,
      },
      { elementType: 'h2' },
    ),
  };
};
