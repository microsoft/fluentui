import type { SlotClassNames } from '@fluentui/react-utilities';
import { getComponentSlotClassName } from '@fluentui/react-utilities';
import type { TextSlots, TextState } from '../../Text/Text.types';

export const displayClassNames: SlotClassNames<TextSlots> = {
  root: 'fui-Display',
};

export const useDisplayStyles_unstable = (state: TextState): TextState => {
  state.root.className = getComponentSlotClassName(displayClassNames.root, state.root);

  return state;
};
