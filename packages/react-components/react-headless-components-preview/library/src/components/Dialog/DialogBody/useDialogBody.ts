'use client';

import type * as React from 'react';
import { getIntrinsicElementProps, slot } from '@fluentui/react-utilities';
import type { DialogBodyProps, DialogBodyState } from './DialogBody.types';

/**
 * Create the state required to render DialogBody.
 *
 * @param props - props from this instance of DialogBody
 * @param ref - reference to root HTMLDivElement of DialogBody
 */
export const useDialogBody = (props: DialogBodyProps, ref: React.Ref<HTMLDivElement>): DialogBodyState => {
  return {
    components: { root: 'div' },
    root: slot.always(getIntrinsicElementProps('div', { ref, ...props }), { elementType: 'div' }),
  };
};
