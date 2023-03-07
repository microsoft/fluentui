import * as React from 'react';
import { useFluent_unstable } from '@fluentui/react-shared-contexts';
import { createHTMLElementWalker, HTMLElementWalker } from '../utils/createHTMLElementWalker';

export function useTreeItemWalker() {
  const rootRef = React.useRef<HTMLDivElement>(null);
  const treeWalkerRef = React.useRef<HTMLElementWalker | null>(null);
  const { targetDocument } = useFluent_unstable();
  React.useEffect(() => {
    if (rootRef.current && targetDocument) {
      treeWalkerRef.current = createHTMLElementWalker(rootRef.current, treeItemFilter);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return [treeWalkerRef, rootRef] as const;
}

export function treeItemFilter(element: HTMLElement) {
  return element.getAttribute('role') === 'treeitem' ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_SKIP;
}
