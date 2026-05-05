'use client';

import type * as React from 'react';
import { getIntrinsicElementProps, slot } from '@fluentui/react-utilities';
import type { ToastBodyBaseProps, ToastBodyBaseState } from '@fluentui/react-toast';
import { useToastContext } from '../toastContext';

export const useToastBody = (props: ToastBodyBaseProps, ref: React.Ref<HTMLElement>): ToastBodyBaseState => {
  const { bodyId } = useToastContext();

  return {
    components: { root: 'div', subtitle: 'div' },
    root: slot.always(
      getIntrinsicElementProps('div', {
        // FIXME: ref typed as HTMLElement upstream; cast to correct type
        ref: ref as React.Ref<HTMLDivElement>,
        id: bodyId,
        ...props,
      }),
      { elementType: 'div' },
    ),
    subtitle: slot.optional(props.subtitle, { elementType: 'div' }),
  };
};
