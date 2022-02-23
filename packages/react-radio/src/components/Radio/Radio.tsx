import * as React from 'react';
import { useRadio_unstable } from './useRadio';
import { renderRadio_unstable } from './renderRadio';
import { useRadioStyles_unstable } from './useRadioStyles';
import type { RadioProps } from './Radio.types';
import type { ForwardRefComponent } from '@fluentui/react-utilities';

/**
 * Radio component is a wrapper for a radio button with a label.
 */
export const Radio: ForwardRefComponent<RadioProps> = React.forwardRef((props, ref) => {
  const state = useRadio_unstable(props, ref);

  useRadioStyles_unstable(state);
  return renderRadio_unstable(state);
});

Radio.displayName = 'Radio';
