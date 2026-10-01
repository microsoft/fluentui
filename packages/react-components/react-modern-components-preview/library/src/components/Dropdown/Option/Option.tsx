'use client';

import * as React from 'react';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import type { OptionProps } from './Option.types';
import { renderOption } from './renderOption';
import { useOption } from './useOption';
import { useOptionStyles } from './useOptionStyles.styles';

export const Option: ForwardRefComponent<OptionProps> = React.forwardRef((props, ref) => {
  const state = useOption(props, ref);
  useOptionStyles(state);

  return renderOption(state);
});

Option.displayName = 'Option';
