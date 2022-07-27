import * as React from 'react';
import { getSlots } from '@fluentui/react-utilities';
import type { FieldState, FieldSlots } from './Field.types';

/**
 * Render the final JSX of Field
 */
export const renderField_unstable = (state: FieldState) => {
  const { slots, slotProps } = getSlots<FieldSlots>(state);

  // TODO Add additional slots in the appropriate place
  return <slots.root {...slotProps.root} />;
};
