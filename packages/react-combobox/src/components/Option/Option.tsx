import * as React from 'react';
import { useOption } from './useOption';
import { renderOption } from './renderOption';
import { useOptionStyles } from './useOptionStyles';
import type { OptionProps } from './Option.types';
import type { ForwardRefComponent } from '@fluentui/react-utilities';

/**
 * Option component
 */
export const Option: ForwardRefComponent<OptionProps> = React.forwardRef((props, ref) => {
  const state = useOption(props, ref);

  useOptionStyles(state);
  return renderOption(state);
});

Option.displayName = 'Option';
