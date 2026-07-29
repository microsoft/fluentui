'use client';

import * as React from 'react';
import type { ForwardRefComponent } from '@fluentui/react-utilities';

import { useOption } from './useOption';
import { renderOption } from './renderOption';
import type { OptionProps } from './Option.types';

/**
 * Option component used inside Listbox.
 */
export const Option: ForwardRefComponent<OptionProps> = React.forwardRef((props, ref) => {
  const state = useOption(props, ref);

  return renderOption(state);
});

Option.displayName = 'Option';
