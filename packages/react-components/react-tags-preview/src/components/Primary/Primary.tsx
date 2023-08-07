import * as React from 'react';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import { usePrimary_unstable } from './usePrimary';
import { renderPrimary_unstable } from './renderPrimary';
import { usePrimaryStyles_unstable } from './usePrimaryStyles.styles';
import type { PrimaryProps } from './Primary.types';
import { useTagAvatarContextValues_unstable } from '../../utils';

/**
 * Primary component - used as the first child of the `InteractionTag` component.
 * Provides visual attributes such as media, icon, primary and secondary text, as well as the ability to attach a primary action.
 */
export const Primary: ForwardRefComponent<PrimaryProps> = React.forwardRef((props, ref) => {
  const state = usePrimary_unstable(props, ref);

  usePrimaryStyles_unstable(state);
  return renderPrimary_unstable(state, useTagAvatarContextValues_unstable(state));
});

Primary.displayName = 'Primary';
