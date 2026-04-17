'use client';

import type * as React from 'react';
import { useFluent_unstable as useFluent } from '@fluentui/react-shared-contexts';
import { useFocusVisible } from '@fluentui/react-tabster';
import { getIntrinsicElementProps, slot, useMergedRefs } from '@fluentui/react-utilities';

import type { ProviderProps, ProviderState } from './Provider.types';

export const useProvider = (props: ProviderProps, ref: React.Ref<HTMLDivElement>): ProviderState => {
  const parentContext = useFluent();

  const { dir = parentContext.dir, targetDocument = parentContext.targetDocument } = props;

  return {
    dir,
    targetDocument,
    components: {
      root: 'div',
    },
    root: slot.always(
      getIntrinsicElementProps('div', {
        ...props,
        dir,
        ref: useMergedRefs(ref, useFocusVisible<HTMLDivElement>({ targetDocument })),
      }),
      { elementType: 'div' },
    ),
  };
};
