'use client';

import type * as React from 'react';
import { getIntrinsicElementProps, slot } from '@fluentui/react-utilities';
import type { ToastTitleBaseProps, ToastTitleBaseState } from '@fluentui/react-toast';
import { useToastContext } from '../toastContext';

export const useToastTitle = (props: ToastTitleBaseProps, ref: React.Ref<HTMLElement>): ToastTitleBaseState => {
  const { intent, titleId } = useToastContext();

  return {
    components: { root: 'div', media: 'div', action: 'div' },
    root: slot.always(
      getIntrinsicElementProps('div', {
        // FIXME: ref typed as HTMLElement upstream; cast to correct type
        ref: ref as React.Ref<HTMLDivElement>,
        id: titleId,
        ...props,
      }),
      { elementType: 'div' },
    ),
    // Render the media slot by default only when an intent is set — the
    // styled layer (or the consumer) fills it with the appropriate icon.
    media: slot.optional(props.media, {
      renderByDefault: !!intent,
      elementType: 'div',
    }),
    action: slot.optional(props.action, { elementType: 'div' }),
    intent,
  };
};
