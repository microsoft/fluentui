import * as React from 'react';
import { useRadioItem_unstable } from './useRadioItem';
import type { RadioItemProps } from './RadioItem.types';
import type { ForwardRefComponent } from '@fluentui/react-utilities';

/**
 * RadioItem component is a wrapper for a radio button with a label.
 */
export const RadioItem: ForwardRefComponent<RadioItemProps> = React.forwardRef((props, ref) => {
  const [state, render] = useRadioItem_unstable(props, ref);
  return render(state);
});

RadioItem.displayName = 'RadioItem';
