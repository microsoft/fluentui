import type { JSXElement } from '@fluentui/react-utilities';
import { renderTagPickerGroup_unstable } from '@fluentui/react-tag-picker';
import type { TagGroupContextValues } from '@fluentui/react-tags';

import type { TagPickerGroupState } from './TagPickerGroup.types';

/**
 * Render the final JSX of the headless TagPickerGroup.
 */
export const renderTagPickerGroup = renderTagPickerGroup_unstable as unknown as (
  state: TagPickerGroupState,
  contextValues: TagGroupContextValues,
) => JSXElement | null;
