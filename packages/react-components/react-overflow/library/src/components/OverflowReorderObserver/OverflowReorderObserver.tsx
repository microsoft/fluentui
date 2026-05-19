'use client';

import * as React from 'react';
import { useOverflowContext } from '../../overflowContext';

/**
 * Renderless opt-in component that observes the `<Overflow>` container for
 * direct-child DOM mutations and triggers an overflow recompute. Drop it
 * inside `<Overflow>` when items can be reordered, added, or removed via
 * React state without a container resize — Fluent's overflow manager only
 * listens to `ResizeObserver` otherwise, so reorders leave visibility flags
 * stale.
 *
 * @example
 * ```tsx
 * <Overflow>
 *   <div>
 *     <OverflowReorderObserver />
 *     {items.map(id => <OverflowItem key={id} id={id} priority={1}>{id}</OverflowItem>)}
 *   </div>
 * </Overflow>
 * ```
 */
export const OverflowReorderObserver: React.FC = () => {
  const containerRef = useOverflowContext(v => v.containerRef);
  const updateOverflow = useOverflowContext(v => v.updateOverflow);

  React.useEffect(() => {
    const el = containerRef?.current;
    const win = el?.ownerDocument.defaultView;
    if (!el || !win?.MutationObserver) {
      return;
    }

    const mutationObserver = new win.MutationObserver(() => updateOverflow());
    mutationObserver.observe(el, { childList: true });

    return () => mutationObserver.disconnect();
  }, [containerRef, updateOverflow]);

  return null;
};
