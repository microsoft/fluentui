'use client';

import * as React from 'react';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import {
  renderTagPickerGroup,
  useTagPickerContext_unstable,
  useTagPickerGroup,
} from '@fluentui/react-headless-components-preview/tag-picker';
import { useTagGroupContextValues } from '@fluentui/react-headless-components-preview/tag-group';

import type { TagPickerAppearance } from '../TagPicker/TagPicker.types';
import type { TagAppearance, TagSize } from '../Tag/Tag.types';
import { TagGroupContextProvider } from '../TagGroup/TagGroupContext';
import type { TagPickerGroupProps, TagPickerGroupState } from './TagPickerGroup.types';
import { useTagPickerGroupStyles } from './useTagPickerGroupStyles';

// Griffel's utils/tagPicker2Tag.ts, reproduced as local functions because the headless
// TagPickerGroup publishes the neutral constants `filled`/`medium` instead of deriving, which is
// correct only at picker size `medium`.
//
// The size fallback is windmod's, not Griffel's: Griffel's default branch returns `extra-small`
// where windmod Tag's own unresolved size is `medium`, and aligning on the Tag keeps one fallback
// for the whole windmod tag family. Unreachable through the closed union; it decides only what a
// JavaScript consumer passing an unlisted value gets.
const tagPickerSizeToTagSize = (size: TagPickerGroupState['pickerSize']): TagSize => {
  if (size === 'medium') {
    return 'extra-small';
  }

  if (size === 'large') {
    return 'small';
  }

  if (size === 'extra-large') {
    return 'medium';
  }

  return 'medium';
};

const tagPickerAppearanceToTagAppearance = (appearance: TagPickerAppearance): TagAppearance => {
  if (appearance === 'filled-darker') {
    return 'outline';
  }

  return 'filled';
};

/**
 * Displays a TagPicker's selected options as a rail of dismissible Tags. Windmod TagPickerGroup:
 * the headless group decorated with the Fluent visual contract (Tailwind v4 + CSS Modules).
 *
 * The hook and the renderer are composed directly rather than the headless `TagPickerGroup`
 * component, which self-provides the Griffel tag context with the neutral constants — composing it
 * would nest that provider inside windmod's and shadow the derived values with no type error.
 */
export const TagPickerGroup: ForwardRefComponent<TagPickerGroupProps> = React.forwardRef((props, ref) => {
  const pickerAppearance = useTagPickerContext_unstable(ctx => ctx.appearance);
  const pickerSize = useTagPickerContext_unstable(ctx => ctx.size);

  // role="listbox" restores Griffel's accessibility tree — the headless hook leaves the TagGroup
  // base default of `toolbar` standing. It precedes the consumer spread, as Griffel's does.
  const base = useTagPickerGroup({ role: 'listbox', ...props }, ref);

  const appearance = tagPickerAppearanceToTagAppearance(pickerAppearance);
  const size = tagPickerSizeToTagSize(pickerSize);
  const styled = useTagPickerGroupStyles({ ...base, appearance, size, pickerSize });

  // Two contexts, two audiences, exactly as windmod TagGroup ships them: the Griffel values so a
  // Griffel Tag nested here receives the look, and windmod's own context, which only a windmod
  // provider ever fills and which windmod Tag consumes.
  const contextValues = useTagGroupContextValues(styled);
  const look = React.useMemo(() => ({ appearance, size }), [appearance, size]);

  return <TagGroupContextProvider value={look}>{renderTagPickerGroup(styled, contextValues)}</TagGroupContextProvider>;
}) as ForwardRefComponent<TagPickerGroupProps>;

TagPickerGroup.displayName = 'TagPickerGroup';
