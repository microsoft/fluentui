import * as React from 'react';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import { usePrimary_unstable } from './usePrimary';
import { renderPrimary_unstable } from './renderPrimary';
import { usePrimaryStyles_unstable } from './usePrimaryStyles.styles';
import type { PrimaryProps } from './Primary.types';
import { usePrimaryContextValues_unstable } from './usePrimaryContextValues';

/**
 * Primary component - TODO: add more docs
 */
export const Primary: ForwardRefComponent<PrimaryProps> = React.forwardRef((props, ref) => {
  const state = usePrimary_unstable(props, ref);

  usePrimaryStyles_unstable(state);
  return renderPrimary_unstable(state, usePrimaryContextValues_unstable(state));
});

Primary.displayName = 'Primary';
