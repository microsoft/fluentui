import type * as React from 'react';
import { getIntrinsicElementProps, slot } from '@fluentui/react-utilities';
import type { DialogActionsProps, DialogActionsState } from './DialogActions.types';

/**
 * Create the state required to render DialogActions.
 *
 * @param props - props from this instance of DialogActions
 * @param ref - reference to root HTMLDivElement of DialogActions
 */
export const useDialogActions = (props: DialogActionsProps, ref: React.Ref<HTMLDivElement>): DialogActionsState => {
  return {
    components: { root: 'div' },
    root: slot.always(getIntrinsicElementProps('div', { ref, ...props }), { elementType: 'div' }),
  };
};
