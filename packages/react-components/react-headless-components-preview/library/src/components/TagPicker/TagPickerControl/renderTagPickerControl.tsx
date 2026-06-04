import type { JSXElement } from '@fluentui/react-utilities';
import { renderTagPickerControl_unstable } from '@fluentui/react-tag-picker';

import type { TagPickerControlState } from './TagPickerControl.types';

/**
 * Render the final JSX of the headless TagPickerControl.
 */
export const renderTagPickerControl = renderTagPickerControl_unstable as unknown as (
  state: TagPickerControlState,
) => JSXElement;
