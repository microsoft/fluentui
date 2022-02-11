import * as React from 'react';
import { useRadio_unstable } from './useRadio';
import { RadioProps } from './Radio.types';
import type { ForwardRefComponent } from '@fluentui/react-utilities';

/**
 * A Radio component presents a set of options where only one option can be selected.
 */
export const Radio: ForwardRefComponent<RadioProps> = React.forwardRef((props, ref) => {
  const [state, render] = useRadio_unstable(props, ref);
  return render(state);
});

Radio.displayName = 'Radio';
