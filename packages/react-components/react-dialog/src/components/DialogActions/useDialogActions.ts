import * as React from 'react';
import { getNativeElementProps, slot } from '@fluentui/react-utilities';
import type { DialogActionsProps, DialogActionsState } from './DialogActions.types';

/**
 * Create the state required to render DialogActions.
 *
 * The returned state can be modified with hooks such as useDialogActionsStyles_unstable,
 * before being passed to renderDialogActions_unstable.
 *
 * @param props - props from this instance of DialogActions
 * @param ref - reference to root HTMLElement of DialogActions
 */
export const useDialogActions_unstable = (
  props: DialogActionsProps,
  ref: React.Ref<HTMLElement>,
): DialogActionsState => {
  const { position = 'end', fluid = false } = props;
  return {
    components: {
      root: 'div',
    },
    root: slot.always(
      getNativeElementProps('div', {
        ref,
        ...props,
      }),
      { elementType: 'div' },
    ),
    position,
    fluid,
  };
};
