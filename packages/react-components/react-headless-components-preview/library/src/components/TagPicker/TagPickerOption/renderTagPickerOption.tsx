import type { JSXElement } from '@fluentui/react-utilities';
import { renderTagPickerOption_unstable } from '@fluentui/react-tag-picker';

import type { TagPickerOptionState } from './TagPickerOption.types';

export const renderTagPickerOption = renderTagPickerOption_unstable as unknown as (
  state: TagPickerOptionState,
) => JSXElement;
