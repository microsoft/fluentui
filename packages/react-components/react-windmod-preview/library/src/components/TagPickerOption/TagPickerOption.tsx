'use client';

import * as React from 'react';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import { renderTagPickerOption, useTagPickerOption } from '@fluentui/react-headless-components-preview/tag-picker';

import type { TagPickerOptionProps } from './TagPickerOption.types';
import { useTagPickerOptionStyles } from './useTagPickerOptionStyles';

/**
 * One selectable row of a TagPickerList. Windmod TagPickerOption: the headless option decorated
 * with the Fluent visual contract (Tailwind v4 + CSS Modules).
 *
 * No glyph is restored here. The renderer draws no check icon at all, and Griffel suppresses the
 * whole selection indicator by calling the shared option styles with checkIcon undefined.
 */
export const TagPickerOption: ForwardRefComponent<TagPickerOptionProps> = React.forwardRef((props, ref) => {
  return renderTagPickerOption(useTagPickerOptionStyles(useTagPickerOption(props, ref)));
});

TagPickerOption.displayName = 'TagPickerOption';
