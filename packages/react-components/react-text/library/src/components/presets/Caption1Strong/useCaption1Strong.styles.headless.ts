import type { SlotClassNames } from '@fluentui/react-utilities';
import { getComponentSlotClassName } from '@fluentui/react-utilities';
import type { TextSlots, TextState } from '../../Text/Text.types';

export const caption1StrongClassNames: SlotClassNames<TextSlots> = {
  root: 'fui-Caption1Strong',
};
export const useCaption1StrongStyles_unstable = (state: TextState): TextState => {
  state.root.className = getComponentSlotClassName(caption1StrongClassNames.root, state.root);
  return state;
};
