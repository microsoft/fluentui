import * as React from 'react';
import { useOptionGroup_unstable } from './useOptionGroup';
import { renderOptionGroup_unstable } from './renderOptionGroup';
import { useOptionGroupStyles_unstable } from './useOptionGroupStyles.styles';
import type { OptionGroupProps } from './OptionGroup.types';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import { useCustomStyleHook_unstable } from '@fluentui/react-shared-contexts';

/**
 * OptionGroup component: allows grouping of Option components within a Combobox
 */
export const OptionGroup: ForwardRefComponent<OptionGroupProps> = React.forwardRef((props, ref) => {
  const state = useOptionGroup_unstable(props, ref);

  useOptionGroupStyles_unstable(state);

  useCustomStyleHook_unstable('useOptionGroupStyles_unstable')(state);

  return renderOptionGroup_unstable(state);
});

OptionGroup.displayName = 'OptionGroup';
