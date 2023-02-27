import * as React from 'react';
import { useFluent_unstable } from '@fluentui/react-shared-contexts';

export function useDOMTreeWalker(whatToShow?: number, filter?: NodeFilter | null) {
  const rootRef = React.useRef<HTMLDivElement>(null);
  const treeWalkerRef = React.useRef<TreeWalker | null>(null);
  const { targetDocument } = useFluent_unstable();
  React.useEffect(() => {
    if (rootRef.current && targetDocument) {
      treeWalkerRef.current = targetDocument.createTreeWalker(rootRef.current, whatToShow, filter);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return [treeWalkerRef as React.RefObject<TreeWalker>, rootRef] as const;
}
