import * as React from 'react';
import { useFluent_unstable } from '@fluentui/react-shared-contexts';
import { HTMLElementWalker, createHTMLElementWalker } from '../utils/createHTMLElementWalker';
import { treeItemFilter } from '../utils/treeItemFilter';

export function useHTMLElementWalkerRef() {
  const { targetDocument } = useFluent_unstable();

  const walkerRef = React.useRef<HTMLElementWalker>();

  const rootRef: React.Ref<HTMLElement> = React.useCallback(
    root => {
      walkerRef.current =
        targetDocument && root ? createHTMLElementWalker(root, targetDocument, treeItemFilter) : undefined;
    },
    [targetDocument],
  );
  return { walkerRef, rootRef } as const;
}
