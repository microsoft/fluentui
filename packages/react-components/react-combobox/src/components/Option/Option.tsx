import * as React from 'react';
import { useOption_unstable } from './useOption';
import { renderOption_unstable } from './renderOption';
import { useOptionStyles_unstable } from './useOptionStyles.styles';
import type { OptionProps } from './Option.types';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import { useCustomStyleHook_unstable } from '@fluentui/react-shared-contexts';

/**
 * Option component: a styled child option of a Combobox
 */
export const Option: ForwardRefComponent<OptionProps> = React.forwardRef((props, ref) => {
  const state = useOption_unstable(props, ref);

  useOptionStyles_unstable(state);

  useCustomStyleHook_unstable('useOptionStyles_unstable')(state);

  return renderOption_unstable(state);
});

Option.displayName = 'Option';
