import { getComponentSlotClassName, type SlotClassNames } from '@fluentui/react-utilities';
import { TextSlots, TextState } from '../../Text/Text.types';

export const body2ClassNames: SlotClassNames<TextSlots> = {
  root: 'fui-Body2',
};

export const useBody2Styles = (state: TextState): TextState => {
  state.root.className = getComponentSlotClassName(body2ClassNames.root, state.root);

  return state;
};
