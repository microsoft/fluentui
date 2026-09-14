'use client';

import * as React from 'react';
import type { ForwardRefComponent } from '@fluentui/react-utilities';

import { useOptionGroup } from './useOptionGroup';
import { renderOptionGroup } from './renderOptionGroup';
import type { OptionGroupProps } from './OptionGroup.types';

/**
 * OptionGroup component used inside Listbox.
 */
export const OptionGroup: ForwardRefComponent<OptionGroupProps> = React.forwardRef((props, ref) => {
  const state = useOptionGroup(props, ref);

  return renderOptionGroup(state);
});

OptionGroup.displayName = 'OptionGroup';
