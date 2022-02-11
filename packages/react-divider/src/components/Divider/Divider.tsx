import * as React from 'react';
import { useDivider_unstable } from './useDivider';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import type { DividerProps } from './Divider.types';

/**
 * A divider visually segments content into groups.
 */
export const Divider: ForwardRefComponent<DividerProps> = React.forwardRef((props, ref) => {
  const [state, render] = useDivider_unstable(props, ref);
  return render(state);
});

Divider.displayName = 'Divider';
