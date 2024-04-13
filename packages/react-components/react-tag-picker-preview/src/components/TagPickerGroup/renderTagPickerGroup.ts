import { TagPickerGroupState } from './TagPickerGroup.types';
import { renderTagGroup, type TagGroupContextValues } from '@fluentui/react-tags';

export function renderTagPickerGroup(state: TagPickerGroupState, contexts: TagGroupContextValues) {
  if (!state.hasSelectedOptions) {
    return null;
  }

  return renderTagGroup(state, contexts);
}
