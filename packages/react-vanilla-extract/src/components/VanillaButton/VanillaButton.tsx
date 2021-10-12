import * as React from 'react';
import { renderVanillaButton } from './renderVanillaButton';
import { useVanillaButton } from './useVanillaButton';
import { useVanillaButtonStyles } from './useVanillaButtonStyles';
import type { VanillaButtonProps } from './VanillaButton.types';
import type { ForwardRefComponent } from '@fluentui/react-utilities';

/**
 * VanillaButtons give people a way to trigger an action.
 */
export const VanillaButton: ForwardRefComponent<VanillaButtonProps> = React.forwardRef((props, ref) => {
  const state = useVanillaButton(props, ref);

  useVanillaButtonStyles(state);

  return renderVanillaButton(state);
  // Casting is required due to lack of distributive union to support unions on @types/react
}) as ForwardRefComponent<VanillaButtonProps>;

VanillaButton.displayName = 'VanillaButton';
