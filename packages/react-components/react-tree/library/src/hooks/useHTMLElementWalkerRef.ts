import * as React from 'react';
import { useFluent_unstable } from '@fluentui/react-shared-contexts';
import { HTMLElementWalker, createHTMLElementWalker } from '../utils/createHTMLElementWalker';
import { treeItemFilter } from '../utils/treeItemFilter';

export function useHTMLElementWalkerRef(): {
  walkerRef: React.MutableRefObject<HTMLElementWalker | undefined>;
  rootRef: React.Ref<HTMLElement>;
} {
  const { targetDocument } = useFluent_unstable();

  const walkerRef = React.useRef<HTMLElementWalker>(undefined);

  const rootRef: React.Ref<HTMLElement> = React.useCallback(
    (root: HTMLElement) => {
      walkerRef.current =
        targetDocument && root ? createHTMLElementWalker(root, targetDocument, treeItemFilter) : undefined;
    },
    [targetDocument],
  );
  return { walkerRef, rootRef } as const;
}
