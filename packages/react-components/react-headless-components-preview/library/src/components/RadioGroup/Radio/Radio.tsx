'use client';

import * as React from 'react';
import type { RadioProps } from './Radio.types';
import { useRadio } from './useRadio';
import { renderRadio } from './renderRadio';

/**
 * A Radio component for use inside a RadioGroup.
 */
export const Radio = React.forwardRef<HTMLInputElement, RadioProps>((props, ref) => {
  const state = useRadio(props, ref);

  return renderRadio(state);
});

Radio.displayName = 'Radio';
