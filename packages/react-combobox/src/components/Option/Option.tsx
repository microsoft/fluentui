import * as React from 'react';
import { useOption_unstable } from './useOption';
import { renderOption_unstable } from './renderOption';
import { useOptionStyles_unstable } from './useOptionStyles';
import type { OptionProps } from './Option.types';
import type { ForwardRefComponent } from '@fluentui/react-utilities';

/**
 * Option component initial component build
 */
export const Option: ForwardRefComponent<OptionProps> = React.forwardRef((props, ref) => {
  const state = useOption_unstable(props, ref);

  useOptionStyles_unstable(state);
  return renderOption_unstable(state);
});

Option.displayName = 'Option';
