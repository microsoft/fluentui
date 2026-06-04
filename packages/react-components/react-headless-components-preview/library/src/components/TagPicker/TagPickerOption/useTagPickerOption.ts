'use client';

import type * as React from 'react';
import { slot } from '@fluentui/react-utilities';
import { optionClassNames } from '@fluentui/react-combobox';

import { useOption } from '../../Dropdown/Option';
import type { TagPickerOptionProps, TagPickerOptionState } from './TagPickerOption.types';

/**
 * Returns the state for a headless TagPickerOption.
 *
 * Wraps the headless {@link useOption} and:
 * - tags the root with `optionClassNames.root` so the TagPicker root (reusing
 *   `useTagPickerBase_unstable`) can navigate the options with the arrow keys, which it does by
 *   matching that class; and
 * - adds optional `media` and `secondaryContent` slots, mirroring the styled `TagPickerOption`.
 */
export const useTagPickerOption = (props: TagPickerOptionProps, ref: React.Ref<HTMLElement>): TagPickerOptionState => {
  // Keep media/secondaryContent off the underlying option props so they aren't spread onto the root.
  const { media, secondaryContent, ...optionProps } = props;
  const optionState = useOption(optionProps, ref);

  /* eslint-disable react-hooks/immutability -- decorate the base option state */
  // Mark the option so the active-descendant controller (matching by class) can navigate it.
  optionState.root.className = optionState.root.className
    ? `${optionClassNames.root} ${optionState.root.className}`
    : optionClassNames.root;

  // Force the listbox option role: the base option uses role="menuitemcheckbox" in multiselect mode,
  // but a TagPickerList is a listbox, so its options must be role="option" (mirrors v9's TagPickerOption).
  optionState.root.role = 'option';
  optionState.root['aria-checked'] = props['aria-checked'];
  /* eslint-enable react-hooks/immutability */

  return {
    ...optionState,
    components: {
      // eslint-disable-next-line @typescript-eslint/no-deprecated
      ...optionState.components,
      media: 'span',
      secondaryContent: 'span',
    },
    media: slot.optional(media, { elementType: 'span' }),
    secondaryContent: slot.optional(secondaryContent, { elementType: 'span' }),
  };
};
