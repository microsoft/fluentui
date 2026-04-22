'use client';

import * as React from 'react';
import { useFluent_unstable as useFluent } from '@fluentui/react-shared-contexts';
import { slot } from '@fluentui/react-utilities';

import type { ProviderProps, ProviderState } from './Provider.types';

export const useProvider = (props: ProviderProps, ref: React.Ref<HTMLDivElement>): ProviderState => {
  const parentContext = useFluent();
  const { children, dir, targetDocument } = props;

  return {
    dir: dir || parentContext.dir,
    targetDocument: targetDocument || parentContext.targetDocument,
    components: { root: React.Fragment },
    root: slot.always({ children }, { elementType: React.Fragment }),
  };
};
