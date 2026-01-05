import * as React from 'react';
import type { DistributiveOmit, ForwardRefComponent } from '@fluentui/react-utilities';
import { useToggleButtonBase_unstable } from './useToggleButtonBase';
import { renderToggleButton_unstable } from './renderToggleButton';
import type { ToggleButtonProps, ToggleButtonState } from './ToggleButton.types';
import { toggleButtonClassNames } from './useToggleButtonStyles.styles';

type ToggleButtonUnstyledProps = DistributiveOmit<ToggleButtonProps, 'appearance' | 'shape' | 'size'>;

/**
 * ToggleButtonUnstyled component definition - the unstyled version of ToggleButton.
 */
export const ToggleButtonUnstyled: ForwardRefComponent<ToggleButtonUnstyledProps> = React.forwardRef((props, ref) => {
  const state = useToggleButtonBase_unstable(props, ref);

  // We could also set .fui-[ComponentName] class names here for styling purposes
  // or rely on the data/aria attributes that are already set in the useButtonBase_unstable.
  state.root.className = [
    `.${toggleButtonClassNames.root}`,
    state.checked && `.${toggleButtonClassNames.root}--checked`,
    // ... other states
    state.root.className,
  ]
    .filter(Boolean)
    .join(' ');

  return renderToggleButton_unstable(state as ToggleButtonState);
});
