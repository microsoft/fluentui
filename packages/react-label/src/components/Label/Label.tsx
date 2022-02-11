import * as React from 'react';
import { useLabel_unstable } from './useLabel';
import type { LabelProps } from './Label.types';
import type { ForwardRefComponent } from '@fluentui/react-utilities';

/**
 * A label component provides a title or name to a component.
 */
export const Label: ForwardRefComponent<LabelProps> = React.forwardRef((props, ref) => {
  const [state, render] = useLabel_unstable(props, ref);
  return render(state);
});

Label.displayName = 'Label';
