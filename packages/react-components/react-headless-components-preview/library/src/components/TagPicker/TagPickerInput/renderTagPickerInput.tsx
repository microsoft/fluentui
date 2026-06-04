import type { JSXElement } from '@fluentui/react-utilities';
import { renderTagPickerInput_unstable } from '@fluentui/react-tag-picker';

import type { TagPickerInputState } from './TagPickerInput.types';

/**
 * Render the final JSX of the headless TagPickerInput.
 */
export const renderTagPickerInput = renderTagPickerInput_unstable as unknown as (
  state: TagPickerInputState,
) => JSXElement;
