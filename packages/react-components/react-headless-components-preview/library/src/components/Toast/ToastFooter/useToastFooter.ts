import type * as React from 'react';
import { getIntrinsicElementProps, slot } from '@fluentui/react-utilities';
import type { ToastFooterProps, ToastFooterState } from '@fluentui/react-toast';

export const useToastFooter = (props: ToastFooterProps, ref: React.Ref<HTMLElement>): ToastFooterState => {
  return {
    components: { root: 'div' },
    root: slot.always(
      getIntrinsicElementProps('div', {
        // FIXME: ref typed as HTMLElement upstream; cast to correct type
        ref: ref as React.Ref<HTMLDivElement>,
        ...props,
      }),
      { elementType: 'div' },
    ),
  };
};
