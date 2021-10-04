import * as React from 'react';
import { useRadio } from './useRadio';
import { RadioProps } from './Radio.types';
import { renderRadio } from './renderRadio';
import { useRadioStyles } from './useRadioStyles';

/**
 * Radio component enables select a single option from two or more choices.
 */
export const Radio = React.forwardRef<HTMLElement, RadioProps>((props, ref) => {
  const state = useRadio(props, ref);

  useRadioStyles(state);
  return renderRadio(state);
});

Radio.displayName = 'Radio';
