'use client';

import * as React from 'react';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import type { RadioProps } from './Radio.types';
import { renderRadio } from './renderRadio';
import { useRadio } from './useRadio';
import { useRadioStyles } from './useRadioStyles.styles';

export const Radio: ForwardRefComponent<RadioProps> = React.forwardRef((props, ref) => {
  const state = useRadio(props, ref);

  useRadioStyles(state);

  return renderRadio(state);
});

Radio.displayName = 'Radio';
