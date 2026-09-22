'use client';

import * as React from 'react';
import { useMergedRefs } from '@fluentui/react-utilities';
import {
  useMenuSplitGroup as useMenuSplitGroupBase,
  useMenuSplitGroupContextValues,
} from '@fluentui/react-headless-components-preview/menu';

export { useMenuSplitGroupContextValues };

export const useMenuSplitGroup = (
  props: Parameters<typeof useMenuSplitGroupBase>[0],
  ref: Parameters<typeof useMenuSplitGroupBase>[1],
): ReturnType<typeof useMenuSplitGroupBase> => {
  const [multiline] = React.useState(() => {
    let root: HTMLElement | null = null;
    let value = false;

    const apply = () => root?.toggleAttribute('data-multiline', value);

    return {
      ref: (node: HTMLElement | null) => {
        root = node;
        apply();
      },
      set: (nextValue: boolean) => {
        value = nextValue;
        apply();
      },
    };
  });
  const state = useMenuSplitGroupBase(props, useMergedRefs(ref, multiline.ref));

  return { ...state, setMultiline: multiline.set };
};
