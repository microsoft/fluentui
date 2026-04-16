'use client';

import type * as React from 'react';
import { getIntrinsicElementProps, slot } from '@fluentui/react-utilities';
import type { DialogFooterProps, DialogFooterState } from './DialogFooter.types';

/**
 * Create the state required to render DialogFooter.
 *
 * @param props - props from this instance of DialogFooter
 * @param ref - reference to root HTMLElement of DialogFooter
 */
export const useDialogFooter = (props: DialogFooterProps, ref: React.Ref<HTMLElement>): DialogFooterState => {
  return {
    components: { root: 'footer' },
    root: slot.always(getIntrinsicElementProps('footer', { ref, ...props }), { elementType: 'footer' }),
  };
};
