import { TagGroupContextValues } from '@fluentui/react-tags/src/TagGroup';
import { PickerTagGroupState } from './PickerTagGroup.types';
import { renderTagGroup_unstable } from '@fluentui/react-tags';

export function renderPickerTagGroup_unstable(state: PickerTagGroupState, contexts: TagGroupContextValues) {
  if (!state.hasSelectedOptions) {
    return null;
  }

  return renderTagGroup_unstable(state, contexts);
}
