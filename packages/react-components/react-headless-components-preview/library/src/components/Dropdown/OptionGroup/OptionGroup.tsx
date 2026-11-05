'use client';

import type { ForwardRefComponent } from '@fluentui/react-utilities';

import { useOptionGroup } from './useOptionGroup';
import { renderOptionGroup } from './renderOptionGroup';
import type { OptionGroupProps } from './OptionGroup.types';
import { composeComponent } from '../../../utils/composeComponent';

/**
 * OptionGroup component used inside Listbox.
 */
export const OptionGroup: ForwardRefComponent<OptionGroupProps> = /*#__PURE__*/ composeComponent(
  'OptionGroup',
  useOptionGroup,
  renderOptionGroup,
);
