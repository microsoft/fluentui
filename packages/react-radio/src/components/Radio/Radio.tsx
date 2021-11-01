import * as React from 'react';
import { useRadio } from './useRadio';
import { RadioProps } from './Radio.types';
import { renderRadio } from './renderRadio';
import { useRadioStyles } from './useRadioStyles';
import type { ForwardRefComponent } from '@fluentui/react-utilities';

/**
 * A Radio component presents a set of options where only one option can be selected.
 */
export const Radio: ForwardRefComponent<RadioProps> = React.forwardRef((props, ref) => {
  const state = useRadio(props, ref);

  useRadioStyles(state);
  return renderRadio(state);
});

Radio.displayName = 'Radio';
