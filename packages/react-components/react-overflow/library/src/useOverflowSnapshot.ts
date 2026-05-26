'use client';

import type { OverflowSnapshot } from '@fluentui/priority-overflow';
// import { useIsomorphicLayoutEffect } from '@fluentui/react-utilities';
// import { flushSync } from 'react-dom';
import { useOverflowContext } from './overflowContext';
import * as React from 'react';

export const useOverflowSnapshot = (): OverflowSnapshot => {
  const { getSnapshot, subscribe } = useOverflowContext();
  // const [value, setValue] = React.useState(() => getSnapshot());
  // useIsomorphicLayoutEffect(
  //   () =>
  //     subscribe(() => {
  //       flushSync(() => {
  //         setValue(getSnapshot());
  //       });
  //     }),
  //   [getSnapshot, subscribe],
  // );
  // return value;
  return React.useSyncExternalStore(subscribe, getSnapshot, getSnapshot);
};
