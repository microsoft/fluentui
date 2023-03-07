import * as React from 'react';
import { renderDivider_unstable } from './renderDivider';
import { useDivider_unstable } from './useDivider';
import { useDividerStyles_unstable } from './useDividerStyles';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import type { DividerProps } from './Divider.types';
import { useCustomStyleHooks_unstable } from '@fluentui/react-shared-contexts';

/**
 * A divider visually segments content into groups.
 */
export const Divider: ForwardRefComponent<DividerProps> = React.forwardRef((props, ref) => {
  const state = useDivider_unstable(props, ref);

  useDividerStyles_unstable(state);

  const { useDividerStyles_unstable: useCustomStyles } = useCustomStyleHooks_unstable();
  useCustomStyles(state);

  return renderDivider_unstable(state);
});

Divider.displayName = 'Divider';
