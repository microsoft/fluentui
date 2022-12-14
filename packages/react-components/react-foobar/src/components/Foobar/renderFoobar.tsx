import * as React from 'react';
import { getSlots } from '@fluentui/react-utilities';
import type { FoobarState, FoobarSlots } from './Foobar.types';

/**
 * Render the final JSX of Foobar
 */
export const renderFoobar_unstable = (state: FoobarState) => {
  const { slots, slotProps } = getSlots<FoobarSlots>(state);

  // TODO Add additional slots in the appropriate place
  return <slots.root {...slotProps.root} />;
};
