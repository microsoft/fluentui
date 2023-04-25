import * as React from 'react';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import type { RadioProps } from './Radio.types';
import { renderRadio_unstable } from './renderRadio';
import { useRadio_unstable } from './useRadio';
import { useRadioStyles_unstable } from './useRadioStyles';
import { useCustomStyleHook_unstable } from '@fluentui/react-shared-contexts';

/**
 * Radio component is a wrapper for a radio button with a label.
 */
export const Radio: ForwardRefComponent<RadioProps> = React.forwardRef((props, ref) => {
  const state = useRadio_unstable(props, ref);

  useRadioStyles_unstable(state);

  useCustomStyleHook_unstable('useRadioStyles_unstable')(state);

  return renderRadio_unstable(state);
});

Radio.displayName = 'Radio';
