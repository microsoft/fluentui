'use client';

import * as React from 'react';
import type { OverflowSnapshot } from '@fluentui/priority-overflow';
import { useOverflowContext } from './overflowContext';

export function useOverflowSelector<T>(selector: (snapshot: OverflowSnapshot) => T): T {
  const manager = useOverflowContext(ctx => ctx.manager);

  return React.useSyncExternalStore(
    manager.subscribe,
    () => selector(manager.getSnapshot()),
    () => selector(manager.getSnapshot()),
  );
}
