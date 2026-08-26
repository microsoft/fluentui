'use client';

import * as React from 'react';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import { renderOptionGroup, useOptionGroup } from '@fluentui/react-headless-components-preview/combobox';

import type { OptionGroupProps } from './OptionGroup.types';
import { useOptionGroupStyles } from './useOptionGroupStyles';

/**
 * An OptionGroup labels and separates a run of Options inside a Listbox. Windmod OptionGroup: the
 * headless group decorated with the Fluent visual contract (Tailwind v4 + CSS Modules).
 */
export const OptionGroup: ForwardRefComponent<OptionGroupProps> = React.forwardRef((props, ref) => {
  return renderOptionGroup(useOptionGroupStyles(useOptionGroup(props, ref)));
});

OptionGroup.displayName = 'OptionGroup';
