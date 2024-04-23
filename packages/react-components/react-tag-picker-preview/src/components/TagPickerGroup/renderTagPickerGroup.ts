import { TagPickerGroupState } from './TagPickerGroup.types';
import { renderTagGroup_unstable, type TagGroupContextValues } from '@fluentui/react-tags';

export function renderTagPickerGroup_unstable(state: TagPickerGroupState, contexts: TagGroupContextValues) {
  if (!state.hasSelectedOptions) {
    return null;
  }

  return renderTagGroup_unstable(state, contexts);
}
