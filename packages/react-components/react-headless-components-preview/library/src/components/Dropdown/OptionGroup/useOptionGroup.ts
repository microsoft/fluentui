'use client';

import type * as React from 'react';
import { useOptionGroup_unstable } from '@fluentui/react-combobox';

import type { OptionGroupProps, OptionGroupState } from './OptionGroup.types';

/**
 * Returns the state for an OptionGroup component, given its props and ref.
 * The returned state can be modified with hooks before being passed to `renderOptionGroup`.
 */
export const useOptionGroup = (props: OptionGroupProps, ref: React.Ref<HTMLElement>): OptionGroupState => {
  'use no memo';

  return useOptionGroup_unstable(props, ref);
};
