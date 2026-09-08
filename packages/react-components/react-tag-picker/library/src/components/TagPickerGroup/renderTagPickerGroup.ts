import type { JSXElement } from '@fluentui/react-utilities';
import type { TagPickerGroupBaseState } from './TagPickerGroup.types';
import { renderTagGroup_unstable, type TagGroupContextValues } from '@fluentui/react-tags';

export function renderTagPickerGroup_unstable(
  state: TagPickerGroupBaseState,
  contexts: TagGroupContextValues,
): JSXElement | null {
  if (!state.hasSelectedOptions) {
    return null;
  }

  return renderTagGroup_unstable(state, contexts);
}
