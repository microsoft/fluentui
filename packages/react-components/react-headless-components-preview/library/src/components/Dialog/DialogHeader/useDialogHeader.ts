import type * as React from 'react';
import { getIntrinsicElementProps, slot } from '@fluentui/react-utilities';
import type { DialogHeaderProps, DialogHeaderState } from './DialogHeader.types';

/**
 * Create the state required to render DialogHeader.
 *
 * @param props - props from this instance of DialogHeader
 * @param ref - reference to root HTMLElement of DialogHeader
 */
export const useDialogHeader = (props: DialogHeaderProps, ref: React.Ref<HTMLElement>): DialogHeaderState => {
  return {
    components: { root: 'header' },
    root: slot.always(getIntrinsicElementProps('header', { ref, ...props }), { elementType: 'header' }),
  };
};
