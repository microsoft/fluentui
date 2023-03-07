import * as React from 'react';
import { useOption_unstable } from './useOption';
import { renderOption_unstable } from './renderOption';
import { useOptionStyles_unstable } from './useOptionStyles';
import type { OptionProps } from './Option.types';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import { useCustomStyleHooks_unstable } from '@fluentui/react-shared-contexts';

/**
 * Option component: a styled child option of a Combobox
 */
export const Option: ForwardRefComponent<OptionProps> = React.forwardRef((props, ref) => {
  const state = useOption_unstable(props, ref);

  useOptionStyles_unstable(state);

  const { useOptionStyles_unstable: useCustomStyles } = useCustomStyleHooks_unstable();
  useCustomStyles(state);

  return renderOption_unstable(state);
});

Option.displayName = 'Option';
