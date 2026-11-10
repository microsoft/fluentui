'use client';

import type * as React from 'react';
import { slot } from '@fluentui/react-utilities';
import { optionClassNames } from '@fluentui/react-combobox';

import { useOption } from '../../Dropdown/Option';
import type { TagPickerOptionProps, TagPickerOptionState } from './TagPickerOption.types';

/**
 * Returns the state for a headless TagPickerOption.
 *
 */
export const useTagPickerOption = (props: TagPickerOptionProps, ref: React.Ref<HTMLElement>): TagPickerOptionState => {
  const optionState = useOption(props, ref);

  /* eslint-disable react-hooks/immutability -- decorate the base option state */
  // The shared TagPicker base currently discovers active-descendant options by this class.
  optionState.root.className = optionState.root.className
    ? `${optionClassNames.root} ${optionState.root.className}`
    : optionClassNames.root;
  /* eslint-enable react-hooks/immutability */

  return {
    ...optionState,
    components: {
      // eslint-disable-next-line @typescript-eslint/no-deprecated
      ...optionState.components,
      media: 'div',
      secondaryContent: 'span',
    },
    media: slot.optional(props.media, { elementType: 'div' }),
    secondaryContent: slot.optional(props.secondaryContent, { elementType: 'span' }),
    // Force role="option": useOption / useOptionBase_unstable may emit role="menuitemcheckbox" in
    // multiselect mode, but TagPickerList is a listbox whose items must be role="option".
    root: slot.always(
      { ...optionState.root, role: 'option', 'aria-checked': props['aria-checked'] },
      { elementType: 'div' },
    ),
  };
};
