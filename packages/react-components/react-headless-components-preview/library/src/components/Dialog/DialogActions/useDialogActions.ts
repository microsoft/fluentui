import type * as React from 'react';
import { getIntrinsicElementProps, slot } from '@fluentui/react-utilities';
import type { DialogActionsProps, DialogActionsState } from './DialogActions.types';

/**
 * Create the state required to render DialogActions.
 *
 * @param props - props from this instance of DialogActions
 * @param ref - reference to root HTMLElement of DialogActions
 */
export const useDialogActions = (props: DialogActionsProps, ref: React.Ref<HTMLElement>): DialogActionsState => {
  return {
    components: { root: 'footer' },
    root: slot.always(getIntrinsicElementProps('footer', { ref, ...props }), { elementType: 'footer' }),
  };
};
