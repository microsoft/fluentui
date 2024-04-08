import * as React from 'react';
import type { TagPickerOptionGroupProps, TagPickerOptionGroupState } from './TagPickerOptionGroup.types';
import { useOptionGroup_unstable } from '@fluentui/react-combobox';

/**
 * Create the state required to render TagPickerOptionGroup.
 *
 * The returned state can be modified with hooks such as useTagPickerOptionGroupStyles_unstable,
 * before being passed to renderTagPickerOptionGroup_unstable.
 *
 * @param props - props from this instance of TagPickerOptionGroup
 * @param ref - reference to root HTMLDivElement of TagPickerOptionGroup
 */
export const useTagPickerOptionGroup: (
  props: TagPickerOptionGroupProps,
  ref: React.Ref<HTMLDivElement>,
) => TagPickerOptionGroupState = useOptionGroup_unstable;
