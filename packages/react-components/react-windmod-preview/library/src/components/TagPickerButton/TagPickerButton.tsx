'use client';

import * as React from 'react';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import { renderTagPickerButton, useTagPickerButton } from '@fluentui/react-headless-components-preview/tag-picker';

import type { TagPickerButtonProps } from './TagPickerButton.types';
import { useTagPickerButtonStyles } from './useTagPickerButtonStyles';

/**
 * A button trigger for a TagPicker, used instead of TagPickerInput when the picker needs no
 * free-text filtering. Windmod TagPickerButton: the headless button decorated with the Fluent
 * visual contract (Tailwind v4 + CSS Modules).
 */
export const TagPickerButton: ForwardRefComponent<TagPickerButtonProps> = React.forwardRef((props, ref) => {
  return renderTagPickerButton(useTagPickerButtonStyles(useTagPickerButton(props, ref)));
});

TagPickerButton.displayName = 'TagPickerButton';
