'use client';

import * as React from 'react';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import type { OptionGroupProps } from './OptionGroup.types';
import { renderOptionGroup } from './renderOptionGroup';
import { useOptionGroup } from './useOptionGroup';
import { useOptionGroupStyles } from './useOptionGroupStyles.styles';

export const OptionGroup: ForwardRefComponent<OptionGroupProps> = React.forwardRef((props, ref) => {
  const state = useOptionGroup(props, ref);
  useOptionGroupStyles(state);

  return renderOptionGroup(state);
});

OptionGroup.displayName = 'OptionGroup';
