import * as React from 'react';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import { useSecondary_unstable } from './useSecondary';
import { renderSecondary_unstable } from './renderSecondary';
import { useSecondaryStyles_unstable } from './useSecondaryStyles.styles';
import type { SecondaryProps } from './Secondary.types';

/**
 * Secondary component - TODO: add more docs
 */
export const Secondary: ForwardRefComponent<SecondaryProps> = React.forwardRef((props, ref) => {
  const state = useSecondary_unstable(props, ref);

  useSecondaryStyles_unstable(state);
  return renderSecondary_unstable(state);
});

Secondary.displayName = 'Secondary';
