import type { JSXElement } from '@fluentui/react-utilities';
import { renderTagPickerButton_unstable } from '@fluentui/react-tag-picker';

import type { TagPickerButtonState } from './TagPickerButton.types';

export const renderTagPickerButton = renderTagPickerButton_unstable as unknown as (
  state: TagPickerButtonState,
) => JSXElement;
