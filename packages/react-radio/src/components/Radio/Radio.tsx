import * as React from 'react';
import { useRadio_unstable } from './useRadio';
import { RadioProps } from './Radio.types';
import { renderRadio_unstable } from './renderRadio';
import { useRadioStyles_unstable } from './useRadioStyles';
import type { ForwardRefComponent } from '@fluentui/react-utilities';

/**
 * A Radio component presents a set of options where only one option can be selected.
 */
export const Radio: ForwardRefComponent<RadioProps> = React.forwardRef((props, ref) => {
  const state = useRadio_unstable(props, ref);

  useRadioStyles_unstable(state);
  return renderRadio_unstable(state);
});

Radio.displayName = 'Radio';
