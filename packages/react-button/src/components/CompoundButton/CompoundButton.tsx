import * as React from 'react';
import { useCompoundButton_unstable } from './useCompoundButton';
import type { CompoundButtonProps } from './CompoundButton.types';
import type { ForwardRefComponent } from '@fluentui/react-utilities';

/**
 * CompoundButtons are buttons that can have secondary content that adds extra information to the user.
 */
export const CompoundButton: ForwardRefComponent<CompoundButtonProps> = React.forwardRef((props, ref) => {
  const [state, render] = useCompoundButton_unstable(props, ref);
  return render(state);
  // Casting is required due to lack of distributive union to support unions on @types/react
}) as ForwardRefComponent<CompoundButtonProps>;

CompoundButton.displayName = 'CompoundButton';
