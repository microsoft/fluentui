import { useFluent_unstable } from '@fluentui/react-shared-contexts';
import * as React from 'react';

export function useTreeWalker(whatToShow?: number, filter?: NodeFilter | null) {
  const rootRef = React.useRef<HTMLElement>(null);
  const treeWalkerRef = React.useRef<TreeWalker | null>(null);
  const { targetDocument } = useFluent_unstable();

  React.useEffect(() => {
    if (rootRef.current && targetDocument) {
      treeWalkerRef.current = targetDocument.createTreeWalker(rootRef.current, whatToShow, filter);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return { treeWalker: treeWalkerRef as React.RefObject<TreeWalker>, root: rootRef };
}
