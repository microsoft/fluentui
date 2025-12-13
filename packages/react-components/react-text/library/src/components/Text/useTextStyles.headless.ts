import type { SlotClassNames } from '@fluentui/react-utilities';
import { getComponentSlotClassName } from '@fluentui/react-utilities';
import type { TextSlots, TextState } from './Text.types';

export const textClassNames: SlotClassNames<TextSlots> = {
  root: 'fui-Text',
};

export const useTextStyles_unstable = (state: TextState): TextState => {
  state.root.className = getComponentSlotClassName(textClassNames.root, state.root, state);
  return state;
};
